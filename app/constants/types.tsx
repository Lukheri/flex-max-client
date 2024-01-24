export type Exercise = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}

export type Routine = {
  name: string
  description: string
  exercises: Exercise[]
}
