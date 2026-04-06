import { createContext, useContext, useState } from 'react'
import INITIAL_EVENTS from '../data/events'

const EventsContext = createContext()

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(INITIAL_EVENTS)

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
      slotsBooked: 0,
      attendees: [],
      cancelled: false,
    }
    setEvents((prev) => [newEvent, ...prev])
    return newEvent.id
  }

  const updateEvent = (id, updater) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? (typeof updater === 'function' ? updater(ev) : { ...ev, ...updater }) : ev))
    )
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider')
  }
  return context
}
