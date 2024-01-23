import React from 'react'
import { Exercise } from '../constants/types'

const ExerciseCard = ({exercise}: { exercise: Exercise }) => {
  return (
    <div className="card w-96 bg-slate-400 shadow-xl text-black glass overflow-auto">
        <div className="card-body">
            <h2 className="card-title capitalize">{exercise.name}</h2>
            <p className='h-[200px] text-ellipsis overflow-auto no-scrollbar'>{exercise.instructions}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-outline text-black">Add</button>
                <button className="btn btn-neutral">View Exercise</button>
                
            </div>
        </div>
    </div>
  )
}

export default ExerciseCard