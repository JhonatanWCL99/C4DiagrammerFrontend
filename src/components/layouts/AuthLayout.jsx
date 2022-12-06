import React from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from '../elements/Header';


function AuthLayout(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;

    async function authActionHandler(newPath) {
        navigate(newPath);
    }
    
    function authAction() {
        if (path === '/signin') {
            return <button onClick={() => authActionHandler('/signup')} className="py-2 px-4 text-center text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow block lg:inline">
                Registrate
            </button>
        }
        if (path === '/signup') {
            return <button onClick={() => authActionHandler('/signin')} className="py-2 px-4 text-center border text-gray-600 hover:text-gray-600 rounded-md shadow lg:inline lg:border-0">
                Inicia Sesion
            </button>
        }
    }

    return (
        <>
            <Header menuItems={[]} authAction={authAction()} />
            <main className="flex items-center justify-center pt-10">
                <div className="w-full max-w-md">
                    {<Outlet />}
                </div>
            </main>
        </>
    );
}

export default AuthLayout;