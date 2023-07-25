import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import Icon from './Icon'
import Modal from './Modal'
import Delete from './extra/Delete'
import Edit from './extra/Edit'

const ListItem = ({ task, getData }) => {

  const [showModal, setShowModal] = useState(false)
  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE',
      })
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li className='flex justify-between rounded-md border-gray-100 border-2 my-2 py-2 px-2'>

      {/* Container */}
      <div className='flex gap-6 flex- items-center '>
        <Icon />
        <p>{task.title}</p>
        <ProgressBar progress={task.progress} />

      </div>

      <div className=''>
        <button className='text-yellow-400 hover:text-yellow-600 duration-100 ease-in-out' onClick={() => setShowModal(true)}>
          <Edit />
        </button>

        <button className='text-red-400 hover:text-red-600 duration-100 ease-in-out ' onClick={() => deleteItem()}>
          <Delete />
        </button>
      </div>
      {showModal && <Modal mode={'edit'} show={setShowModal} getData={getData} task={task} />}
    </li>
  )
}

export default ListItem