'use client'
import React, { useEffect, useState } from 'react'
import { Exercise } from '../constants/types'
import { exerciseTypes, muscleGroups, difficultyLevels } from '../constants/arrays';
import ExerciseCard from '../components/ExerciseCard';
  
const Exercises = () => {
    const [muscle, setMuscle] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [difficulty, setDifficulty] = useState<string>("")
    const [searchFilter, setSearchFilter] = useState<string>("")
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    const getExercises = async () => {
      setIsLoading(true)
      try {
        const apiKey = 'CQjHLR+speye5Qru755TJA==8p6Qir3rgO05gckU';
  
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${searchFilter}&muscle=${muscle}&difficulty=${difficulty}&type=${type}`, {
          headers: {
            'X-Api-Key': apiKey
          },
        });
  
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        setExercises(data)
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }
  
    useEffect(() => {
        getExercises().then(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[muscle, type, difficulty])
  
    const handleMuscleChange = (muscleGroup: string) => {
      setMuscle(muscleGroup);
    };
  
    const handleTypeChange = (type: string) => {
      setType(type);
    };
  
    const handleDifficultyChange = (difficulty: string) => {
      setDifficulty(difficulty);
    };
  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchFilter(event.target.value as string)
    }
  
    const handleSearchClick = () => {
      getExercises().then(() => setIsLoading(false))
    }
  
    const handleResetFilters = () => {
      setMuscle("")
      setType("")
      setDifficulty("")
    }

    return (
        <div className='flex flex-col justify-center p-6 gap-5'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex w-full justify-center items-center gap-2'>
                    <input type="text" placeholder="Search Exercise" className={`input input-bordered input-accent w-1/2`} onChange={handleFilterChange}/>
                    <button className={`btn btn-accent  ${isLoading ? "loading loading-spinner" : ""}`} onClick={handleSearchClick}>Search</button>
                </div>
                
                <div className='flex items-center gap-2'>
                    <div className="dropdown flex-1">
                        <div tabIndex={0} role="button" className="btn m-1">Muscle</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {muscleGroups.map((muscleGroup: string, index: number) => 
                                <li key={muscleGroup + index} onClick={() => handleMuscleChange(muscleGroup)}><a>{muscleGroup}</a></li>
                            )}
                        </ul>
                    </div>
                    <div className="dropdown flex-1">
                        <div tabIndex={0} role="button" className="btn m-1">Type</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {exerciseTypes.map((exerciseType: string, index: number) => 
                                <li key={exerciseType + index} onClick={() => handleTypeChange(exerciseType)}><a>{exerciseType}</a></li>
                            )}
                        </ul>
                    </div>
                    <div className="dropdown flex-1">
                        <div tabIndex={0} role="button" className="btn m-1">Difficulty</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {difficultyLevels.map((difficultyLevel: string, index: number) => 
                                <li key={difficultyLevel + index} onClick={() => handleDifficultyChange(difficultyLevel)}><a>{difficultyLevel}</a></li>
                            )}
                        </ul>
                    </div>
                    <button className={`btn btn-outline btn-accent ${isLoading ? "loading loading-spinner" : ""}`} onClick={handleResetFilters}>Reset</button>
                </div>
            </div>

            {exercises.length ? 
                <div className='flex flex-wrap gap-4 justify-around items-center'>
                    {exercises.map((exercise: Exercise, index:number) => <ExerciseCard key={exercise.name+index} exercise={exercise} isLoading={isLoading} />)}
                </div> : 
                <div>
                    <div className='text-[44px]'>No exercises found...</div>
                </div>
            }
            
        </div>
    )
}

export default Exercises