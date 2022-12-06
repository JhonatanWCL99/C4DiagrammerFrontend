import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function SingUp() {

    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const { email, password, name } = form;
        const msg = await register(name, email, password);

        if (msg !== true) {
            Swal.fire('Error', msg, 'error');
        }
    }

    return (
        <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div
                className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
            >
                Registrate
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-normal mb-2"
                    htmlFor="email"
                >
                    Nombre
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={onChange}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-normal mb-2"
                    htmlFor="email"
                >
                    Correo
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={onChange}

                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-normal mb-2"
                    htmlFor="password"
                >
                    Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                />
            </div>
            <div className="flex items-center justify-center">
                <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Registrate</button>
            </div>
        </form>
    )
}

export default SingUp;