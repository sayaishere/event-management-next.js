"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function EditEvent() {
    const [event, setEvent] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        venue: "",
        eventType: "",
        status: ""
    })

    const { id } = useParams<{ id: string }>();
    const router = useRouter()

    useEffect(() => {
        getEvent();
    }, [id])

    const getEvent = async () => {
        const res = await fetch(`/api/event/${id}`)
        const response = await res.json()
        if (res.status == 200 && response.data) {
            setEvent({
                ...response.data,
                eventDate: response.data.eventDate ? response.data.eventDate.slice(0, 10) : ""
            })
        }
    }

    const updateEvent = async () => {
        const { eventName, description, eventDate, venue, eventType, status } = event
        if (eventName && description && eventDate && venue && eventType && status) {
            const res = await fetch(`/api/event/${id}`, {
                method: 'PUT',
                body: JSON.stringify(event)
            })
            if (res.status == 200) {
                alert("Event updated successfully")
                router.push('/dashboard')
            }
        }
        else {
            alert("Please enter all details")
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-amber-300 my-5">Update Event</h1>
            <div className="bg-white p-6 rounded w-95">
                <form>
                    <input type="text" value={event.eventName} onChange={(e) => setEvent({ ...event, eventName: e.target.value })} placeholder="Event Name" className="p-2 border rounded w-full mb-3" />
                    <textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} placeholder="Event Description" className="p-2 border rounded w-full mb-3" />
                    <input type="date" value={event.eventDate} onChange={(e) => setEvent({ ...event, eventDate: e.target.value })} placeholder="Event Date" className="p-2 border rounded w-full mb-3" />
                    <input type="text" value={event.venue} onChange={(e) => setEvent({ ...event, venue: e.target.value })} placeholder="Venue" className="p-2 border rounded w-full mb-3" />
                    <input type="text" value={event.eventType} onChange={(e) => setEvent({ ...event, eventType: e.target.value })} placeholder="Event Type" className="p-2 border rounded w-full mb-3" />
                    <input type="text" value={event.status} onChange={(e) => setEvent({ ...event, status: e.target.value })} placeholder="Event status" className="p-2 border rounded w-full mb-3" />
                    <button type="button" onClick={updateEvent} className="bg-black text-white p-2 rounded w-full">Update EVENT</button>
                </form>
            </div>
        </div>
    )
}