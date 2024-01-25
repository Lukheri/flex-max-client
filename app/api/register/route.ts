import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req: { json: () => PromiseLike<{ userName: string; email: string; password: string }> | { userName: string; email: string; password: string } }){
    try {
        const {userName, email, password} = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)

        await connectMongoDB()

        await User.create({userName, email, password: hashedPassword})
        
        return NextResponse.json({message: "User registered"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "An error occured"}, {status: 500}
        )
    }
}