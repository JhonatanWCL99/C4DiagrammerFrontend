import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/elements/Loading';
import Table from '../../components/elements/Table';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import roomService from '../../services/roomService';

function Room() {

    const { socket, online } = useContext(SocketContext)
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        getRooms()
    }, [])

    async function getRooms() {
        const resp = await roomService.allRooms(auth.id)
        console.log(resp.rooms)
        setRooms(resp.rooms)
    }

    function handleSolicitarUnirse(room) {
        if (auth.id != room.anfitrion_id) {
            socket.emit('solicitud-de-unirse', {
                de: auth.id,
                para: room.anfitrion_id,
            });
        }
        navigate(`/room/${room.id}`, { state: { room: room } })
    }

    function showRoom(room) {
        return <button
            className={`bg-gray-500 text-white active:bg-gray-600 text-sm px-3 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            type="button"
            onClick={() => { return handleSolicitarUnirse(room) }}
        >
            Unirse a la Sala
        </button>
    }

    return (
        <>
            <div className='text-left pt-2 pl-5'>
                <button className='bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 px-2 py-1' onClick={() => navigate("/")}>Volver</button>
            </div>
            {rooms.length > 0 ? <Table
                title={"Todas las Salas"}
                rooms={rooms}
                actionCreateRoom={""}
                actionUpdateRoom={(room) => { "" }}
                actionDeleteRoom={(room) => { "" }}
                showRoom={(room) => { return showRoom(room) }}
            /> : <Loading text={"Cargando Datos"} />}
        </>)
        ;
}

export default Room;