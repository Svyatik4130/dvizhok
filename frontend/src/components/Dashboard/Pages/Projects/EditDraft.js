import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { addMyProjects, addAllProjects } from '../../../../actions/ProjectActions'
import Fuse from 'fuse.js'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import SearchBar from './SearchBar'
import { getSignature } from '../../../helpers/browser-key'
import {
    useLoadScript
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mergeFileLists from "merge-file-lists";

export default function CreateProject() {
    const userData = useSelector(state => state.userData)
    const myProjects = useSelector(state => state.myProjects)
    const allProjects = useSelector(state => state.allProjects)
    const dispatch = useDispatch()
    const history = useHistory()
    const signature = getSignature()
    const [isLoading, setIsLoading] = useState(true)

    const [draft, setDraft] = useState();
    const [Name, setName] = useState("")
    const [selectedFiles, setselectedFiles] = useState("")
    const [logoFile, setlogoFile] = useState("")
    const [shortDesc, setshortDesc] = useState("")
    const [Location, setLocation] = useState()
    const [locationString, setLocationString] = useState()
    const [finishDate, setFinishDate] = useState("")
    const [fundsReqrd, setFundsReqrd] = useState("")
    const [isProjectInfinite, setIsProjectInfinite] = useState(false)
    const [isFundsInfinite, setIsFundsInfinite] = useState(false)
    const [teamMembers, setTeamMembers] = useState([""])
    const [projectRelevance, setProjectRelevance] = useState("")
    const [preHistory, setPreHistory] = useState("")
    const [projectPlan, setProjectPlan] = useState("")
    const [expectations, setExpectations] = useState("")
    const [spendingPlans, setSpendingPlans] = useState("")
    const [filePDF, setFilePDF] = useState("")
    const [fileXLS, setFileXLS] = useState("")

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [htmlImages, sethtmlImages] = useState([])
    const [logo, setLogo] = useState([])
    const [reqLoading, setreqLoading] = useState(false)
    const [reqLoading1, setreqLoading1] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [findedUsers, setFindedUsers] = useState()
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")

    const [expanded, setExpanded] = useState(false);
    const [selections, setSelections] = useState("");
    const PLATFORMS = ["Культура", "Екологія"];

    const [libraries] = useState(['places']);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        if (userData.user.role < 1) {
            history.push("/dashboard/projects/projectslist")
        }
        const preLoadOpps = async () => {
            try {
                const userRed = await axios.get("/users/get-all-users")
                setAllUsers(userRed.data)

                const draft = await axios.get(`/projectDraft/get-my-draft/${userData.user.id}`)
                if (draft.data.length === 0) {
                    history.push("/dashboard/projects/projectslist")
                }
                const draftInfo = draft.data[0]
                console.log(draftInfo);
                setDraft(draftInfo)
                setName(draftInfo.projName)
                setshortDesc(draftInfo.description)
                if (draftInfo.locationString !== "undefined") {
                    setLocation(draftInfo.location)
                    setLocationString(draftInfo.locationString)
                }
                setFinishDate(draftInfo.finishDate)
                setFundsReqrd(draftInfo.fundsReqrd)
                setIsProjectInfinite(draftInfo.isProjectInfinite)
                setIsFundsInfinite(draftInfo.isFundsInfinite)
                const Members = userRed.data.filter(user => { return draftInfo.teamMembers.includes(user._id) })
                Members.push("")
                setTeamMembers(Members)
                setProjectRelevance(draftInfo.projectRelevance)
                setPreHistory(draftInfo.preHistory)
                setProjectPlan(draftInfo.projectPlan)
                setExpectations(draftInfo.expectations)
                setSpendingPlans(draftInfo.spendingPlans)
                sethtmlImages(draftInfo.photosNvideos)
                if (draftInfo.category[0] === "") {
                    setSelections("")
                } else {
                    setSelections(draftInfo.category)
                }

                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        preLoadOpps()
    }, [])

    useEffect(() => {
        const options = {
            minMatchCharLength: 2,
            keys: [
                "name", "email.address", "phone"
            ]
        }
        const fuse = new Fuse(allUsers, options)

        const findedItems = fuse.search(teamMembers[teamMembers.length - 1]).filter(({ item }) => { return item._id !== userData.user.id })
        if (teamMembers.length > 1) {
            let filteredArr = findedItems.filter((item1) => {
                // filter out (!) items in result2
                return !teamMembers.some((item2, index) => {
                    if (index === teamMembers.length - 1) return false
                    return item1.item._id === item2._id; // return the ones with equal id
                })
            })
            setFindedUsers(filteredArr)
        } else {
            setFindedUsers(findedItems)
        }

        if (findedItems.length > 0) {
            setInputStyle("rounded-3xl bg-white")
        } else {
            setInputStyle("rounded-3xl bg-gray-100")
        }
    }, [teamMembers])

    const addUserToState = (user) => {
        let newArr = [...teamMembers]
        newArr[teamMembers.length - 1] = user
        newArr.push("")
        setTeamMembers(newArr)
    }
    const deleteTeamMember = (id) => {
        const newArr = teamMembers.filter((user, index) => {
            if (index === teamMembers.length - 1) return true
            return user._id !== id
        })

        setTeamMembers(newArr)
    }

    const toggleExpanded = () => {
        if (!expanded) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    };

    const handleChange = event => {
        if (event.target.checked) {
            return setSelections([...selections, event.target.name]);
        }
        const filtered = selections.filter(name => name !== event.target.name);
        return setSelections(filtered);
    };

    const multipleFileChangedHandler = (event) => {
        if (selectedFiles.length + htmlImages.filter(src => src.split(":")[0] !== "blob").length === 0) {
            if (event.target.files.length > 4) {
                let newArr = event.target.files.slice(0, 4)
                setselectedFiles(newArr)
            } else {
                setselectedFiles([...event.target.files])
            }
        } else if (selectedFiles.length + htmlImages.filter(src => src.split(":")[0] !== "blob").length < 4) {
            const countAlreadyUploadedImages = htmlImages.filter(src => src.split(":")[0] !== "blob").length
            console.log(countAlreadyUploadedImages)
            let newFileList = [...mergeFileLists(selectedFiles, event.target.files)]
            if (newFileList.length + countAlreadyUploadedImages > 4) { newFileList = newFileList.slice(0, 4 - countAlreadyUploadedImages) }
            setselectedFiles(newFileList)
        }
    }

    const multipleFileUploadHandler = async (location) => {
        setError('')
        setreqLoading(true)

        // If file selected
        if (selectedFiles) {
            const data = new FormData();

            const onlyMembersIds = teamMembers.map((member, index) => {
                if (index === teamMembers.length - 1) return true
                return member._id
            })
            onlyMembersIds.splice(-1)

            let areSelectionsCorrect = true
            selections.forEach(selection => {
                // add new categories here
                if (selection !== "Культура" && selection !== "Екологія") {
                    areSelectionsCorrect = false
                }
            })
            if (!areSelectionsCorrect) {
                setError("Не треба так))))")
                setreqLoading(false)
                return
            }
            data.append('description', shortDesc)
            data.append('projName', Name)
            data.append('category', selections)
            data.append('Location', Location)
            data.append('locationString', locationString)
            data.append('userId', userData.user.id)
            data.append('userName', userData.user.name)
            data.append('filePDFAndXLS', filePDF)
            data.append('filePDFAndXLS', fileXLS)
            data.append('spendingPlans', spendingPlans)
            data.append('expectations', expectations)
            data.append('projectPlan', projectPlan)
            data.append('preHistory', preHistory)
            data.append('projectRelevance', projectRelevance)
            data.append('teamMembers', onlyMembersIds)
            data.append('isFundsInfinite', isFundsInfinite)
            data.append('isProjectInfinite', isProjectInfinite)
            data.append('fundsReqrd', fundsReqrd)
            data.append('finishDate', finishDate)
            data.append('secret', signature);

            try {
                let AreExtsSuitable = true
                for (let i = 0; i < selectedFiles.length; i++) {
                    if (i < 4) {
                        if (!(/(jpe?g|png|mp4|mov)$/i).test(selectedFiles[i].name.split('.').pop())) {
                            AreExtsSuitable = false
                        }
                    }
                }
                if (!(/(jpe?g|png)$/i).test(logoFile.name.split('.').pop())) {
                    AreExtsSuitable = false
                }
                if (!AreExtsSuitable) {
                    setError('Неприпустимий формат загружаеммого контенту, дозволені розширення: .png, .jpg, .jpeg, .mov, .mp4');
                    setreqLoading(false)
                    return
                }
                let token = localStorage.getItem("auth-token")
                // const prepublishRes = await axios.post("/project/prepublish-check", payload, { headers: { "x-auth-token": token, "secret": signature } })
                const prepublishRes = await axios.post('/project/upload-xlsANDpdf', data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': 'multipart/form-data',
                        "x-auth-token": token,
                    }
                })
                data.delete("filePDFAndXLS")
                console.log(prepublishRes)
                if (prepublishRes.status === 201) {
                    for (let i = 0; i < selectedFiles.length; i++) {
                        if (i < 4) {
                            data.append('galleryImage', selectedFiles[i]);
                        }
                    }
                    data.append('galleryImage', logoFile);
                    data.append('XlsAndPdfFilesLocations', prepublishRes.data)
                    const publishRes = await axios.post('/project/create-project', data, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': 'multipart/form-data',
                            'location': `images/projects/${location}`,
                            "x-auth-token": token,
                        }
                    })
                    // If file size is larger than expected.
                    console.log(publishRes.data)
                    if (publishRes.data.msg) {
                        if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                            setError('Max size: 20MB')
                        } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                            setError('Max 4 images & videos allowed');
                        } else {
                            console.log(publishRes.data)
                            setError(publishRes.data.msg.code)
                        }
                    } else {
                        // Success with images and videos
                        setSuccessMessage('Проект опублікован')

                        // adding projects to redux
                        myProjects.push(publishRes.data)
                        dispatch(addMyProjects(myProjects))

                        allProjects.push(publishRes.data)
                        dispatch(addAllProjects(allProjects))

                        setTimeout(() => {
                            history.push("/dashboard/projects/myprojects")
                        }, 1000);
                    }
                    setreqLoading(false)
                } else {
                    setreqLoading(false)
                }
                setreqLoading(false)
            } catch (err) {
                console.log(err)
                if (err.response?.data?.msg) {
                    if (err.response.data.msg.code === "LIMIT_FILE_SIZE") {
                        setError('Max size: 20MB')
                    } else if (err.response.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                        setError('Max 4 images & videos allowed');
                    } else {
                        setError(err.response.data.msg)
                    }
                }
                setreqLoading(false)
            }
        } else {
            // if file not selected throw error
            setError('Будь ласка, завантажте хоча б один відео або фото файл');
            setreqLoading(false)
        }
    }

    // date format yyyy-mm-dd
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Name.length < 5) {
            setError("Назва проекту має містити принаймні 5 символів");
            return
        } else if (Name.includes('/')) {
            setError("Назва проекту не може містити '/");
            return
        } else if (Name.length > 50) {
            setError(`Назва проекту має бути меншим за 50 символів. Зараз:${Name.length}`);
            return
        }
        if (selections === "") {
            setError('Будь ласка, виберіть категорію проекту');
            return
        }
        if (!Location) {
            setError(`Введіть місце розташування проекту та виберіть його зі списку`);
            return
        }
        if (shortDesc.length < 25) {
            setError("'Короткий опис' має містити принаймні 25 символів");
            return
        } else if (shortDesc.length > 300) {
            setError(`'Короткий опис' має бути меншим за 300 символів. Зараз:${shortDesc.length}`);
            return
        }
        if (fundsReqrd === "" && !isFundsInfinite) {
            setError("Будь ласка, введіть скільки необхідно коштів");
            return
        }
        if (fundsReqrd.length > 15) {
            setError("сума необхідних коштів занадто велика");
            return
        }
        const dateNow1 = new Date()
        const dateFinish = new Date(finishDate)
        if (dateFinish.getTime() <= dateNow1.getTime()) {
            setError("Будь ласка, введіть правильну дату закінчення проекту");
            return
        }
        if (finishDate === "" && !isProjectInfinite) {
            setError("Будь ласка, введіть дату закінчення проекту");
            return
        }
        if (teamMembers.length === 1) {
            setError("Будь ласка, додайте хоча б одного учасника команди проекту");
            return
        }
        if (projectRelevance.length < 25) {
            setError("'Актуальність Проекту' має містити принаймні 25 символів");
            return
        } else if (projectRelevance.length > 2000) {
            setError(`'Актуальність Проекту' має бути меншим за 2000 символів. Зараз:${projectRelevance.length}`);
            return
        }
        if (preHistory.length < 25) {
            setError("'Передісторія' має містити принаймні 25 символів");
            return
        } else if (preHistory.length > 2000) {
            setError(`'Передісторія' має бути меншим за 2000 символів. Зараз:${preHistory.length}`);
            return
        }
        if (projectPlan.length < 25) {
            setError("'План реалізації Проекту' має містити принаймні 25 символів");
            return
        } else if (projectPlan.length > 2000) {
            setError(`'План реалізації Проекту' має бути меншим за 2000 символів. Зараз:${projectPlan.length}`);
            return
        }
        if (expectations.length < 25) {
            setError("'Очікування' має містити принаймні 25 символів");
            return
        } else if (expectations.length > 2000) {
            setError(`'Очікування' має бути меншим за 2000 символів. Зараз:${expectations.length}`);
            return
        }
        if (spendingPlans.length < 25) {
            setError("'Плани витрат' має містити принаймні 25 символів");
            return
        } else if (spendingPlans.length > 2000) {
            setError(`'Плани витрат' має бути меншим за 2000 символів. Зараз:${projectPlan.length}`);
            return
        }
        if (filePDF == "" || !filePDF) {
            setError('Завантажте презентацію проекту, будь ласка');
            return
        }
        if (fileXLS == "" || !fileXLS) {
            setError('Завантажте бюджет проекту, будь ласка');
            return
        }
        if (filePDF.name.split('.').pop() !== "pdf") {
            setError('Неприпустимий формат презентації проекту, дозволені розширення: .pdf');
            return
        }
        if (filePDF.size / 1024 / 1024 > 10) {
            setError('Розмір презентації проекту занадто великий. Допустимий: 10мб');
            return
        }
        if (fileXLS.name.split('.').pop() !== "xls" && fileXLS.name.split('.').pop() !== "xlsx") {
            setError('Неприпустимий формат бюджету проекту, дозволені розширення: .xls');
            return
        }
        if (fileXLS.size / 1024 / 1024 > 10) {
            setError('Розмір бюджету проекту занадто великий. Допустимий: 10мб');
            return
        }
        const dateNow = formatDate(new Date)
        const location = `${dateNow}/`
        multipleFileUploadHandler(location)
    }

    const handleDraftSave = async () => {
        const dateNow = formatDate(new Date)
        const location = `${dateNow}/`
        multipleFileUploadHandlerForDraft(location)
    }
    const multipleFileUploadHandlerForDraft = async (location) => {
        setError('')
        setreqLoading1(true)

        const data = new FormData();

        let onlyMembersIds = []
        if (teamMembers.length > 0) {
            onlyMembersIds = teamMembers.map((member, index) => {
                if (index === teamMembers.length - 1) return true
                return member._id
            })
            onlyMembersIds.splice(-1)
        }
        let areSelectionsCorrect = true
        if (selections.length > 0) {
            selections.forEach(selection => {
                // add new categories here
                if (selection !== "Культура" && selection !== "Екологія") {
                    areSelectionsCorrect = false
                }
            })
            if (!areSelectionsCorrect) {
                setError("Не треба так))))")
                setreqLoading(false)
                return
            }
        }

        data.append('description', shortDesc)
        data.append('projName', Name)
        data.append('category', selections)
        data.append('Location', Location)
        data.append('locationString', locationString)
        data.append('userId', userData.user.id)
        data.append('userName', userData.user.name)
        data.append('filePDFAndXLS', filePDF)
        data.append('filePDFAndXLS', fileXLS)
        data.append('spendingPlans', spendingPlans)
        data.append('expectations', expectations)
        data.append('projectPlan', projectPlan)
        data.append('preHistory', preHistory)
        data.append('projectRelevance', projectRelevance)
        data.append('teamMembers', onlyMembersIds)
        data.append('isFundsInfinite', isFundsInfinite)
        data.append('isProjectInfinite', isProjectInfinite)
        data.append('fundsReqrd', fundsReqrd)
        data.append('finishDate', finishDate)
        data.append('secret', signature);

        try {
            let token = localStorage.getItem("auth-token")

            if (filePDF && fileXLS) {
                let AreExtsSuitable = true
                for (let i = 0; i < selectedFiles.length; i++) {
                    if (i < 4) {
                        if (!(/(jpe?g|png|mp4|mov)$/i).test(selectedFiles[i].name.split('.').pop())) {
                            AreExtsSuitable = false
                        }
                    }
                }
                if (!(/(jpe?g|png)$/i).test(logoFile.name.split('.').pop())) {
                    AreExtsSuitable = false
                }
                if (!AreExtsSuitable) {
                    setError('Неприпустимий формат загружаеммого контенту, дозволені розширення: .png, .jpg, .jpeg, .mov, .mp4');
                    setreqLoading(false)
                    return
                }
                const prepublishRes = await axios.post('/projectDraft/upload-xlsANDpdf', data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': 'multipart/form-data',
                        "x-auth-token": token,
                    }
                })
                data.delete("filePDFAndXLS")
                console.log(prepublishRes);
                if (prepublishRes.status === 201) {
                    if (selectedFiles.length > 0 || logoFile !== "") {
                        if (selectedFiles.length > 0) {
                            for (let i = 0; i < selectedFiles.length; i++) {
                                if (i < 4) {
                                    data.append('galleryImage', selectedFiles[i]);
                                }
                            }
                        }

                        if (logoFile !== "") {
                            data.append('galleryImage', logoFile);
                            data.append('isLogo', true);
                        } else {
                            data.append('isLogo', false);
                        }

                        const imgUrlsOnly = htmlImages.filter(img => img.split(":")[0] !== "blob")
                        if (imgUrlsOnly.length > 0) {
                            data.append('imgUrls', imgUrlsOnly);
                        }

                        if (logo.length === 0 && draft.logoUrl.length === 1) {
                            data.append('logoHtmlUrl', draft.logoUrl);
                        }


                        data.append('XlsAndPdfFilesLocations', prepublishRes.data)
                        const publishRes = await axios.post('/projectDraft/create-project', data, {
                            headers: {
                                'accept': 'application/json',
                                'Accept-Language': 'en-US,en;q=0.8',
                                'Content-Type': 'multipart/form-data',
                                'location': `images/projects/${location}`,
                                "x-auth-token": token,
                            }
                        })
                        // If file size is larger than expected.
                        console.log(publishRes.data)
                        if (publishRes.data.msg) {
                            if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                                setError('Max size: 20MB')
                            } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                                setError('Max 4 images & videos allowed');
                            } else {
                                console.log(publishRes.data)
                                setError(publishRes.data.msg.code)
                            }
                        } else {
                            // Success with images and videos
                            setSuccessMessage('Чернетка збережена')
                            setTimeout(() => {
                                history.push("/dashboard/projects/myprojects")
                            }, 1000);
                        }
                    } else {
                        const payload = {
                            description: shortDesc,
                            projName: Name,
                            category: selections,
                            Location: Location,
                            locationString: locationString,
                            userId: userData.user.id,
                            userName: userData.user.name,
                            spendingPlans: spendingPlans,
                            expectations: expectations,
                            projectPlan: projectPlan,
                            preHistory: preHistory,
                            projectRelevance: projectRelevance,
                            teamMembers: onlyMembersIds,
                            isFundsInfinite: isFundsInfinite,
                            isProjectInfinite: isProjectInfinite,
                            fundsReqrd: fundsReqrd,
                            finishDate: finishDate,
                            secret: signature,
                            XlsAndPdfFilesLocations: prepublishRes.data,
                            imgUrls: [],
                            logoUrl: []
                        }

                        const imgUrlsOnly = htmlImages.filter(img => img.split(":")[0] !== "blob")
                        if (imgUrlsOnly.length > 0) {
                            payload.imgUrls = imgUrlsOnly
                        }

                        if (logo.length === 0 && draft.logoUrl.length === 1) {
                            payload.logoUrl = draft.logoUrl
                        }

                        const publishRes = await axios.post('/projectDraft/create-project-nophoto', payload)
                        // If file size is larger than expected.
                        console.log(publishRes.data)
                        if (publishRes.data.msg) {
                            if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                                setError('Max size: 20MB')
                            } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                                setError('Max 4 images & videos allowed');
                            } else {
                                console.log(publishRes.data)
                                setError(publishRes.data.msg.code)
                            }
                        } else {
                            // Success with images and videos
                            setSuccessMessage('Чернетка збережена')
                            setTimeout(() => {
                                history.push("/dashboard/projects/myprojects")
                            }, 1000);
                        }
                    }
                }
            } else if (!filePDF && !fileXLS) {
                if (selectedFiles.length > 0 || logoFile !== "") {
                    if (selectedFiles.length > 0) {
                        for (let i = 0; i < selectedFiles.length; i++) {
                            if (i < 4) {
                                data.append('galleryImage', selectedFiles[i]);
                            }
                        }
                    }

                    if (logoFile !== "") {
                        data.append('galleryImage', logoFile);
                        data.append('isLogo', true);
                    } else {
                        data.append('isLogo', false);
                    }

                    const imgUrlsOnly = htmlImages.filter(img => img.split(":")[0] !== "blob")
                    if (imgUrlsOnly.length > 0) {
                        data.append('imgUrls', imgUrlsOnly);
                    }

                    if (logo.length === 0 && draft.logoUrl.length === 1) {
                        data.append('logoHtmlUrl', draft.logoUrl);
                    }

                    const publishRes = await axios.post('/projectDraft/create-project', data, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': 'multipart/form-data',
                            'location': `images/projects/${location}`,
                            "x-auth-token": token,
                        }
                    })
                    // If file size is larger than expected.
                    if (publishRes.data.msg) {
                        if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                            setError('Max size: 20MB')
                        } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                            setError('Max 4 images & videos allowed');
                        } else {
                            console.log(publishRes.data)
                            setError(publishRes.data.msg.code)
                        }
                    } else {
                        // Success with images and videos
                        setSuccessMessage('Чернетка збережена')
                        setTimeout(() => {
                            history.push("/dashboard/projects/myprojects")
                        }, 1000);
                    }
                } else {
                    const payload = {
                        description: shortDesc,
                        projName: Name,
                        category: selections,
                        Location: Location,
                        locationString: locationString,
                        userId: userData.user.id,
                        userName: userData.user.name,
                        spendingPlans: spendingPlans,
                        expectations: expectations,
                        projectPlan: projectPlan,
                        preHistory: preHistory,
                        projectRelevance: projectRelevance,
                        teamMembers: onlyMembersIds,
                        isFundsInfinite: isFundsInfinite,
                        isProjectInfinite: isProjectInfinite,
                        fundsReqrd: fundsReqrd,
                        finishDate: finishDate,
                        secret: signature,
                        XlsAndPdfFilesLocations: " , ",
                        imgUrls: [],
                        logoUrl: []
                    }

                    const imgUrlsOnly = htmlImages.filter(img => img.split(":")[0] !== "blob")
                    if (imgUrlsOnly.length > 0) {
                        payload.imgUrls = imgUrlsOnly
                    }

                    if (logo.length === 0 && draft.logoUrl.length === 1) {
                        payload.logoUrl = draft.logoUrl
                    }
                    const publishRes = await axios.post('/projectDraft/create-project-nophoto', payload)
                    // If file size is larger than expected.
                    if (publishRes.data.msg) {
                        if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                            setError('Max size: 20MB')
                        } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                            setError('Max 4 images & videos allowed');
                        } else {
                            console.log(publishRes.data)
                            setError(publishRes.data.msg.code)
                        }
                    } else {
                        // Success with images and videos
                        setSuccessMessage('Чернетка збережена')
                        setTimeout(() => {
                            history.push("/dashboard/projects/myprojects")
                        }, 1000);
                    }
                }
            } else {
                setError('Завантажте XLS та PDF презентації одночасно або завантажте їх разом потім');
                return
            }
            setreqLoading1(false)
        } catch (err) {
            console.log(err)
            if (err.response?.data?.msg) {
                if (err.response.data.msg.code === "LIMIT_FILE_SIZE") {
                    setError('Max size: 20MB')
                } else if (err.response.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                    setError('Max 4 images & videos allowed');
                } else {
                    setError(err.response.data.msg)
                }
            }
            setreqLoading1(false)
        }
    }

    const deleteFile = (src, index) => {
        const newArray = htmlImages.filter((file, i) => i !== index)
        sethtmlImages(newArray)
        if (src.split(":")[0] === "blob") {
            let newSelectedFiles = selectedFiles.filter((file, i) => i !== index)
            setselectedFiles(newSelectedFiles)
        }
    }

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            if (photo.split(":")[0] === "blob") {
                if (index > 3) return null
                if (photo.includes("video")) {
                    const video = photo.slice(0, -5)
                    return (
                        <div className="video-wrapper relative" key={index} >
                            <div onClick={() => deleteFile(photo, index)} className=" -top-4 -right-4 absolute bg-white hover:bg-gray-200 transition-all border cursor-pointer rounded-full text-red-700 p-0.5 px-2">X</div>
                            <video id={`video-element-${index}`} controls>
                                <source src={video}></source>
                                Your browser does not support HTML5 video.
                            </video>
                        </div>
                    )
                } else {
                    return (
                        <div className="img-wrapper relative">
                            <div onClick={() => deleteFile(photo, index)} className=" -top-4 -right-4 absolute bg-white hover:bg-gray-200 transition-all border cursor-pointer rounded-full text-red-700 p-0.5 px-2">X</div>
                            <img className="img" src={photo} key={photo} />
                        </div>
                    )
                }
            } else {
                if (photo.match(/\.(jpeg|jpg|png)$/)) {
                    return (
                        <div className="img-wrapper relative">
                            <div onClick={() => deleteFile(photo, index)} className=" -top-4 -right-4 absolute bg-red-600 hover:bg-red-500 transition-all cursor-pointer rounded-full text-white font-semibold p-0.5 px-2">X</div>
                            <img className="img" src={photo} key={photo} />
                        </div>
                    )
                } else {
                    return (
                        <div className="video-wrapper relative" key={index} >
                            <div onClick={() => deleteFile(photo, index)} className=" -top-4 -right-4 absolute bg-red-600 hover:bg-red-500 transition-all cursor-pointer rounded-full text-white font-semibold p-0.5 px-2">X</div>
                            <video id={`video-element-${index}`} controls>
                                <source src={photo}></source>
                                Your browser does not support HTML5 video.
                            </video>
                        </div>
                    )
                }
            }
        })
    }
    const renderLogo = (source) => {
        return source.map((photo, index) => {
            return (
                <div className="img-wrapper relative">
                    <img className="img" src={photo} key={photo} />
                </div>
            )
        })
    }
    const defaultRenderPhotos = (source) => {
        return source.map((url, index) => {
            if (url.match(/\.(jpeg|jpg|png)$/)) {
                return (
                    <img src={url} key={url} />
                )
            } else {
                return (
                    <div key={index} >
                        <video id={`video-element-${index}`} controls>
                            <source src={url}></source>
                            Your browser does not support HTML5 video.
                        </video>
                    </div>
                )
            }
        })
    }

    function ProcessFiles(e) {
        // sethtmlImages([])
        if (e.target.files) {
            let fileArr = Array.from(e.target.files).map((file) => {
                if (file.type.includes("video")) {
                    return URL.createObjectURL(file) + "video"
                }
                return URL.createObjectURL(file)
            })
            if (fileArr.length + htmlImages.length > 4) { fileArr = fileArr.slice(0, 4 - htmlImages.length) }
            sethtmlImages((prevImages) => prevImages.concat(fileArr))
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    function ProcessLogo(e) {
        setLogo([])
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file)
            })
            setLogo((prevImages) => prevImages.concat(fileArr))
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }

    if (loadError) return "MapError";
    if (!isLoaded) return (
        <div className="pt-16">
            <SimpleLoader />
        </div>
    )

    if (isLoading) {
        return (
            <div className="pt-16">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col">

                <div className="lg:w-6/12 w-full lg:pl-9 pl-0">
                    <div className="w-full mb-4 p-2">
                        <p className="font-bold text-3xl">Продовжити створення чернетки</p>
                    </div>

                    <div className="flex mt-4 items-center">
                        <div className="logo-preview mr-1.5">
                            {logoFile === "" && draft.logoUrl[0] !== "" ? (
                                defaultRenderPhotos(draft.logoUrl)
                            ) : (null)}
                            {renderLogo(logo)}
                        </div>
                        <div className="relative">
                            <label htmlFor="upload-logo" className="cursor-pointer font-medium text-lg">
                                <div className='bg-yellow-350 hover:bg-yellow-400 transition-all rounded-lg inline-flex items-center px-6 py-2'>
                                    <p className="mr-auto">Завантажити головне фото</p>
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/upload.png" alt="upload" className="w-6 self-start inline-block ml-2 mr-auto" />
                                </div>
                            </label>
                            <input className=" opacity-0 absolute -z-10" id="upload-logo" type="file" accept=".png, .jpg, .jpeg" onChange={(event) => { setlogoFile(event.target.files[0]); ProcessLogo(event) }} />
                        </div>
                    </div>

                    <input value={Name} placeholder="Назва проекту" onChange={e => setName(e.target.value)} type="text" className="w-full h-8 mt-4 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />

                    <div className="relative my-4">
                        <div onClick={toggleExpanded}>
                            <div
                                className={`font-semibold border-2 border-purple-950 rounded-xl inline-block px-2 py-1 cursor-pointer ${expanded ? "up-arrow" : "down-arrow"
                                    }`}
                            >
                                {selections.length
                                    ? selections.map((name, i) => (
                                        <span key={i}>
                                            {i ? ", " : null}
                                            {name}
                                        </span>
                                    ))
                                    : "Виберіть категорію проекту"}
                            </div>
                        </div>
                        {expanded && (
                            <div className="border-gray-200 absolute z-40 bg-gray-100 w-full rounded-xl pr-4 border border-solid">
                                {PLATFORMS.map(platform => (
                                    <label htmlFor="one" className="block" key={platform}>
                                        <input
                                            type="checkbox"
                                            checked={selections.includes(platform)}
                                            name={platform}
                                            value={platform}
                                            onChange={handleChange}
                                            className="m-3 h-4 w-4 cursor-pointer"
                                        />
                                        {platform}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <SearchBar setLocationText={(str) => setLocationString(str)} setLocation={(text) => setLocation(text)} defaultValue={locationString} />
                    <p className="text-gray-500">*Введіть будь-яку адресу, яка існує на картах Google, і виберіть її зі спадного списку*</p>

                    <div className="w-full mt-4">
                        <textarea value={shortDesc} onChange={e => setshortDesc(e.target.value)} placeholder="Короткий опис проекту. Максимальна кількість символів: 300" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="relative mt-4">
                        <label htmlFor="upload-photo" className="cursor-pointer font-medium text-lg">
                            <div className='bg-yellow-350 hover:bg-yellow-400 transition-all rounded-lg inline-flex px-6 py-2'>
                                <p className="mr-auto">Завантажити відео чи фото</p>
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/upload.png" alt="upload" className="w-6 self-start inline-block ml-2 mr-auto" />
                            </div>
                        </label>
                        <input className=" opacity-0 absolute -z-10" id="upload-photo" multiple type="file" accept=".png, .jpg, .jpeg, .mov, .mp4, .m4v" onChange={(event) => { multipleFileChangedHandler(event); ProcessFiles(event) }} />
                        <p className="text-gray-500">*Максимальна кількість завантаженого відео і фото матеріалів - 4*</p>
                    </div>
                    {/* img-preview */}
                    <div className="img-preview mb-4 flex">
                        {renderPhotos(htmlImages)}
                    </div>

                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Необхідно грошей</p>
                        <input type="number" min="0" disabled={isFundsInfinite} value={fundsReqrd} onChange={e => { setFundsReqrd(e.target.value) }} className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        <p className="font-medium text-lg">грн</p>
                    </div>
                    <label className="flex items-center">
                        <input type="checkbox" checked={isFundsInfinite} onClick={() => setIsFundsInfinite(!isFundsInfinite)} className="form-checkbox h-4 w-4" />
                        <span className="ml-2 ">Необмежений збір</span>
                    </label>

                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Дата завершення збору грошей</p>
                        <input type="date" disabled={isProjectInfinite} value={finishDate} onChange={e => { setFinishDate(e.target.value) }} className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    </div>
                    <label className="flex items-center">
                        <input type="checkbox" checked={isProjectInfinite} onClick={() => setIsProjectInfinite(!isProjectInfinite)} className="form-checkbox h-4 w-4" />
                        <span className="ml-2 ">Постійний проект</span>
                    </label>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Команда</p>
                    </div>

                    {teamMembers.length > 1 ? (
                        teamMembers.map((user, index) => {
                            if (index === teamMembers.length - 1) return
                            return (
                                <div onClick={() => deleteTeamMember(user._id)} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                    <div className="flex w-full justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-14 h-14 rounded-full relative responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${user.avatarUrl})` }}></div>
                                            <a className="font-semibold ml-2  text-lg block">{user.name}</a>
                                        </div>
                                        <a className="font-semibold block text-red-700">- Видалити</a>
                                    </div>
                                </div>
                            )
                        })
                    ) : (null)}

                    <div className="relative mt-1">
                        <input value={teamMembers[teamMembers.length - 1]} onChange={e => {
                            let newArr = [...teamMembers]
                            newArr[teamMembers.length - 1] = e.target.value
                            setTeamMembers(newArr)
                        }} placeholder="+ Додати учасника команди (ім'я/email/телефон)" type="text" className={`w-full ${inputStyle} relative z-10 h-8 text-lg px-3 py-4 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450`} />
                        <div className="rounded-3xl drop-shadow-lg max-h-96 p-2 overflow-y-scroll absolute h-auto transition-all pt-7 top-0 w-full bg-gray-200">
                            {findedUsers.map(({ item }) => {
                                return (
                                    <div onClick={() => addUserToState(item)} className="flex mt-3 pretty-shadow-white cursor-pointer p-2 rounded-xl">
                                        <div className="flex w-full justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="w-14 h-14 rounded-full relative responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${item.avatarUrl})` }}></div>
                                                <a className="font-semibold ml-2  text-lg block">{item.name}</a>
                                            </div>
                                            <a className="font-semibold block text-purple-950">+ Додати до проекту</a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Актуальність Проекту</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={projectRelevance} onChange={e => setProjectRelevance(e.target.value)} placeholder="Обґрунтування доцільності. Навіщо вам потрібен проект? Що за проблема. Максимальна кількість символів: 2000" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Передісторія</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={preHistory} onChange={e => setPreHistory(e.target.value)} placeholder="Що вже зроблено? Яка підготовча робота проведена? Максимальна кількість символів: 2000" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>
                </div>
                <div className="lg:w-5/12 w-full lg:pl-9 pl-0">

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">План реалізації Проекту</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={projectPlan} onChange={e => setProjectPlan(e.target.value)} placeholder="Що планується зробити? Максимальна кількість символів: 2000" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Очікування</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={expectations} onChange={e => setExpectations(e.target.value)} placeholder="Яким буде результат реалізації проекту? На кого і як він вплине? Максимальна кількість символів: 2000" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Плани витрат</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={spendingPlans} onChange={e => setSpendingPlans(e.target.value)} placeholder="Обгрунтування необхідності витрат. Максимальна кількість символів: 2000" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Завантажити презентацію Проекту. Файл в форматі PDF</p>
                        <input onChange={(event) => { setFilePDF(event.target.files[0]) }} type="file" accept=".pdf" className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    </div>
                    {draft.filePDF.length > 1 && (
                        <div className="w-full">
                            <p className=" text-gray-700 flex items-center gap-1 text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17D06C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Презентація PDF вже завантажена</p>
                            <p className='text-gray-700 text-lg'>{draft.filePDF.split("pdfAndXlsFiles")[1]}</p>
                        </div>
                    )}


                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Завантажити бюджет Проекту. Файл в форматі XLS</p>
                        <input onChange={(event) => { setFileXLS(event.target.files[0]) }} type="file" accept=".xls, .xlsx" className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    </div>
                    {draft.fileXLS.length > 1 && (
                        <div className="w-full">
                            <p className=" text-gray-700 flex items-center gap-1 text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17D06C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Бюджет XLS вже завантажена</p>
                            <p className='text-gray-700 text-lg'>{draft.fileXLS.split("pdfAndXlsFiles")[1]}</p>
                        </div>
                    )}


                    <div className="w-10/12 mt-3 m-auto">
                        <div className="px-2 m-auto">
                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                            {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex mt-6 ml-auto">
                            <button onClick={() => handleDraftSave()} id="submitbtn" className={`font-meduim text-lg px-6 py-2 bg-gray-200 hover:bg-gray-300 transition-all flex cursor-pointer text-black font-medium items-center rounded-xl`} type="button"><svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" /><path d="M13 3v6h6" /></svg>Зберегти  чернетку</button>
                            {reqLoading1 ? (
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-11" />
                            ) : (
                                null
                            )}
                        </div>
                        <div className="flex mt-6 ml-auto">
                            <button id="submitbtn" className={`font-meduim text-lg px-6 py-2 bg-purple-950 cursor-pointer text-white rounded-xl`} type="submit">+ Створити проект</button>
                            {reqLoading ? (
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-11" />
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )


}
