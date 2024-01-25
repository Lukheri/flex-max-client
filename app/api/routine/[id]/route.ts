import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import Routine from "@/models/routine"

export async function GET({ params }: { params: { id: number } } ){
    try {
        await connectMongoDB()

        const data = await Routine.findOne({_id: params.id})
        
        return NextResponse.json({message: "Routine fetched", data: data}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}


export async function DELETE({ params }: { params: { id: number } } ){
    try {
        await connectMongoDB()

        console.log(params.id)
        await Routine.findByIdAndDelete(params.id)
        
        return NextResponse.json({message: "Routine deleted"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}