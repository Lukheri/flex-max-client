'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import add from '../assets/add.png'
import { useRoutineStore } from '@/stores/routine'
import RoutineCard from '@/components/RoutineCard'
import { Routine } from '../constants/types'

const Routines = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const { routines, addRoutine, setRoutines } = useRoutineStore()

  const getRoutines = async () => {
    try {
      const response = await fetch('api/routine/get-routines', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 201) {
        const data = await response.json()
        setRoutines(data.data)
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log('Error fetching create routine', error)
    }
  }

  useEffect(() => {
    getRoutines()
  }, [])

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
    }

    addRoutine(newRoutine)

    try {
      const createRoutine = await fetch('api/routine/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoutine),
      })

      if (createRoutine.ok) {
        setName('')
        setDescription('')
      } else {
        console.log('Create routine failed Failed')
      }
    } catch (error) {
      console.log('Error fetching create routine', error)
    }
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
              <button onClick={handleCreateRoutine} className='btn btn-accent'>
                Create
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {!!routines.length &&
        routines.map((routine: Routine, index: number) => (
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
