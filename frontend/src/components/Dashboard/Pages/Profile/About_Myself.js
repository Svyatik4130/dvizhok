import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { loggedUser } from '../../../../actions/UserActions'
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'
import { getSignature } from '../../../helpers/browser-key'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function Personal_Info() {
    const userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const [btnColor, setBtnColor] = useState("bg-gray-700 cursor-default")
    const [btnType, setBtnType] = useState("button")

    const [whoI, setwhoI] = useState(userData.user.whoI)
    const [workAs, setworkAs] = useState(userData.user.workAs)
    const [workPlace, setworkPlace] = useState(userData.user.workPlace)
    const defaultProject = userData.user.myProjects.map((project, index) => { return { id: index, projectLink: project } })
    const [myProjects, setmyProjects] = useState(userData.user.myProjects.map((project, index) => { return { id: index, projectLink: project } }))
    const [whatICan, setwhatICan] = useState(userData.user.whatICan)
    const [whatILike, setwhatILike] = useState(userData.user.whatILike)
    const [whatIWant, setwhatIWant] = useState(userData.user.whatIWant)
    const [myGoals, setmyGoals] = useState(userData.user.myGoals)
    const [mySocialDream, setmySocialDream] = useState(userData.user.mySocialDream)
    const [selfPresentation, setselfPresentation] = useState(userData.user.selfPresentation)

    const [error, setError] = useState()
    const [addProjectBtn, setAddProjectBtn] = useState(<p onClick={() => { setmyProjects([...myProjects, { id: Math.max(...myProjects.map(project => { return (project.id) })) + 1, projectLink: "" }]) }} className=" font-medium text-lg text-purple-950 cursor-pointer hover:text-purple-900 transition-all">+ Додати ще сайт</p>)
    const [successMessage, setSuccessMessage] = useState()
    const signature = getSignature()

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let areLinksValid = true
            const ProjectsArray = myProjects.map(prjObj => {
                console.log(prjObj.projectLink)
                if (prjObj.projectLink.length < 2 || prjObj.projectLink.length > 50) {
                    areLinksValid = false
                }
                return prjObj.projectLink
            })
            if (!areLinksValid) {
                setError("Будь ласка, ваш сайт повинен бути менше 50 символів і більше 2");
                return
            }

            if (whoI !== userData.user.whoI || workAs !== userData.user.workAs || workPlace !== userData.user.workPlace || myGoals !== userData.user.myGoals || whatICan !== userData.user.whatICan || whatILike !== userData.user.whatILike || whatIWant !== userData.user.whatIWant || !equals(myProjects, defaultProject) || mySocialDream !== userData.user.mySocialDream || selfPresentation !== userData.user.selfPresentation) {
                const userID = userData.user.id
                const payload = { name: userData.user.name, email: userData.user.email, surname: userData.user.surname, country: userData.user.country, birthDate: userData.user.birthDate, occupation: userData.user.occupationTown, phoneNumber: userData.user.phoneNumber, sex: userData.user.sex, userID, whoI, workAs, workPlace, myGoals, whatICan, whatILike, whatIWant, mySocialDream, selfPresentation, myProjects: ProjectsArray, signature }
                let token = localStorage.getItem("auth-token")
                const changeRes = await axios.post("/users/info_change", payload, { headers: { "x-auth-token": token, "secret": signature }, })
                console.log(changeRes)
                dispatch(loggedUser({
                    token: changeRes.data.token,
                    user: changeRes.data.user
                }))
                localStorage.setItem("auth-token", changeRes.data.token)
                if (changeRes.status == 200) {
                    setError(undefined)
                    setSuccessMessage("Зміни були успішно внесені")
                    setBtnColor("bg-gray-700 cursor-default")
                }
            }
        } catch (err) {
            console.log(err.response.data.msg)
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    useEffect(() => {
        if (whoI !== userData.user.whoI || workAs !== userData.user.workAs || workPlace !== userData.user.workPlace || myGoals !== userData.user.myGoals || whatICan !== userData.user.whatICan || whatILike !== userData.user.whatILike || whatIWant !== userData.user.whatIWant || !equals(myProjects, defaultProject) || mySocialDream !== userData.user.mySocialDream || selfPresentation !== userData.user.selfPresentation) {
            setBtnColor("bg-purple-950 cursor-pointer")
            setBtnType("submit")
        } else {
            setBtnColor("bg-gray-700 cursor-default")
            setBtnType("button")
        }
    }, [whoI, workAs, workPlace, myProjects, whatICan, whatILike, whatIWant, myGoals, mySocialDream, selfPresentation])

    const ChangeProjectInState = (value, index) => {
        console.log(myProjects)
        let ChangableProject = [...myProjects]
        const foundItem = ChangableProject.findIndex(project => project.id === index)
        ChangableProject[foundItem] = { id: index, projectLink: value }
        setmyProjects(ChangableProject)
    }
    const deleteProject = (index) => {
        let ChangableProject = [...myProjects]
        let foundItem = myProjects.findIndex(project => project.id === index)
        ChangableProject.splice(foundItem, 1)
        console.log(ChangableProject)
        setmyProjects(ChangableProject)
    }

    useEffect(() => {
        if (myProjects.length >= 3) {
            setAddProjectBtn()
        } else {
            setAddProjectBtn(<p onClick={() => { setmyProjects([...myProjects, { id: Math.max(...myProjects.map(project => { return (project.id) })) + 1, projectLink: "" }]) }} className=" font-medium text-lg text-purple-950 cursor-pointer hover:text-purple-900 transition-all">+ Додати ще сайт</p>)
        }
    }, [myProjects])

    return (
        <div>
            <div className="w-10/12 lg:mt-3">
                <div className="px-14">
                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row p-5">
                    <div className="lg:w-4/12 w-full lg:px-7 px-2">
                        <div>
                            <p className=" font-semibold text-lg">Хто ви</p>
                            <textarea value={whoI} onChange={e => setwhoI(e.target.value)} placeholder={userData.user.whoI} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Ким працюєте</p>
                            <textarea value={workAs} onChange={e => setworkAs(e.target.value)} placeholder={userData.user.workAs} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Місце роботи</p>
                            <textarea value={workPlace} onChange={e => setworkPlace(e.target.value)} placeholder={userData.user.workPlace} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Мої сайти/проекти</p>
                            {myProjects.map((project, index) => {
                                return (
                                    <div className="flex items-center pb-1">
                                        <input value={myProjects[index].projectLink} onChange={(e) => { ChangeProjectInState(e.target.value, myProjects[index].id) }} type="text" placeholder="https://" className="w-full h-8 mb-1 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                        {myProjects.length > 1 ? (<div onClick={() => deleteProject(myProjects[index].id)} className="cursor-pointer pl-1"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#da0800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>) : (null)}
                                    </div>
                                )
                            })}
                            {addProjectBtn}
                        </div>
                    </div>
                    <div className="lg:w-4/12 w-full lg:px-7 px-2">
                        <div>
                            <p className=" font-semibold text-lg">Що я вмію </p>
                            <textarea value={whatICan} onChange={e => setwhatICan(e.target.value)} placeholder={userData.user.whatICan} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='2' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Що я люблю</p>
                            <textarea value={whatILike} onChange={e => setwhatILike(e.target.value)} placeholder={userData.user.whatILike} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='2' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Чим я хочу займатися</p>
                            <textarea value={whatIWant} onChange={e => setwhatIWant(e.target.value)} placeholder={userData.user.whatIWant} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='2' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Мої цілі</p>
                            <textarea value={myGoals} onChange={e => setmyGoals(e.target.value)} placeholder={userData.user.myGoals} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='2' ></textarea>
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Моя соціальна мрія</p>
                            <textarea value={mySocialDream} onChange={e => setmySocialDream(e.target.value)} placeholder={userData.user.mySocialDream} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='2' ></textarea>
                        </div>
                    </div>
                    <div className="lg:w-4/12 w-full lg:px-7 px-2">
                        <div>
                            <p className=" font-semibold text-lg">Ще декілька слів про себе/самопрезентація</p>
                            <textarea value={selfPresentation} onChange={e => setselfPresentation(e.target.value)} placeholder={userData.user.selfPresentation} className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950" rows='6' ></textarea>
                        </div>
                        <button type={btnType} className={`font-meduim mt-4 transition-all text-lg px-6 py-2 ${btnColor} text-white rounded-xl`}>Зберегти зміни</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
