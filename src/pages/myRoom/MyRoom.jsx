import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/elements/Loading';
import Modal from '../../components/elements/Modal';
import Table from '../../components/elements/Table';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import roomService from '../../services/RoomService';

function MyRoom() {
    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        getRooms()
    }, [])

    async function getRooms() {
        const resp = await roomService.allRoomsAnfitrion(auth.id)
        console.log(resp)
        setRooms(resp.rooms)
    }

    async function createRoom(dataRoom) {
        const resp = await roomService.createRoom(dataRoom)
        if (resp.data.ok) {
            await getRooms()
            return true
        }
        return false
    }

    async function updateRoom(idRoom, dataRoom) {
        const resp = await roomService.updateRoom(idRoom, dataRoom)
        if (resp.data.ok) {
            await getRooms()
            return true
        }
        return false
    }

    async function deleteRoom(idRoom, dataRoom) {
        console.log(dataRoom)
        const resp = await roomService.deleteRoom(idRoom, dataRoom)
        console.log(resp)
        if (resp.data.ok) {
            await getRooms()
            return true
        }
        return false
    }

    function actionCreateRoom() {
        return <Modal
            typeAction={"create"}
            action={createRoom}
            titleButton="Nueva Sala"
            colorButton="indigo"
            titleModal={'Crea la Sala'}
        />
    }

    function actionUpdateRoom(room) {
        return <Modal
            typeAction={"update"}
            action={updateRoom}
            titleButton="Actualizar"
            colorButton="blue"
            room={room}
            titleModal={'Actualiza la Sala'}
        />
    }

    function actionDeleteRoom(room) {
        return <Modal
            typeAction={"delete"}
            action={deleteRoom}
            titleButton="Eliminar"
            colorButton="red"
            room={room}
            titleModal={'Elimina la Sala'}

        />
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
            {<Table
                title={"Mis Salas"}
                rooms={rooms}
                actionCreateRoom={actionCreateRoom()}
                actionUpdateRoom={(room) => { return actionUpdateRoom(room) }}
                actionDeleteRoom={(room) => { return actionDeleteRoom(room) }}
                showRoom={(room) => { return showRoom(room) }}
            />}
        </>)
        ;
}

export default MyRoom;