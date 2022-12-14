import { createContext, useContext, useEffect } from "react"
import { useSocket } from "../hooks/useSockets";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket("https://c4diagrammerbackend.up.railway.app");
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        if (auth.logged) {
            conectarSocket();
        }

    }, [auth, conectarSocket]);

    useEffect(() => {

        if (!auth.logged) {
            desconectarSocket();
        }

    }, [auth, desconectarSocket]);


    return (
        <SocketContext.Provider value={{
            socket,
            online
        }}>
            {children}
        </SocketContext.Provider>
    )
}
