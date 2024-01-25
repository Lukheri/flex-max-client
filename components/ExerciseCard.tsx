'use client'
import React from 'react'
import { Exercise } from '../app/constants/types'
import { useExerciseStore } from '../stores/exercise'
import { useRouter } from 'next/navigation'
import AddExerciseModal from './AddExerciseModal'
import { useSession } from 'next-auth/react'

const ExerciseCard = ({
  exercise,
  isLoading,
}: {
  isLoading: boolean
  exercise: Exercise
}) => {
  const { setExercise } = useExerciseStore()
  const router = useRouter()

  const { data: session } = useSession()

  const handleViewExercise = () => {
    setExercise(exercise)
    router.push(`/exercises/${exercise.name}`)
  }

  return (
    <>
      {!isLoading ? (
        <div className='card glass w-96 overflow-auto bg-slate-400 text-black shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title capitalize'>{exercise.name}</h2>
            <p className='no-scrollbar h-[200px] overflow-auto text-ellipsis'>
              {exercise.instructions}
            </p>
            <div className='card-actions justify-end'>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className={`btn btn-outline text-black ${!!session && !!session?.user ? '' : 'btn-disabled'}`}
                onClick={() => {
                  ;(
                    document.getElementById(
                      `add_exercise_modal_${exercise.name}`,
                    ) as any
                  ).showModal()
                  setExercise(exercise)
                }}
              >
                Add
              </button>
              <button onClick={handleViewExercise} className='btn btn-neutral'>
                View Exercise
              </button>
            </div>
          </div>
          <dialog id={`add_exercise_modal_${exercise.name}`} className='modal'>
            <AddExerciseModal />
          </dialog>
        </div>
      ) : (
        <div className='skeleton h-[250px] w-96 bg-slate-400'></div>
      )}
    </>
  )
}

export default ExerciseCard
