'use client'
import React, { useState } from 'react'
import { useRoutineStore } from '@/stores/routine'
import { useSession } from 'next-auth/react'
import { Routine } from '@/app/constants/types'
import { useExerciseStore } from '@/stores/exercise'
import { PlusSquare } from 'lucide-react'

const AddExerciseModal = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const { userRoutines, addRoutine, getRoutines } = useRoutineStore()
  const { exercise } = useExerciseStore()

  const { data: session } = useSession()

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(event.target.value as string)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value as string)
  }

  const handleCreateRoutine = async () => {
    const newRoutine = {
      name: name,
      description: description,
      exercises: [exercise],
      userEmail: session?.user?.email,
    }

    await addRoutine(newRoutine)
  }
  return (
    <>
      <div className='glass modal-box mb-4 w-1/3 bg-slate-400'>
        <div className='collapse bg-slate-400'>
          <input type='checkbox' />
          <div className='collapse-title flex items-center justify-around bg-slate-400 text-xl font-medium'>
            <PlusSquare />
            Create new routine
          </div>
          <div className='collapse-content glass bg-slate-400 p-4 pt-6'>
            <input
              type='text'
              placeholder='Enter Name'
              className='input input-bordered w-full bg-slate-200'
              value={name}
              onChange={handleNameChange}
            />
            <br />
            <textarea
              className='textarea mt-6 w-full bg-slate-200'
              placeholder='Routine description'
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <button
              onClick={() =>
                handleCreateRoutine().then(() => {
                  getRoutines()
                  setName('')
                  setDescription('')
                })
              }
              className='btn'
            >
              Create
            </button>
          </div>
        </div>
        <div className='mt-5 flex flex-col gap-4'>
          {!!userRoutines ? (
            userRoutines.map((routine: any, index: number) => (
              <button
                key={routine.name + index}
                className='btn w-full bg-slate-600'
              >
                {routine.name}
              </button>
            ))
          ) : (
            <div>No routines</div>
          )}
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </>
  )
}

export default AddExerciseModal
