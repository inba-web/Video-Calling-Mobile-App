import { useUser } from "@clerk/clerk-expo";
import type {UserResource} from "@clerk/types"
import { useEffect, useRef } from "react";
import { FullScreenLoading } from "./FullScreenLoading";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import {studyBuddyTheme} from "../lib/theme";

const STREAM_API_KEY =  process.env.EXPO_PUBLIC_STREAM_API_KEY;

if (!STREAM_API_KEY) {
  throw new Error("STREAM API KEY is missing. Check .env configuration.");
}

const syncUserToStream = async (user: UserResource) => {
    try {
        await fetch("/api/sync-user", {
            method: "POST",
            headers: {"Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.id,
                name: user.fullName ?? user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                image: user.imageUrl,
            }),
        })
    } catch (error) {
        console.error("Failed to sync user to Stream:", error);
    }
}

const Chatclient = ({children,user}: {children: React.ReactNode,user:UserResource}) => {
    const syncedRef = useRef(false);
    useEffect(() => {
        if (!syncedRef.current) {
            syncUserToStream(user);
            syncedRef.current = true;
        }
    },[user])

    const tokenProvider = async () => {
        const response = await fetch("/api/token", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({userId: user.id}),
        });
        const data = await response.json();
        return data.token;
    }

    const chatClient = useCreateChatClient({
        apiKey:STREAM_API_KEY,
        userData: {
            id: user.id,
            name: user.fullName ?? user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
            image: user.imageUrl,
        },
        tokenOrProvider: tokenProvider
    })

    if(!chatClient){
        return <FullScreenLoading message="Connecting to chat..." /> 
    }

    return(
        <OverlayProvider value={{style:studyBuddyTheme}}>
            <Chat client={chatClient} style={studyBuddyTheme}>
                {children}
            </Chat>
        </OverlayProvider>
    )
}



const ChatWrapper = ({children}:{children: React.ReactNode}) => {
    const {user, isLoaded } = useUser();
    if (!isLoaded) {
        return <FullScreenLoading message="Loading..." />;
    }

    if(!user)
        return <>{children}</>;

    return (
        <Chatclient user={user}>
            {children}
        </Chatclient>
    );
}

export default ChatWrapper