import React, { createContext, useCallback, useState } from 'react';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    id: null,
    logged: false,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState)

    const login = async( email, password ) => {

        const resp = await fetchSinToken('signin', { email, password }, 'POST');

        if ( resp.ok ) {
            localStorage.setItem('token', resp.token );
            const { usuario } = resp;

            setAuth({
                id: usuario.id,
                logged: true,
                name: usuario.name,
                email: usuario.email,
            });

        }

        return resp.ok;

    }

    const register = async(name, email, password) => {

        const resp = await fetchSinToken('signup', { name, email, password }, 'POST');
        
        if ( resp.ok ) {
            localStorage.setItem('token', resp.token );
            const { usuario } = resp;

            setAuth({
                id: usuario.id,
                logged: true,
                name: usuario.name,
                email: usuario.email,
            });

            return true;
        }

        return resp.msg;

    }

    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token');
        // Si token no existe
        if ( !token ) {
            setAuth({
                id: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })

            return false;
        }

        const resp = await fetchConToken('renew');
        if ( resp.ok ) {
            localStorage.setItem('token', resp.token );
            const { usuario } = resp;

            setAuth({
                id: usuario.id,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email,
            });

            return true;
        } else {
            setAuth({
                id: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        }

    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        });
    }


    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

