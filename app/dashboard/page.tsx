"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface EventItem {
    _id: string,
    eventName: string,
    description: string,
    eventDate: string,
    venue: string,
    eventType: string,
    status: string
}
export default function Dashboard() {

    const [events, setEvents] = useState<EventItem[]>([])

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        const res = await fetch("/api/event")
        const response = await res.json();
        setEvents(response.data)
    }

    const removeEvent = async (id: string) => {
        const res = await fetch(`/api/event/${id}`, {
            method: 'DELETE'
        })
        if (res.status == 200) {
            fetchEvents()
        }
    }


    return (
        <div className="min-h-screen bg-gray-300">
            <h1>All Events</h1>
            <Link href={"/dashboard/add"} className="text-white rounded bg-red-300 p-2 font-bold">Add New Event</Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    events?.length > 0 ?
                        events.map((event) => (
                            <div key={event._id} className="bg-white p-5 shadow rounded">
                                <h2 className="text-xl font-bold">{event.eventName}</h2>
                                <p>{event.description}</p>
                                <p>{event.eventDate?.slice(0, 10)}</p>
                                <p>{event.venue}</p>
                                <p>{event.eventType}</p>
                                <p>{event.status}</p>
                                <div className="flex gap-3 mt-5">
                                    <Link href={`/dashboard/${event._id}`} className="bg-blue-600 text-white p-2 rounded">
                                        Edit
                                    </Link>
                                    <button onClick={() => removeEvent(event._id)} className="bg-red-600 text-white p-2 rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                        :
                        <p>No events added yet!</p>
                }
            </div>
        </div>
    )
}