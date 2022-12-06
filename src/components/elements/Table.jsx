import React from 'react';
import Loading from './Loading';

const Table = (props) => {
    const { rooms } = props
    return (
        <div className='p-5'>
            <div className="w-full mb-8 overflow-hidden rounded-2xl shadow-lg">
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800 text-center">{props.title}</h2>
                    {props.actionCreateRoom}
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full ">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr className='justify-center'>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">ID</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Nombre</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Estado</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Anfitrion</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Opciones</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {rooms.length > 0 ? rooms.map((room) => (
                                    <tr key={room.id.toString()} className='text-center justify-center'>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="font-medium text-gray-800">{room.id}</div>
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="font-medium text-gray-800">{room.name}</div>
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">
                                                {room.status ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Activo</span> :
                                                    <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Inactivo</span>}
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left font-medium text-green-500">{room.anfitrion.name}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            {props.actionUpdateRoom(room)}
                                            {props.actionDeleteRoom(room)}
                                            {props.showRoom(room)}
                                        </td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Table;