import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
import Routine from "@/models/routine"
// import bcrypt from 'bcryptjs'

export async function GET(){
    try {
        await connectMongoDB()

        const data = await Routine.find({})
        
        return NextResponse.json({message: "Routine fetched", data: data}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}