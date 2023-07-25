import React, { useState } from 'react'
import Modal from './Modal'
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
    const [showModal, setShowModal] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(null);

    const signOut = () => {
        console.log("hello")
        removeCookie('Email')
        removeCookie('Token')
        window.location.reload()
    }

    /* 
    flex
    space-between */
    return (
        <div className=' flex justify-between border-b-2 border-gray-100'>
            <h1 className='h-[2rem] text-[2rem]'>{listName}</h1>
            <div className='flex items-center mb-4'>
                <button className='mx-[0.31rem] py-[0.31rem] px-[0.63rem]  rounded-[0.5rem] bg-sky-700 text-white hover:text-black hover:bg-sky-500  duration-100 ease-in' onClick={() => setShowModal(true)}>Add new item</button>
                <button className='mx-[0.31rem] py-[0.31rem] px-[0.63rem] rounded-[0.5rem]  bg-red-700 text-white hover:text-black hover:bg-red-500  duration-100 ease-in' onClick={() => signOut()}>Sign out</button>
            </div>
            {showModal && <Modal mode={'create'} show={setShowModal} getData={getData} />}


        </div>
    )
}

export default ListHeader