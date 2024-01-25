import { create } from 'zustand'
import { Exercise, Routine } from "../app/constants/types";

interface RoutineState {
    routines: any[],
    loadingRoutines: boolean,
    setLoadingRoutines: (loading: boolean) => void
    selectedRoutine: Routine
    addRoutine: any
    getRoutines: any
}

export const useRoutineStore = create<RoutineState>()((set) => ({
    routines: [],
    loadingRoutines: false,
    setLoadingRoutines: (loading: boolean) => set({loadingRoutines: loading}),
    selectedRoutine: {
        name: "",
        description: "",
        exercises: [],
        userEmail: ""
    },
    addRoutine: async (routine: Routine) => {
        try {
            const createRoutine = await fetch('api/routine', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(routine),
            })
      
          } catch (error) {
            console.log('Error fetching create routine', error)
          }
    },
    getRoutines: async () => {
        try {
            const response = await fetch(`api/routine`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
      
            if (response.status === 201) {
              const data = await response.json()
              set({routines: data.data})
            } else {
              throw new Error('Request failed')
            }
          } catch (error) {
            console.log('Error fetching create routine', error)
          }
    }
}))


