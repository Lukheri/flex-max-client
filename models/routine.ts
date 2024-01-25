import mongoose, { Schema, models } from 'mongoose'

const routineSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      exercises: {
        type: Array,
        required: true,
      },
    },
    { timestamps: true },
  )
  
  const Routine = models.Routine || mongoose.model('Routine', routineSchema)
  export default Routine