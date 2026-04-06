import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '../context/EventsContext'
import { isPastEvent } from '../data/events'
import './Events.css'

const STATUS_FILTERS = ['All', 'Upcoming', 'Past', 'My Events']
const AVAILABILITY_OPTIONS = ['Any', 'Available', 'Full']

function Events() {
  const { events } = useEvents()
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [location, setLocation] = useState('')
  const [availability, setAvailability] = useState('Any')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const locations = useMemo(() => {
    const locs = [...new Set(events.map((ev) => ev.location))]
    locs.sort()
    return locs
  }, [events])

  const hasActiveFilters = search || dateFrom || dateTo || location || availability !== 'Any'

  const clearFilters = () => {
    setSearch('')
    setDateFrom('')
    setDateTo('')
    setLocation('')
    setAvailability('Any')
    setActiveFilter('All')
  }

  const filtered = events.filter((ev) => {
    const past = isPastEvent(ev)

    if (activeFilter === 'Upcoming' && past) return false
    if (activeFilter === 'Past' && !past) return false

    if (search) {
      const q = search.toLowerCase()
      const matchesText =
        ev.name.toLowerCase().includes(q) ||
        ev.shortDescription.toLowerCase().includes(q) ||
        ev.eventType.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q)
      if (!matchesText) return false
    }

    if (dateFrom && ev.date < dateFrom) return false
    if (dateTo && ev.date > dateTo) return false

    if (location && ev.location !== location) return false

    if (availability === 'Available' && ev.totalSlots - ev.slotsBooked <= 0) return false
    if (availability === 'Full' && ev.totalSlots - ev.slotsBooked > 0) return false

    return true
  })

  const showSlots = (ev) => {
    if (ev.visibility === 'Private' && !ev.showAttendeeNames) return false
    return true
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1 className="page-title">Events</h1>
        <Link to="/events/create" className="btn btn--primary">+ Create Event</Link>
      </div>

      <div className="events-search-bar">
        <span className="events-search-icon">🔍</span>
        <input
          type="text"
          className="events-search-input"
          placeholder="Search events by name, type, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="events-search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <div className="events-filters">
        <div className="events-status-filters">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              className={`events-filter ${f === activeFilter ? 'events-filter--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          className={`events-advanced-toggle ${showAdvanced ? 'events-advanced-toggle--active' : ''}`}
          onClick={() => setShowAdvanced((v) => !v)}
        >
          {showAdvanced ? 'Hide Filters' : 'More Filters'}
        </button>
      </div>

      {showAdvanced && (
        <div className="events-advanced-filters">
          <div className="events-filter-group">
            <label className="events-filter-label">Date From</label>
            <input
              type="date"
              className="events-filter-input"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="events-filter-group">
            <label className="events-filter-label">Date To</label>
            <input
              type="date"
              className="events-filter-input"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div className="events-filter-group">
            <label className="events-filter-label">Location</label>
            <select
              className="events-filter-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="events-filter-group">
            <label className="events-filter-label">Availability</label>
            <select
              className="events-filter-input"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              {AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {hasActiveFilters && (
            <button className="events-clear-btn" onClick={clearFilters}>
              Clear All
            </button>
          )}
        </div>
      )}

      {hasActiveFilters && (
        <p className="events-result-count">{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>
      )}

      <div className="events-grid">
        {filtered.map((ev) => {
          const past = isPastEvent(ev)
          const cancelled = ev.cancelled
          const cardClass = `event-card ${cancelled ? 'event-card--cancelled' : past ? 'event-card--past' : ''}`
          return (
            <Link to={`/events/${ev.id}`} key={ev.id} className={cardClass}>
              <img src={ev.thumbnail} alt={ev.name} className="event-card-img" />
              <div className="event-card-body">
                <div className="event-card-top">
                  <h3 className="event-card-name">{ev.name}</h3>
                  <div className="event-card-tags">
                    <span className={`event-card-visibility ${ev.visibility === 'Private' ? 'event-card-visibility--private' : ''}`}>
                      {ev.visibility}
                    </span>
                    <span className="event-card-type">{ev.eventType}</span>
                  </div>
                </div>
                <p className="event-card-desc">{ev.shortDescription}</p>
                <div className="event-card-meta">
                  <span className="event-card-meta-item">📅 {ev.date}</span>
                  <span className="event-card-meta-item">📍 {ev.location}</span>
                  {showSlots(ev) && (
                    <span className="event-card-meta-item">
                      🎟️ {ev.totalSlots - ev.slotsBooked} of {ev.totalSlots} slots available
                    </span>
                  )}
                </div>
                {cancelled && <span className="event-card-cancelled-label">Cancelled</span>}
                {!cancelled && past && <span className="event-card-past-label">Event Ended</span>}
              </div>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <p className="events-empty">No events found matching your filters.</p>
        )}
      </div>
    </div>
  )
}

export default Events
