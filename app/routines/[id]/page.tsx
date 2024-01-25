'use client'
import React, { useEffect, useState } from 'react'
import { useRoutineStore } from '@/stores/routine'
import { Exercise, Routine } from '@/app/constants/types'
import ExerciseCard from '@/components/ExerciseCard'

const RoutineDetails = ({ params }: { params: { id: any } }) => {
  const [routine, setRoutine] = useState<Routine>()
  const { viewRoutine } = useRoutineStore()

  const getRoutine = async () => {
    try {
      const response = await fetch(`/api/routine/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 201) {
        const data = await response.json()
        setRoutine(data.data)
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log('Error fetching routine', error)
    }
  }

  useEffect(() => {
    getRoutine()
  }, [params.id])

  return (
    <>
      <div className='flex justify-center p-12'>
        <div className='card glass max-w-[50%] bg-slate-400 p-8 text-black shadow-xl'>
          <div className='card-body'>
            <h1 className='card-title capitalize'>{routine?.name}</h1>
            <p>{routine?.description}</p>
          </div>
        </div>
      </div>
      <div className='p-12'>
        <div className='text-[44px]'>Exercises</div>
        <div className='flex flex-wrap items-center justify-around gap-4 px-12'>
          {!!routine ? (
            routine?.exercises?.map((exercise: Exercise, index: number) => (
              <ExerciseCard
                key={exercise.name + index}
                exercise={exercise}
                isLoading={false}
              />
            ))
          ) : (
            <div>This routine doesnt contain any exercises yet</div>
          )}
        </div>
      </div>
    </>
  )
}

export default RoutineDetails
