import React, {createContext, useState} from "react";


export const AppContext = createContext({
    channel: null,
    setChannel: (channel) => {},
    thread: null,
    setThread: (thread) => {},
});