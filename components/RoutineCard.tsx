'use client'
import React from 'react'
import { Routine } from '../app/constants/types'
import { useRouter } from 'next/navigation'
import { useRoutineStore } from '@/stores/routine'
import Link from 'next/link'
import { toast } from 'react-toastify'

const RoutineCard = ({
  routine,
  isLoading,
}: {
  isLoading: boolean
  routine: any
}) => {
  const {
    routines,
    addRoutine,
    getRoutines,
    loadingRoutines,
    setLoadingRoutines,
  } = useRoutineStore()
  const router = useRouter()

  const deleteRoutine = async () => {
    setLoadingRoutines(true)
    try {
      await fetch(`api/routine/${routine['_id']}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      getRoutines()
    } catch (error) {
      console.log('Error fetching create routine', error)
    }
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
                onClick={() =>
                  deleteRoutine().then(() => {
                    setLoadingRoutines(false)
                    toast.success('Successfully deleted routine!', {
                      position: 'bottom-right',
                    })
                  })
                }
                className={`btn btn-outline btn-error ${loadingRoutines ? 'loading loading-spinner' : ''}`}
              >
                delete
              </button>
              <Link
                href={`/routines/${routine['_id']}`}
                className='btn btn-neutral'
              >
                View Routine
              </Link>
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
