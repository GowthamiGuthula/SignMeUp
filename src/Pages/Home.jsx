import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <h1 className="home-hero-title">
          Welcome to <span className="home-hero-accent">SignMeUp</span>
        </h1>
        <p className="home-hero-subtitle">
          Discover events, connect with people, and manage your schedule — all in one place.
        </p>
        <div className="home-hero-actions">
          <Link to="/register" className="btn btn--primary btn--lg">Get Started</Link>
          <Link to="/events" className="btn btn--outline btn--lg">Browse Events</Link>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature">
          <div className="home-feature-icon">📅</div>
          <h3>Discover Events</h3>
          <p>Browse upcoming events and find what interests you.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature-icon">✋</div>
          <h3>RSVP Instantly</h3>
          <p>One-click RSVP to events and manage your attendance.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature-icon">👤</div>
          <h3>Your Profile</h3>
          <p>Track your events and manage your personal info.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
