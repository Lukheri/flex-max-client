import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
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