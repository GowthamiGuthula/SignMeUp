/**
 * Custom Hook for Attendee Management
 * 
 * This hook encapsulates all attendee-related logic including:
 * - Finding events
 * - Duplicate detection
 * - RSVP operations
 * 
 * Usage: const { event, isDuplicate, rsvpToEvent, cancelRsvp } = useAttendees(eventId)
 */

import { useEvents } from '../context/EventsContext'
import { attendeesMatch } from '../utils/attendeeHelpers'

/**
 * Custom hook for attendee management operations
 * @param {Number} eventId - The ID of the event to work with
 * @returns {Object} Attendee management utilities
 */
export const useAttendees = (eventId) => {
  // Get events and operations from context
  const { events, rsvpToEvent, cancelRsvp } = useEvents()
  
  // Find the specific event
  const event = events.find(e => e.id === eventId)
  
  /**
   * Checks if a user is already registered for this event
   * Compares by name, email, or phone to handle different data formats
   * 
   * @param {String} firstName - User's first name
   * @param {String} lastName - User's last name
   * @param {String} email - User's email (optional)
   * @param {String} phone - User's phone (optional)
   * @returns {Object|null} Existing attendee object or null
   */
  const findDuplicateAttendee = (firstName, lastName, email, phone) => {
    if (!event || !event.attendees) return null
    
    const newAttendee = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim(),
      phone: phone?.trim()
    }
    
    // Find any existing attendee that matches
    return event.attendees.find(existing => 
      attendeesMatch(newAttendee, existing)
    )
  }
  
  /**
   * Checks if user is already attending this event
   * @param {Object} savedUserInfo - Saved user information
   * @returns {Boolean} True if user is already attending
   */
  const isAlreadyAttending = (savedUserInfo) => {
    if (!event || !event.attendees || !savedUserInfo) return false
    
    return event.attendees.some(attendee => 
      attendeesMatch(savedUserInfo, attendee)
    )
  }
  
  /**
   * Gets the display names for first few attendees
   * @param {Number} limit - Maximum number of attendees to return (default: 3)
   * @returns {Array} Array of formatted attendee names
   */
  const getDisplayAttendees = (limit = 3) => {
    if (!event || !event.attendees) return []
    
    return event.attendees.slice(0, limit)
  }
  
  /**
   * Checks if there are more attendees than the display limit
   * @param {Number} limit - Display limit (default: 3)
   * @returns {Boolean} True if there are more attendees
   */
  const hasMoreAttendees = (limit = 3) => {
    if (!event || !event.attendees) return false
    return event.attendees.length > limit
  }
  
  /**
   * Gets the number of additional attendees beyond display limit
   * @param {Number} limit - Display limit (default: 3)
   * @returns {Number} Number of additional attendees
   */
  const getAdditionalAttendeesCount = (limit = 3) => {
    if (!event || !event.attendees) return 0
    return Math.max(0, event.attendees.length - limit)
  }
  
  /**
   * Gets the full name of an attendee for RSVP operations
   * @param {Object} attendee - Attendee object
   * @returns {String} Full name for RSVP operations
   */
  const getAttendeeNameForRSVP = (attendee) => {
    if (typeof attendee === 'string') return attendee
    if (attendee?.firstName && attendee?.lastName) {
      return `${attendee.firstName} ${attendee.lastName}`
    }
    return attendee?.name || ''
  }
  
  return {
    // Event data
    event,
    
    // Duplicate detection
    findDuplicateAttendee,
    isAlreadyAttending,
    
    // Display utilities
    getDisplayAttendees,
    hasMoreAttendees,
    getAdditionalAttendeesCount,
    
    // RSVP operations
    rsvpToEvent,
    cancelRsvp,
    getAttendeeNameForRSVP,
    
    // Event metadata
    slotsLeft: event ? event.totalSlots - event.slotsBooked : 0,
    totalSlots: event?.totalSlots || 0,
    slotsBooked: event?.slotsBooked || 0,
    attendeesCount: event?.attendees?.length || 0
  }
}
