import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from '../components/layouts/AuthLayout';
import { AuthContext } from '../context/AuthContext';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import { PublicRoute } from './PublicRouter';
import Home from "../pages/Home";
import { PrivateRoute } from './PrivateRouter';
import AppLayout from '../components/layouts/AppLayout';
import Room from '../pages/room/Room';
import MyRoom from '../pages/myRoom';
import BoardPage from '../pages/board/BoardPage';

function Router(props) {

    const { auth, verificaToken } = useContext(AuthContext);

    useEffect(() => {
        verificaToken();
    }, [verificaToken])


    if (auth.checking) {
        return <h1>Espere por favor</h1>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <PublicRoute isAuthenticated={auth.logged} component={<AuthLayout />}>
                    </PublicRoute>}>
                    <Route index path='/signin' element={<SignIn />} />
                    <Route index path='/signup' element={<SignUp />} />
                </Route>
                <Route element={
                    <PrivateRoute
                        isAuthenticated={auth.logged}
                        component={<AppLayout />}
                    >
                    </PrivateRoute>}>
                    <Route path='/' element={<Home />} />
                    <Route path='/myRoom' element={<MyRoom />} />
                    <Route path='/room' element={<Room />} />
                    <Route path='/room/:id' element={<BoardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;