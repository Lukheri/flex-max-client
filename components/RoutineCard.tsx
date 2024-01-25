'use client'
import React from 'react'
import { Routine } from '../app/constants/types'
import { useRouter } from 'next/navigation'
import { useRoutineStore } from '@/stores/routine'
import Link from 'next/link'

const RoutineCard = ({
  routine,
  isLoading,
}: {
  isLoading: boolean
  routine: Routine
}) => {
  const router = useRouter()

  const handleViewRoutine = () => {
    // setRoutine(routine)
    // router.push(`/routines/${routine.name}`)
  }

  return (
    <>
      {!isLoading ? (
        <div className='card glass h-[350px] w-[350px] bg-slate-400 text-black shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title capitalize'>{routine.name}</h2>
            <p className='no-scrollbar h-[200px] overflow-auto text-ellipsis'>
              {routine.description}
            </p>
            <div className='card-actions justify-end'>
              <button
                onClick={handleViewRoutine}
                className='btn btn-outline btn-error'
              >
                delete
              </button>
              <button onClick={handleViewRoutine} className='btn btn-neutral'>
                View Routine
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='skeleton h-[250px] w-96 bg-slate-400'></div>
      )}
    </>
  )
}

export default RoutineCard
