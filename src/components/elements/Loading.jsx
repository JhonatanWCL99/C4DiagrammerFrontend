import React from 'react'

export default function Loading(props) {
    const { text } = props
    return (
        <>
            <div className="flex flex-col inline-block min-h-[35rem] justify-center items-center">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-8 h-32 w-32"></div>
                <h1 className='p-2 text-ellipsis text-lg text-gray-400 flex'>{text}</h1>
            </div>
        </>
    )
}
