import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../../context/SocketContext';

export default function ModalBoard(props) {
    const { showModal, participante } = props
    const location = useLocation()
    console.log(location)
    const [sModal, setSModal] = useState(showModal)
    const { socket } = useContext(SocketContext)

    function handleClickAcept() {
        socket.emit('aceptar-participante', {
            room: location.state.room,
            participante: participante,
        })
        setSModal(false)
    }
    return (
        <>
            {
                sModal ? (
                    <>
                        <div
                            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="flex-initial w-80">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t text-center">
                                        <h3 className="text-xl font-semibold ">
                                            Nuevo Participante
                                        </h3>
                                    </div>
                                    <form >
                                        <div className="relative p-2 flex-auto">
                                            <div>
                                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                                                <input type="text" id="nombre" name="nombre" className="text-gray-900 text-sm rounded-lg w-full p-2.5 border-2" placeholder="Nombre" value={participante.name} readOnly />
                                            </div>
                                            <div className="p-5 text-right">
                                                <button
                                                    className={`bg-gray-500 text-white active:bg-gray-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                                    type="button"
                                                    onClick={handleClickAcept}
                                                >
                                                    Aceptar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }        </>
    )
}

