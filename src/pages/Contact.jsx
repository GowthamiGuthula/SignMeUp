import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setSubmitted(true)
  }

  return (
    <div className="contact">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-text">
        Have questions or feedback? Fill out the form below and we will get back to you.
      </p>

      {submitted ? (
        <div className="contact-success">
          <p>Thank you, <strong>{name}</strong>! Your message has been sent.</p>
          <button
            className="contact-btn"
            onClick={() => { setName(''); setEmail(''); setMessage(''); setSubmitted(false) }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="contact-input"
            />
          </label>
          <label className="contact-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="contact-input"
            />
          </label>
          <label className="contact-label">
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              rows={4}
              className="contact-input"
            />
          </label>
          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      )}
    </div>
  )
}

export default Contact
