import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Modal(props) {

    const { typeAction, action, titleButton, colorButton, room, titleModal } = props
    const { auth } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = room ? useState({
        nombre: room.name,
    }) : useState({
        nombre: '',
    });
    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (typeAction == "create") await createRoom()
        if (typeAction == "update") await updateRoom()
        if (typeAction == "delete") await deleteRoom()

    }

    async function createRoom() {
        const data = {
            anfitrion_id: auth.id,
            name: form.nombre,
        }
        const sw = await action(data)
        if (sw) setShowModal(false);
    }

    async function updateRoom() {
        const data = {
            anfitrion_id: auth.id,
            name: form.nombre,
            status: !room.status
        }
        const sw = await action(room.id, data)
        if (sw) setShowModal(false);
    }

    async function deleteRoom() {
        const data = {
            anfitrion_id: auth.id,

        }
        const sw = await action(room.id, data)
        if (sw) setShowModal(false);
    }
    return (
        <>
            <button
                className={`bg-gray-500 text-white active:bg-gray-600 text-sm px-3 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={() => setShowModal(true)}
            >
                {titleButton}
            </button>
            {
                showModal ? (
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
                                            {titleModal}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="text-gray block outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="relative p-2 flex-auto">
                                            <div>
                                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                                                <input type="text" id="nombre" name="nombre" className="text-gray-900 text-sm rounded-lg w-full p-2.5 border-2" placeholder="Nombre" value={form.nombre} onChange={onChange} />
                                            </div>
                                            <div className="p-5 text-right">
                                                <button
                                                    className={`bg-gray-500 text-white active:bg-gray-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                                    type="submit"
                                                >
                                                    Guardar
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
            }
        </>
    );
}