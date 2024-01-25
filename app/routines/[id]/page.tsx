import React from 'react'
import { useRoutineStore } from '@/stores/routine'
import { Exercise } from '@/app/constants/types'
import ExerciseCard from '@/components/ExerciseCard'

const RoutineDetails = ({ params }: { params: { name: string } }) => {
  const { viewRoutine } = useRoutineStore()

  const routine = viewRoutine()

  return (
    <>
      <div className='flex justify-center p-12'>
        <div className='card glass max-w-[50%] bg-slate-400 p-8 text-black shadow-xl'>
          <div className='card-body'>
            <h1 className='card-title capitalize'>{routine.name}</h1>
            <p>{routine.description}</p>
          </div>
          {/* <div className='card-actions justify-end'>
            <button className='btn btn-neutral'>Add exercise to routine</button>
          </div> */}
        </div>
      </div>
      <div className='p-12'>
        <div className='text-[44px]'>Exercises</div>
        <div className='flex flex-wrap items-center justify-around gap-4 px-12'>
          {routine.exercises.length !== 0 ? (
            routine.exercises.map((exercise: Exercise, index: number) => (
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
