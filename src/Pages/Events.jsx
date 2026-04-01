import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Events.css'

const SAMPLE_EVENTS = [
  { id: 1, name: 'React Workshop', date: '2026-04-15', location: 'Room 101', description: 'Learn React fundamentals and build a project.', category: 'upcoming', attendees: 24 },
  { id: 2, name: 'Team Building Picnic', date: '2026-05-01', location: 'Central Park', description: 'Outdoor team activities and lunch.', category: 'upcoming', attendees: 45 },
  { id: 3, name: 'Design Sprint', date: '2026-03-10', location: 'Studio B', description: 'Rapid prototyping and user testing session.', category: 'past', attendees: 12 },
  { id: 4, name: 'Hackathon 2026', date: '2026-06-20', location: 'Main Hall', description: '24-hour coding challenge with prizes.', category: 'upcoming', attendees: 80 },
  { id: 5, name: 'Onboarding Mixer', date: '2026-02-28', location: 'Lounge', description: 'Welcome event for new members.', category: 'past', attendees: 30 },
]

const FILTERS = ['All', 'Upcoming', 'Past', 'My Events']

function Events() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = SAMPLE_EVENTS.filter((ev) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Upcoming') return ev.category === 'upcoming'
    if (activeFilter === 'Past') return ev.category === 'past'
    return false
  })

  return (
    <div className="events-page">
      <div className="events-header">
        <h1 className="page-title">Events</h1>
        <Link to="/events/create" className="btn btn--primary">+ Create Event</Link>
      </div>

      <div className="events-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`events-filter ${f === activeFilter ? 'events-filter--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filtered.map((ev) => (
          <Link to={`/events/${ev.id}`} key={ev.id} className="event-card">
            <div className="event-card-date">
              <span className="event-card-month">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
              <span className="event-card-day">{new Date(ev.date).getDate()}</span>
            </div>
            <div className="event-card-body">
              <h3 className="event-card-name">{ev.name}</h3>
              <p className="event-card-location">{ev.location}</p>
              <p className="event-card-desc">{ev.description}</p>
            </div>
            <div className="event-card-meta">
              <span className="event-card-attendees">{ev.attendees} attending</span>
              <span className={`event-card-badge ${ev.category === 'past' ? 'event-card-badge--past' : ''}`}>
                {ev.category === 'upcoming' ? 'Upcoming' : 'Past'}
              </span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="events-empty">No events found for this filter.</p>
        )}
      </div>
    </div>
  )
}

export default Events
