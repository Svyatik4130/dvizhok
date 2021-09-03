import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import Conversation from "./Conversation";
import SimpleLoader from '../../../Loaders/SimpleLoader'
import Panel from "./Panel";
import { Switch, Route, useHistory } from "react-router-dom";
import Fuse from 'fuse.js'

export default function Messenger() {
    const [isLoading, setIsLoading] = useState(true)
    const [conversations, setConversations] = useState([]);
    const userData = useSelector(state => state.userData)
    const [searchText, setsearchText] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [findedUsers, setFindedUsers] = useState()
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")

    const history = useHistory()

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + userData.user.id)
                setConversations(res.data)

                const userRed = await axios.get("/users/get-all-users")
                setAllUsers(userRed.data)

                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [userData.user.id]);

    useEffect(() => {
        const options = {
            minMatchCharLength: 2,
            keys: [
                "name"
            ]
        }
        const fuse = new Fuse(allUsers, options)
        const findedItems = fuse.search(searchText).filter(({ item }) => { return item._id !== userData.user.id })
        setFindedUsers(findedItems)

        if (findedItems.length > 0) {
            setInputStyle("rounded-3xl bg-white")
        } else {
            setInputStyle("rounded-3xl bg-gray-100")
        }
    }, [searchText])

    const CreateConversation = async (id) => {
        try {
            const payload = {
                senderId: userData.user.id,
                receiverId: id
            }
            const res = await axios.post("/conversations/add", payload)

            const conv_id = res.data._id

            if (conversations.filter(conv => conv._id === conv_id).length === 0) {
                conversations.push(res.data)
                setConversations(conversations)
            }

            setsearchText("")

            history.push(`/dashboard/messages/${conv_id}`)
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (
            <div className="pt-16">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <div className="flex w-full pt-4 pl-2 flex-row flex-wrap">
            <div style={{ height: window.innerHeight - 105 }} className="w-4/12 p-2 overflow-y-scroll">
                <div className="relative">
                    <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} transition-all relative z-20 px-3 py-2 w-full outline-none focus:bg-white`} placeholder="Пошук ваших чатів та користувачів" />
                    <div className="rounded-3xl mt-0.5 drop-shadow-lg max-h-96 p-2 overflow-y-scroll absolute h-auto transition-all pt-7 top-0 w-full bg-white">
                        {findedUsers.map(({ item }) => {
                            return (
                                <div onClick={() => CreateConversation(item._id)} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="w-14 h-14 rounded-full relative responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${item.avatarUrl})` }}>
                                        </div>
                                        <div className="ml-2 ">
                                            <a className="font-semibold text-lg block">{item.name}</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {conversations.map((c) => (
                    <div key={c._id}>
                        <Conversation conversation={c} />
                    </div>
                ))}
            </div>
            <Switch>
                <Route path="/dashboard/messages/:id" children={<Panel />} />
                <Route exact path="/dashboard/messages">
                    <div className="w-8/12 h-full pt-2">
                        <div className="bg-white flex flex-col justify-center relative rounded-l-3xl p-4" style={{ height: window.innerHeight - 105 }}>
                            <div className="m-auto opacity-40 w-8/12 text-center">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/send.png" alt="send" className=" h-48 m-auto block" />
                                <p className="font-semibold text-3xl">Ваші повідомлення</p>
                                <p className="font-semibold text-3xl">Надсилайте приватні повідомлення другу</p>
                            </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}
