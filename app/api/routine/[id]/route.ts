import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongoose";
import Routine from "@/models/routine"

export async function DELETE(req: NextRequest,{ params }: { params: { id: number } } ){
    try {
        await connectMongoDB()

        await Routine.findByIdAndDelete(params.id)
        
        return NextResponse.json({message: "Routine deleted"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}

export async function GET(req: NextRequest,{ params }: { params: { id: number } } ){
    try {
        await connectMongoDB()

        const data = await Routine.findById(params.id)
        
        return NextResponse.json({message: "Routine fetched", data: data}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error getting routine"}, {status: 500}
        )
    }
}

export async function PUT(req: NextRequest,{ params }: { params: { id: number } } ){
    try {
        const {name, description, exercises} = await req.json()
        await connectMongoDB()

        const data = await Routine.findByIdAndUpdate(params.id,{name, description, exercises}, {new: true})
        
        return NextResponse.json({message: "Routine updated"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error updating routine"}, {status: 500}
        )
    }
}