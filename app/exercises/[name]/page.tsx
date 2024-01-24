'use client'
import ExerciseCard from '@/app/components/ExerciseCard'
import { Exercise } from '@/app/constants/types'
import { useExerciseStore } from '@/app/store/exercise'
import React, { useEffect, useState } from 'react'

const ExerciseDetails = ({ params }: { params: { name: string } }) => {
  const { exercise } = useExerciseStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [suggested, setSuggested] = useState<Exercise[]>()

  const getExercises = async () => {
    setIsLoading(true)
    try {
      const apiKey = 'CQjHLR+speye5Qru755TJA==8p6Qir3rgO05gckU'

      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${exercise.muscle}`,
        {
          headers: {
            'X-Api-Key': apiKey,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }

      const data = await response.json()

      if (data.length <= 5) {
        return data
      }

      const shuffledData = [...data]
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]]
      }

      setSuggested(shuffledData.slice(0, 5))
    } catch (error: any) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    getExercises().then(() => setIsLoading(false))
  }, [])

  return (
    <>
      <div className='flex justify-center p-12'>
        <div className='card glass max-w-[50%] bg-slate-400 p-8 text-black shadow-xl'>
          <div className='card-body'>
            <h1 className='card-title capitalize'>{exercise.name}</h1>
            <p>{exercise.instructions}</p>
            <p className='capitalize'>
              <span className='font-semibold'>Exercise type: </span>
              {exercise.type}
            </p>
            <p className='capitalize'>
              <span className='font-semibold'>Target muscle: </span>
              {exercise.muscle}
            </p>
            <p className='capitalize'>
              <span className='font-semibold'>Difficulty: </span>
              {exercise.difficulty}
            </p>
            <p className='capitalize'>
              <span className='font-semibold'>Equipment: </span>
              {exercise.equipment}
            </p>
          </div>
          <div className='card-actions justify-end'>
            <button className='btn btn-neutral'>Add exercise to routine</button>
          </div>
        </div>
      </div>
      <div className='p-12'>
        <div className='text-[44px]'>
          Exercises that hit the same muscle group
        </div>
        <div className='flex flex-wrap items-center justify-around gap-4 px-12'>
          {suggested &&
            suggested.map((exercise: Exercise, index: number) => (
              <ExerciseCard
                key={exercise.name + index}
                exercise={exercise}
                isLoading={isLoading}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default ExerciseDetails
