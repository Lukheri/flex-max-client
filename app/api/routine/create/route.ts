import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
import Routine from "@/models/routine"
// import bcrypt from 'bcryptjs'

export async function POST(req: { json: () => PromiseLike<{ name: string; description: string; exercises: [] }> | { name: string; description: string; exercises: [] }}){
    try {
        const {name, description, exercises} = await req.json()

        console.log(name, description, exercises)

        await connectMongoDB()

        await Routine.create({name, description, exercises})
        
        return NextResponse.json({message: "Routine created"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}