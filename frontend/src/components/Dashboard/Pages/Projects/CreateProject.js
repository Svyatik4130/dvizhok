import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { addMyProjects, addAllProjects } from '../../../../actions/ProjectActions'
import Fuse from 'fuse.js'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { getSignature } from '../../../helpers/browser-key'

export default function CreateProject() {
    const userData = useSelector(state => state.userData)
    const myProjects = useSelector(state => state.myProjects)
    const allProjects = useSelector(state => state.allProjects)
    const dispatch = useDispatch()
    const history = useHistory()
    const signature = getSignature()
    const [isLoading, setIsLoading] = useState(true)

    const [Name, setName] = useState("")
    // const [category, setCategory] = useState("")
    const [selectedFiles, setselectedFiles] = useState("")
    const [logoFile, setlogoFile] = useState("")
    const [shortDesc, setshortDesc] = useState("")
    const [Location, setLocation] = useState("")
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
    const [filePDF, setFilePDF] = useState([])
    const [fileXLS, setFileXLS] = useState([])

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [htmlImages, sethtmlImages] = useState([])
    const [logo, setLogo] = useState([])
    const [reqLoading, setreqLoading] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [findedUsers, setFindedUsers] = useState()
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")

    const [expanded, setExpanded] = useState(false);
    const [selections, setSelections] = useState("");
    const PLATFORMS = ["Культура", "Екологія"];

    useEffect(() => {
        if (userData.user.role < 1) {
            history.push("/dashboard/projects/projectslist")
        }
        const preLoadOpps = async () => {
            try {
                const userRed = await axios.get("/users/get-all-users")
                setAllUsers(userRed.data)

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
        setselectedFiles(event.target.files)
    }

    const multipleFileUploadHandler = async (location) => {
        setError('')
        setreqLoading(true)

        // If file selected
        if (selectedFiles) {
            let areNamesSuitable = true
            const data = new FormData();

            for (let i = 0; i < 4; i++) {
                // checking for "/"
                if (selectedFiles[i].name.includes("/")) {
                    areNamesSuitable = false
                }
                data.append('galleryImage', selectedFiles[i]);
            }
            data.append('galleryImage', logoFile);
            if (!areNamesSuitable) {
                setError("Назва файлів не повинна містити '/'")
                setreqLoading(false)
                return
            }
            const onlyMembersIds = teamMembers.map((member, index) => {
                if (index === teamMembers.length - 1) return true
                return member._id
            })
            onlyMembersIds.splice(-1)

            data.append('description', shortDesc)
            data.append('projName', Name)
            data.append('category', selections)
            data.append('userId', userData.user.id)
            data.append('userName', userData.user.name)
            data.append('filePDF', filePDF)
            data.append('fileXLS', fileXLS)
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
            let token = localStorage.getItem("auth-token")
            const payload = { selections, userId: userData.user.id, filePDF, fileXLS }
            try {
                const prepublishRes = await axios.post("/project/prepublish-check", payload, { headers: { "x-auth-token": token, "secret": signature } })
                console.log(prepublishRes.status)
                if (prepublishRes.status === 201) {
                    const publishRes = await axios.post('/project/create-project', data, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': 'multipart/form-data',
                            'location': `images/projects/${location}`,
                            'locationForXls': `images/projects_files/xls_files/${location}`,
                            'locationForPdf': `images/projects_files/pdf_files/${location}`,
                        }
                    })
                    // If file size is larger than expected.
                    if (publishRes.data.msg) {
                        if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                            setError('Max size: 20MB')
                        } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                            setError('Max 4 images allowed');
                        } else {
                            setError(publishRes.data.msg)
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
                err.response.data.msg && setError(err.response.data.msg)
                if (err.response.data.msg) {
                    if (err.response.data.msg.code === "LIMIT_FILE_SIZE") {
                        setError('Max size: 20MB')
                    } else if (err.response.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                        setError('Max 4 images allowed');
                    } else {
                        setError(err.response.data.msg)
                    }
                }
                setreqLoading(false)
            }
        } else {
            // if file not selected throw error
            setError('Please upload file');
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
        if (logoFile === '') {
            setError('Будь ласка, завантажте лого');
            return
        }
        if (Name.length < 5) {
            setError("Назва проекту має містити принаймні 5 символів");
            return
        } else if (Name.includes('/')) {
            setError("Назва проекту не може містити '/");
            return
        } else if (Name.length > 50) {
            setError(`Назва проекту має бути меншим за 300 символів. Зараз:${Name.length}`);
            return
        }
        if (selections === "") {
            setError('Будь ласка, виберіть категорію проекту');
            return
        }
        if (shortDesc.length < 25) {
            setError("'Короткий опис' має містити принаймні 25 символів");
            return
        } else if (shortDesc.length > 200) {
            setError(`'Короткий опис' має бути меншим за 300 символів. Зараз:${shortDesc.length}`);
            return
        }
        if (selectedFiles.length > 4) {
            setError("Максимальна кількість завантаженого відео і фото матеріалів - 4");
            return
        }
        if (fundsReqrd === "" && !isFundsInfinite) {
            setError("Будь ласка, введіть скільки необхідно коштів");
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
        } else if (projectRelevance.length > 200) {
            setError(`'Актуальність Проекту' має бути меншим за 300 символів. Зараз:${projectRelevance.length}`);
            return
        }
        if (preHistory.length < 25) {
            setError("'Передісторія' має містити принаймні 25 символів");
            return
        } else if (preHistory.length > 200) {
            setError(`'Передісторія' має бути меншим за 300 символів. Зараз:${preHistory.length}`);
            return
        }
        if (projectPlan.length < 25) {
            setError("'План реалізації Проекту' має містити принаймні 25 символів");
            return
        } else if (projectPlan.length > 200) {
            setError(`'План реалізації Проекту' має бути меншим за 300 символів. Зараз:${projectPlan.length}`);
            return
        }
        if (expectations.length < 25) {
            setError("'Очікування' має містити принаймні 25 символів");
            return
        } else if (expectations.length > 200) {
            setError(`'Очікування' має бути меншим за 300 символів. Зараз:${projectPlan.length}`);
            return
        }
        if (spendingPlans.length < 25) {
            setError("'Плани витрат' має містити принаймні 25 символів");
            return
        } else if (spendingPlans.length > 200) {
            setError(`'Плани витрат' має бути меншим за 300 символів. Зараз:${projectPlan.length}`);
            return
        }

        const dateNow = formatDate(new Date)
        const location = `${dateNow}/`
        multipleFileUploadHandler(location)
    }

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            if(index > 3) return null
            if (photo.includes("video")) {
                const video = photo.slice(0, -5)
                return (
                    <video controls>
                        <source src={video} key={photo}></source>
                        Your browser does not support HTML5 video.
                    </video>
                )
            } else {
                return (
                    <img src={photo} key={photo} />
                )
            }
        })
    }

    function ProcessFiles(e) {
        sethtmlImages([])
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map((file) => {
                if (file.type.includes("video")) {
                    return URL.createObjectURL(file) + "video"
                }
                return URL.createObjectURL(file)
            })
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
                    <div className="w-full mb-6 p-2">
                        <p className="font-bold text-3xl">Створити новий проект</p>
                    </div>

                    <div className="flex mt-4 items-center">
                        {/* logo-preview */}
                        <div className="logo-preview mr-1.5">
                            {renderPhotos(logo)}
                        </div>
                        <div className="relative">
                            <label htmlFor="upload-logo" className="cursor-pointer font-medium text-lg">
                                <div className='bg-yellow-350 hover:bg-yellow-400 transition-all rounded-lg inline-flex items-center px-6 py-2'>
                                    <p className="mr-auto">Завантажити лого</p>
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/upload.png" alt="upload" className="w-6 self-start inline-block ml-2 mr-auto" />
                                </div>
                            </label>
                            <input className=" opacity-0 absolute -z-10" id="upload-logo" type="file" accept=".png, .jpg, .jpeg" onChange={(event) => { setlogoFile(event.target.files[0]); ProcessLogo(event) }} />
                        </div>
                    </div>

                    <input value={Name} placeholder="Назва проекту" onChange={e => setName(e.target.value)} type="text" className="w-full h-8 mt-4 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />

                    {/* <div class="relative inline-flex mt-4 ">
                        <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                        <select value={category} onChange={e => setCategory(e.currentTarget.value)} class="border-2 border-purple-950 rounded-xl text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none appearance-none">
                            <option>Виберіть категорію проекту</option>
                            <option>Культура</option>
                            <option>Екологія</option>
                        </select>
                    </div> */}

                    <div className="relative mt-4">
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

                    <input value={Location} placeholder="Mісце розташування проекту" onChange={e => setLocation(e.target.value)} type="text" className="w-full h-8 mt-4 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />

                    <div className="w-full mt-4">
                        <textarea value={shortDesc} onChange={e => setshortDesc(e.target.value)} placeholder="Короткий опис проекту" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
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
                        <input type="number" min="0" disabled={isFundsInfinite} value={fundsReqrd} onChange={e => { setFundsReqrd(e.target.value); console.log(finishDate) }} className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        <p className="font-medium text-lg">грн</p>
                    </div>
                    <label class="flex items-center">
                        <input type="checkbox" checked={isFundsInfinite} onClick={() => setIsFundsInfinite(!isFundsInfinite)} class="form-checkbox h-4 w-4" />
                        <span class="ml-2 ">Необмежений збір</span>
                    </label>

                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Дата завершення збору грошей</p>
                        <input type="date" disabled={isProjectInfinite} value={finishDate} onChange={e => { setFinishDate(e.target.value) }} className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    </div>
                    <label class="flex items-center">
                        <input type="checkbox" checked={isProjectInfinite} onClick={() => setIsProjectInfinite(!isProjectInfinite)} class="form-checkbox h-4 w-4" />
                        <span class="ml-2 ">Постійний проект</span>
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
                        }} placeholder="+ Додати учасника команди (ім'я/email/телефон)" type="text" className="w-full relative z-10 h-8 text-lg px-3 py-4 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
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
                        <textarea value={projectRelevance} onChange={e => setProjectRelevance(e.target.value)} placeholder="Обґрунтування доцільності. Навіщо вам потрібен проект? Що за проблема" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Передісторія</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={preHistory} onChange={e => setPreHistory(e.target.value)} placeholder="Що вже зроблено? Яка підготовча робота проведена?" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>
                </div>
                <div className="lg:w-5/12 w-full lg:pl-9 pl-0">

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">План реалізації Проекту</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={projectPlan} onChange={e => setProjectPlan(e.target.value)} placeholder="Що планується зробити?" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Очікування</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={expectations} onChange={e => setExpectations(e.target.value)} placeholder="Яким буде результат реалізації проекту? На кого і як він вплине?" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="w-full mt-4 p-2">
                        <p className="font-bold text-2xl">Плани витрат</p>
                    </div>
                    <div className="w-full mt-1">
                        <textarea value={spendingPlans} onChange={e => setSpendingPlans(e.target.value)} placeholder="Обгрунтування необхідності витрат" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='5' ></textarea>
                    </div>

                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Завантажити презентацію Проекту. Файл в форматі PDF</p>
                        <input onChange={(event) => { setFilePDF(event.target.files[0]) }} type="file" accept=".pdf" className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    </div>

                    <div className="flex items-center mt-4 space-x-1">
                        <p className="font-medium text-lg">Завантажити бюджет Проекту. Файл в форматі XLS</p>
                        <input onChange={(event) => { setFileXLS(event.target.files[0]) }} type="file" accept=".xls" className="flex px-1 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    </div>

                    <div className="w-10/12 mt-3 m-auto">
                        <div className="px-2 m-auto">
                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                            {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                        </div>
                    </div>

                    <div className="flex mt-6 float-right">
                        <button id="submitbtn" className={`font-meduim text-lg px-6 py-2 bg-purple-950 cursor-pointer text-white rounded-xl`} type="submit">+ Створити проект</button>
                        {reqLoading ? (
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-11" />
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </form >
        </div >
    )
}
