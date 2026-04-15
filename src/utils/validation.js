/**
 * Validation Utility Functions
 * 
 * These functions handle all form validation logic in a centralized way.
 * This makes validation reusable and easier to maintain.
 */

/**
 * Validates email format using regex
 * @param {String} email - Email address to validate
 * @returns {Boolean} True if email is valid
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  /**
   * Validates phone number format
   * Accepts formats: 1234567890, (123) 456-7890, 123-456-7890, 123.456.7890, 123 456 7890
   * Must be exactly 10 digits (excluding country code)
   * @param {String} phone - Phone number to validate
   * @returns {Boolean} True if phone is valid
   */
  export const validatePhone = (phone) => {
    // Remove all non-digit characters
    const cleanedPhone = phone.replace(/\D/g, '')
    return cleanedPhone.length === 10
  }
  
  /**
   * Validates RSVP form data
   * @param {Object} formData - Form data to validate
   * @param {String} formData.firstName - First name
   * @param {String} formData.lastName - Last name
   * @param {String} formData.email - Email (optional)
   * @param {String} formData.phone - Phone (optional)
   * @param {String} formData.rsvp - RSVP status
   * @returns {Object} Validation errors object
   */
  export const validateRSVP = (formData) => {
    const errors = {}
    
    // Validate required fields
    if (!formData.firstName?.trim()) {
      errors.firstName = 'First name is required'
    }
    
    if (!formData.lastName?.trim()) {
      errors.lastName = 'Last name is required'
    }
    
    if (!formData.rsvp) {
      errors.rsvp = 'Please select an RSVP option'
    }
    
    // Validate contact information (at least one is required)
    if (!formData.email?.trim() && !formData.phone?.trim()) {
      errors.contact = 'Either email or phone is required'
    }
    
    // Validate email format if provided
    if (formData.email?.trim() && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Validate phone format if provided
    if (formData.phone?.trim() && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    return errors
  }
  
  /**
   * Checks if there are any validation errors
   * @param {Object} errors - Validation errors object
   * @returns {Boolean} True if there are errors
   */
  export const hasValidationErrors = (errors) => {
    return Object.keys(errors).length > 0
  }
  
  /**
   * Gets the first validation error message
   * @param {Object} errors - Validation errors object
   * @returns {String|null} First error message or null
   */
  export const getFirstValidationError = (errors) => {
    const errorKeys = Object.keys(errors)
    return errorKeys.length > 0 ? errors[errorKeys[0]] : null
  }
  