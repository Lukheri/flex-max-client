import { create } from 'zustand'
import { Exercise, Routine } from "../app/constants/types";

interface RoutineState {
    routines: any[],
    loadingRoutines: boolean,
    userRoutines: any[]
    setUserRoutines: any
    setLoadingRoutines: (loading: boolean) => void
    selectedRoutine: Routine
    addRoutine: any
    getRoutines: any
    viewRoutine: any
}

export const useRoutineStore = create<RoutineState>()((set) => ({
    routines: [],
    loadingRoutines: false,
    userRoutines: [],
    setUserRoutines: (routines: Routine[]) => set({userRoutines: routines}),
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
    },
    viewRoutine: async (id: any) => {
        try {
            const response = await fetch(`/api/routine/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
      
            if (response.status === 201) {
              const data = await response.json()
              return data.data
            } else {
              throw new Error('Request failed')
            }
          } catch (error) {
            console.log('Error fetching create routine', error)
          }
    }
}))


