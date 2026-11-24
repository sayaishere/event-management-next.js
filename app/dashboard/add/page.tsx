"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Add() {

    const [event, setEvent] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        venue: "",
        eventType: "",
        status: ""
    })
    const router = useRouter()

    const handleAddEvent = async () => {
        const { eventName, description, eventDate, venue, eventType, status } = event
        if (eventName && description && eventDate && venue && eventType && status) {
            const res = await fetch('/api/event', {
                method: "POST",
                body: JSON.stringify(event)
            })
            if (res.status == 201) {
                alert("Event added successfully")
                router.push("/dashboard")
            }

        }
        else {
            alert("Please enter all details")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-amber-300 my-5">Add new Event</h1>
            <div className="bg-white p-6 rounded w-95">
                <form>
                    <input type="text" value={event.eventName} onChange={(e) => setEvent({ ...event, eventName: e.target.value })} placeholder="Event Name" className="p-2 border rounded w-full mb-3" />
                    <textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} placeholder="Event Description" className="p-2 border rounded w-full mb-3" />
                    <input type="date" value={event.eventDate} onChange={(e) => setEvent({ ...event, eventDate: e.target.value })} placeholder="Event Date" className="p-2 border rounded w-full mb-3" />
                    <input type="text" value={event.venue} onChange={(e) => setEvent({ ...event, venue: e.target.value })} placeholder="Venue" className="p-2 border rounded w-full mb-3" />
                    <input type="text" value={event.eventType} onChange={(e) => setEvent({ ...event, eventType: e.target.value })} placeholder="Event Type" className="p-2 border rounded w-full mb-3" />
                    <input type="text" value={event.status} onChange={(e) => setEvent({ ...event, status: e.target.value })} placeholder="Event status" className="p-2 border rounded w-full mb-3" />
                    <button type="button" onClick={handleAddEvent} className="bg-black text-white p-2 rounded w-full">ADD EVENT</button>
                </form>
            </div>
        </div>
    )
}