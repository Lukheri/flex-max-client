import { create } from 'zustand'
import { Exercise, Routine } from "../app/constants/types";

interface RoutineState {
    routines: Routine[],
    selectedRoutine: Routine
    addRoutine: (routine: Routine) => void
}

export const useRoutineStore = create<RoutineState>()((set) => ({
    routines: [],
    selectedRoutine: {
        name: "",
        description: "",
        exercises: []
    },
    addRoutine: (routine: Routine) => set((state) => ({routines: [...state.routines, routine]}))
}))


