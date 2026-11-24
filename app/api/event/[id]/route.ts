import { connectDB } from "@/lib/mongodb";
import events from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const { id } = await params;
        const eventDetails = await events.findById({ _id: id })
        return NextResponse.json({ message: "event details", data: eventDetails }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong", data: {} }, { status: 500 })

    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const { id } = await params;
        const body = await req.json()
        const updatedEvent = await events.findByIdAndUpdate({ _id: id }, body, { new: true })
        return NextResponse.json({ message: "event updated successfully", data: updatedEvent }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong", data: {} }, { status: 500 })

    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const { id } = await params;
        const deletedEvent = await events.findByIdAndDelete({ _id: id })
        return NextResponse.json({ message: "event deleted successfully", data: deletedEvent }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong", data: {} }, { status: 500 })

    }
}


