import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req: { json: () => PromiseLike<{ userName: any; email: any; password: any }> | { userName: any; email: any; password: any } }){
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