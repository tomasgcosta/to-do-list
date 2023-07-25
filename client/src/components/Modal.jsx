import React, { useState } from 'react'
import { useCookies } from "react-cookie";

const Modal = ({ mode, show, task, getData }) => {

  const editMode = mode === 'edit' ? true : false
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date()

  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
      )

      if (response.status === 200) {
        setShowModal(false)
        getData()
      }

    } catch (err) {
      console.log(err)
    }
  }

  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })

      if(response.status === 200){
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(data => ({
      ...data,
      [name]: value
    }))
  }

  return (
    <div className='inset-0 absolute flex justify-center items-center bg-black bg-opacity-50'>
      <div className='w-[32rem] bg-white px-[3rem] py-[3rem] rounded-[0.6rem] shadow-lg'>
        <div className='flex justify-between'>
          <h3>Do you want to {mode} this task?</h3>
          <button className='bg-transparent border-0 active:text-red-500' onClick={() => show(false)}>X</button>
        </div>

        <form className='flex flex-col' action="">

          <input className='my-[0.7rem] mx-0 py-[0.75rem] px-[1rem] rounded-[0.75rem] border-[0.094rem] border-gray-500' required placeholder='Task goes here' name='title' value={data.title} onChange={(e) => handleChange(e)} />
          <label htmlFor="range" className='font-[0.81rem]'>Current task progress</label>
          <input className='my-[0.7rem] mx-0 py-[0.75rem] px-[1rem] rounded-[0.75rem] border-[0.094rem] border-gray-500' id='range' required type='range' min='0' max='100' name='progress' value={data.progress} onChange={(e) => handleChange(e)} />
          <input className='my-[0.7rem] mx-0 py-[0.75rem] px-[1rem] rounded-[0.75rem] border-[0.094rem] border-gray-500 cursor-pointer hover:bg-slate-600' type='submit' onClick={editMode ? editData : postData} />

        </form>
      </div>
    </div>
  )
}

export default Modal