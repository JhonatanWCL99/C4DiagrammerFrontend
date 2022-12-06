import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {

    const Navigate = useNavigate();

    const seeMyRoom = (e) => {
        Navigate("/myRoom")
    }

    const seeOtherRoom = (e) => {
        Navigate("/room")
    }

    return (
        <div className="flex justify-center">
            <button className='p-10' id='button_1' onClick={seeMyRoom}>
                <div className="shadow-lg border rounded-md p-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/3106/3106807.png" className="rounded-t-md h-80 w-80" />
                    <div className='text-center'>
                        <h1>Mis Reuniones</h1>
                    </div>
                </div>
            </button>
            <button className='p-10' id='button_2' onClick={seeOtherRoom}>
                <div className="shadow-lg border rounded-md p-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/1039/1039954.png" className="rounded-t-md h-80 w-80" />
                    <div className='text-center'>
                        <h1>Otras Reuniones</h1>
                    </div>
                </div>
            </button>
        </div>
    );
};
export default Home;