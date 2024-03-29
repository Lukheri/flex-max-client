'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import add from '../assets/add.png'
import { useRoutineStore } from '@/stores/routine'
import RoutineCard from '@/components/RoutineCard'
import { Routine } from '../constants/types'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const Routines = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [userRoutines, setUserRoutines] = useState<Routine[]>([])

  const { routines, addRoutine, getRoutines } = useRoutineStore()
  const { data: session } = useSession()

  useEffect(() => {
    getRoutines()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUserRoutines(
      routines.filter((routine) => routine.userEmail === session?.user?.email),
    )
  }, [routines, session?.user?.email])

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
      exercises: [],
      userEmail: session?.user?.email,
    }

    await addRoutine(newRoutine)
  }

  return (
    <div className='m-16 flex flex-wrap items-center justify-start gap-16'>
      <div
        onClick={() =>
          (document.getElementById('my_modal_1') as any)?.showModal()
        }
        className='card glass flex h-[350px] w-[350px] cursor-pointer items-center justify-center bg-slate-400/70 p-12 text-black shadow-xl'
      >
        <Image src={add} alt='add' />
      </div>
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box gap-6'>
          <h3 className='text-lg font-bold'>Create Routine</h3>
          <br />
          <input
            type='text'
            placeholder='Enter Name'
            className='input input-bordered input-accent w-full'
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <textarea
            className='textarea textarea-accent mt-6 w-full'
            placeholder='Routine description'
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <div className='modal-action'>
            <form className='flex gap-4' method='dialog'>
              <button className='btn btn-outline btn-error'>Cancel</button>
              <button
                onClick={() =>
                  handleCreateRoutine().then(() => {
                    getRoutines()
                    setName('')
                    setDescription('')
                    toast.success('Successfully Created Routine!', {
                      position: 'bottom-right',
                    })
                  })
                }
                className='btn btn-accent'
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {!!userRoutines.length &&
        userRoutines.map((routine: Routine, index: number) => (
          <RoutineCard
            key={routine.name + index}
            routine={routine}
            isLoading={isLoading}
          />
        ))}
    </div>
  )
}

export default Routines
