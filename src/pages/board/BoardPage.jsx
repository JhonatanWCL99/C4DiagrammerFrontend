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
   /*  const [arrows, setArrows] = useState([])
    const [arrowCurrent, setArrowCurrent] = useState({
        id: "",
        label: "label",
        start: "",
        end: "",
        typeStart: "",
        typeEnd: ""
    })
    const [enableArrow, setEnableArrow] = useState(false); */
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

   /*  function linkedArrow(idShape, typeShape) {
        if (enableArrow) {
            if (arrowCurrent.start === "") {
                const arrowTemp = arrowCurrent;
                setArrowCurrent({
                    id: arrowTemp.id,
                    label: arrowTemp.label,
                    start: idShape,
                    end: "",
                    typeStart: typeShape,
                    typeEnd: ""
                });
            } else {
                if (arrowCurrent.start !== idShape) {
                    const arrowTemp = arrowCurrent;
                    const arro = {
                        id: arrowTemp.id,
                        label: arrowTemp.label,
                        start: arrowTemp.start,
                        end: idShape,
                        typeStart: arrowTemp.typeStart,
                        typeEnd: typeShape
                    };
                    setArrowCurrent(arro);
                    setArrows([...arrows, arro])
                    //DB.addArrow(arro, code.current);
                    setEnableArrow(false);
                    setArrowCurrent({
                        id: "",
                        label: "label",
                        start: "",
                        end: "",
                        typeStart: "",
                        typeEnd: ""
                    });
                }
            }
        }
    } */


    return (
        <>
            <div className='flex'>
                <MainStage
                    /* setArrowCurrent={setArrowCurrent}
                    setEnableArrow={setEnableArrow}
                    linkedArrow={linkedArrow}
                    arrows={arrows} */
                />
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
           {/*  {arrows.map(arrow => (
                <Arrow
                    key={arrow.id}
                    myKey={arrow.id}
                    arrow={arrow}
                />
            ))} */}
        </>
    )
}
