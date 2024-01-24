import { create } from 'zustand'
import { Exercise } from "../app/constants/types";

interface ExerciseState {
    exercise: Exercise,
    setExercise: (exercise: Exercise) => void
}

export const useExerciseStore = create<ExerciseState>()((set) => ({
    exercise: {
        name: "",
        type: "",
        muscle: "",
        equipment: "",
        difficulty: "",
        instructions: "",
    },    
    setExercise: (exercise: Exercise) => set({exercise})
}))


