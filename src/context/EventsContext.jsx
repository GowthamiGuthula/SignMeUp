import { createContext, useContext, useState } from 'react'
import INITIAL_EVENTS from '../data/events'
import { getAttendeeFullName } from '../utils/attendeeHelpers'

/**
 * EventsContext
 * 
 * This context provides global state management for all events in the application.
 * It handles event data, RSVP operations, and event creation.
 * 
 * The context is used throughout the app to access and modify event information.
 */

// Create the context object
const EventsContext = createContext()

/**
 * EventsProvider Component
 * 
 * This provider component wraps the application and provides event state
 * and operations to all child components.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export function EventsProvider({ children }) {
  // Initialize events state with mock data
  const [events, setEvents] = useState(INITIAL_EVENTS)

  /**
   * RSVP to Event
   * 
   * Adds a user to the event's attendees list and increments the booked slots.
   * This is called when a user successfully submits an RSVP.
   * 
   * @param {Number} eventId - ID of the event to RSVP to
   * @param {Object} userInfo - User information object
   */
  const rsvpToEvent = (eventId, userInfo) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? { 
              ...ev, 
              attendees: [...ev.attendees, userInfo], 
              slotsBooked: ev.slotsBooked + 1 
            }
          : ev
      )
    )
  }

  /**
   * Cancel RSVP
   * 
   * Removes a user from the event's attendees list and decrements booked slots.
   * This is called when a user cancels their RSVP.
   * 
   * @param {Number} eventId - ID of the event to cancel RSVP for
   * @param {String} userName - Name of the user to remove
   */
  const cancelRsvp = (eventId, userName) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              // Use shared utility to filter attendees by name
              attendees: ev.attendees.filter((attendee) => 
                getAttendeeFullName(attendee) !== userName
              ),
              slotsBooked: ev.slotsBooked - 1,
            }
          : ev
      )
    )
  }

  /**
   * Add New Event
   * 
   * Creates a new event with a unique ID and adds it to the events list.
   * This is called when a user creates a new event through the Add Event form.
   * 
   * @param {Object} newEvent - New event data (without id, slotsBooked, attendees)
   * @returns {Number} The ID of the newly created event
   */
  const addEvent = (newEvent) => {
    // Generate unique ID by finding the highest existing ID and adding 1
    const nextId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1
    
    // Add new event with default values for slots and attendees
    setEvents((prev) => [
      ...prev, 
      { 
        ...newEvent, 
        id: nextId, 
        slotsBooked: 0, 
        attendees: [] 
      }
    ])
    
    return nextId
  }

  // Provide the context value to all child components
  return (
    <EventsContext.Provider value={{ events, rsvpToEvent, cancelRsvp, addEvent }}>
      {children}
    </EventsContext.Provider>
  )
}

/**
 * useEvents Custom Hook
 * 
 * This custom hook provides easy access to the EventsContext in any component.
 * It encapsulates the useContext hook and provides a clean API.
 * 
 * Usage: const { events, rsvpToEvent, cancelRsvp, addEvent } = useEvents()
 * 
 * @returns {Object} Context value containing events and operations
 */
export function useEvents() {
  return useContext(EventsContext)
}
