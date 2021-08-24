import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import Conversation from "./Conversation";
import SimpleLoader from '../../../Loaders/SimpleLoader'
import Panel from "./Panel";
import { Switch, Route } from "react-router-dom";
// import { io } from "socket.io-client";

export default function Messenger() {
    const [isLoading, setIsLoading] = useState(true)
    const [conversations, setConversations] = useState([]);
    const userData = useSelector(state => state.userData)

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + userData.user.id);
                setConversations(res.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [userData.user.id]);

    if (isLoading) {
        return (
            <div className="pt-16">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <div className="flex w-full pt-4 pl-2">
            <div className="w-4/12 p-2 overflow-y-scroll">
                <input type="text" className="rounded-full bg-white px-3 py-2 w-full outline-none" placeholder="Пошук ваших чатів" />

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
