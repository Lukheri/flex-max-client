import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import Routine from "@/models/routine"

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

export async function POST(req: NextRequest){
    try {
        const {name, description, exercises} = await req.json()

        await connectMongoDB()

        await Routine.create({name, description, exercises})
        
        return NextResponse.json({message: "Routine created"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}