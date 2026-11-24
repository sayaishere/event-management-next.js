import mongoose from "mongoose";
import { eventNames } from "process";

interface event {
    eventName: string,
    description: string,
    eventDate: Date,
    venue: string,
    eventType: string,
    status: string
}

const eventSchema = new mongoose.Schema<event>({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

export default mongoose.models.events || mongoose.model<event>("events", eventSchema)