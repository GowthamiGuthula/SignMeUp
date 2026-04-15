/**
 * Attendee Helper Functions
 * 
 * These functions handle different attendee data formats and provide
 * consistent formatting throughout the application.
 * 
 * Supported formats:
 * 1. String format: "Alice Smith"
 * 2. Object with name: { name: "Alice Smith", email: "...", phone: "..." }
 * 3. Object with firstName/lastName: { firstName: "Alice", lastName: "Smith", email: "...", phone: "..." }
 */

/**
 * Formats attendee name for display
 * Shows "First name + Last name initial" for new format, full name for old formats
 * @param {Object|String} attendee - The attendee data
 * @returns {String} Formatted name
 */
export const formatAttendeeName = (attendee) => {
    // Handle old string format: "Alice Smith"
    if (typeof attendee === 'string') {
      return attendee
    }
    
    // Handle new firstName/lastName format: { firstName, lastName }
    if (attendee?.firstName && attendee?.lastName) {
      return `${attendee.firstName} ${attendee.lastName.charAt(0)}.`
    }
    
    // Handle fallback name property: { name }
    if (attendee?.name) {
      return attendee.name
    }
    
    // Default fallback
    return 'Unknown'
  }
  
  /**
   * Gets the full name of an attendee (first + last)
   * @param {Object|String} attendee - The attendee data
   * @returns {String} Full name
   */
  export const getAttendeeFullName = (attendee) => {
    // Handle old string format
    if (typeof attendee === 'string') {
      return attendee
    }
    
    // Handle new firstName/lastName format
    if (attendee?.firstName && attendee?.lastName) {
      return `${attendee.firstName} ${attendee.lastName}`
    }
    
    // Handle fallback name property
    return attendee?.name || ''
  }
  
  /**
   * Gets the avatar letter (first letter of first name or full name)
   * @param {Object|String} attendee - The attendee data
   * @returns {String} Avatar letter
   */
  export const getAttendeeAvatarLetter = (attendee) => {
    const name = typeof attendee === 'string' ? attendee : 
                  attendee?.firstName || attendee?.name || ''
    return name.charAt(0) || '?'
  }
  
  /**
   * Normalizes phone number by removing non-digits
   * @param {String} phone - Phone number in any format
   * @returns {String} Cleaned phone number (digits only)
   */
  export const normalizePhone = (phone) => {
    return phone.replace(/\D/g, '')
  }
  
  /**
   * Checks if two attendees match based on name, email, or phone
   * @param {Object|String} attendee1 - First attendee
   * @param {Object|String} attendee2 - Second attendee
   * @returns {Boolean} True if attendees match
   */
  export const attendeesMatch = (attendee1, attendee2) => {
    const name1 = getAttendeeFullName(attendee1).toLowerCase()
    const name2 = getAttendeeFullName(attendee2).toLowerCase()
    
    // Check by name
    if (name1 && name2 && name1 === name2) {
      return true
    }
    
    // Check by email
    if (attendee1?.email && attendee2?.email) {
      if (attendee1.email.toLowerCase() === attendee2.email.toLowerCase()) {
        return true
      }
    }
    
    // Check by phone (normalized)
    if (attendee1?.phone && attendee2?.phone) {
      const phone1 = normalizePhone(attendee1.phone)
      const phone2 = normalizePhone(attendee2.phone)
      if (phone1 === phone2 && phone1.length === 10) {
        return true
      }
    }
    
    return false
  }
  