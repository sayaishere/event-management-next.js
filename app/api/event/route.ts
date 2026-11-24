import { connectDB } from "@/lib/mongodb";
import events from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json()
        const newEvent = await events.create(body)
        return NextResponse.json({ message: "Event added successfully", data: newEvent }, { status: 201 })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong", data: {} }, { status: 500 })

    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const allEvents = await events.find()
        return NextResponse.json({ message: "All events", data: allEvents }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong", data: {} }, { status: 500 })

    }
}

