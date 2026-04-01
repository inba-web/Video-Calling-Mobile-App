import { useUser } from "@clerk/clerk-expo";
import type {UserResource} from "@clerk/types"
import { useEffect, useRef } from "react";
import { FullScreenLoading } from "./FullScreenLoading";

const STREAM_API_KEY =  process.env.EXPO_PUBLIC_STREAM_API_KEY

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

    return <></>
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