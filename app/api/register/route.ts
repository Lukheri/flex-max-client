import { NextResponse } from "next/server"

export async function POST(req: { json: () => PromiseLike<{ userName: any; email: any; password: any }> | { userName: any; email: any; password: any } }){
    try {
        const {userName, email, password} = await req.json()

        console.log("yo",userName, email, password)
        return NextResponse.json({message: "User registered"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "An error occured"}, {status: 500}
        )
    }
}