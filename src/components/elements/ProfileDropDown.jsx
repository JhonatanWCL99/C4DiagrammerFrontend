import { useContext } from "react";
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Profile Dropdown
const ProfileDropDown = () => {

    const { auth, logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const [state, setState] = useState(false)
    const profileRef = useRef()

    const navigation = [
        { title: "Cerrar Sesion", path: "" },
    ]

    return (
        <>
            {auth.logged && < div >
                <div className="flex items-center space-x-4">
                    <div className="">
                        <span className="block">{auth.name}</span>
                        <span className="block text-sm text-gray-500">{auth.email}</span>
                    </div>
                    <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                        onClick={() => setState(!state)}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                            className="w-full h-full rounded-full"
                        />
                    </button>
                </div>
                <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                    <button className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" onClick={logout}>
                        Cerrar Sesion
                    </button>
                </ul>
            </div>}
        </>
    )
}

export default ProfileDropDown;

