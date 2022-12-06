import React from 'react';
import { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import Header from '../elements/Header';
const AppLayout = ({ props }) => {

    const { auth, logout } = useContext(AuthContext)
    const navigate = useNavigate();

    function authAction() {
        if (auth.logged)
            return ""
        else
            return <button onClick={() => navigate('/signin')} className="py-2 px-4 text-center border text-gray-600 hover:text-gray-600 rounded-md shadow lg:inline lg:border-0">{'Iniciar sesión'}</button>
    }

    return (
        <>
            <Header menuItems={[]} authAction={authAction()} />
            <main className="">
                {<Outlet />}
            </main>
        </>
    );
};
export default AppLayout;