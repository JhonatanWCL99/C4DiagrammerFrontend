import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../../components/elements/Loading'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import ModalBoard from '../../components/elements/board/Modal'
import MainStage from './components/MainStage'
export default function BoardPage() {
    const location = useLocation()
    const { room } = location.state
    const { auth } = useContext(AuthContext)
    const { socket } = useContext(SocketContext)
    const [usersEspera, setUsersEspera] = useState([]);
    const [usersConectados, setUsersConectados] = useState([room.anfitrion]);

    useEffect(() => {
        socket.on('nuevo-participante', (args) => {
            setUsersEspera(prevArray => prevArray.indexOf(args) === -1 ? [...prevArray,
                args
            ] : prevArray)
        })

        socket.on('participante-aceptado', (args) => {
            setUsersConectados(args)
        })
    }, [socket])

    const newUsersConectados = usersConectados.filter(function (user) { return user.id == auth.id; });

    if (room.anfitrion_id != auth.id && newUsersConectados <= 0) {
        return <>
            <Loading text={"Intentado Conectarse..."} />
        </>
    }



    return (
        <>
            <div className='flex'>
                <MainStage />
                <div className='flex flex-col p-4'>
                    {usersConectados.length > 0 && usersConectados.map((userConectado) => (
                        <div key={userConectado.id.toString()}>
                            <div className='relative w-12 pr-2'>
                                <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" className='rounded-full' />
                            </div>
                            <small>{userConectado.name}</small>
                        </div>
                    ))}

                </div>
            </div>
            <div>
                {usersEspera.length > 0 && usersEspera.map((user) => (
                    <ModalBoard
                        key={user.id.toString()}
                        myKey={user.id.toString()}
                        showModal={true}
                        participante={user}
                    />
                ))}
            </div>
        </>
    )
}
