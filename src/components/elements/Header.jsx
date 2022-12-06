import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProfileDropDown from './ProfileDropDown';


function Header({ menuItems, authAction, user }) {

    return (
        <header className="bg-white border-b">
            <div className={"items-center px-4 mx-auto lg:flex lg:px-8"}>
                <div className="flex py-3 lg:py-4 lg:block">
                    <a href="">
                        <img
                            src="https://www.svgrepo.com/show/227056/diagram-order.svg"
                            width={50}
                            height={40}
                            alt="Float UI logo"
                        />
                    </a>
                </div>
                <div className={`flex-1 flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto h-screen pb-20 overflow-auto`}>
                    <div >
                        <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                            <li className="mt-4 lg:mt-0">
                                {authAction}
                            </li>
                        </ul>
                    </div>
                    <ProfileDropDown />
                    <div className="flex-1">
                        <div className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                            <h1 className='text-2xl'>Diagramador En Linea</h1>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;