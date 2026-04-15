import { Routes, Route } from 'react-router-dom'
import { EventsProvider } from './context/EventsContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import AddEvent from './pages/AddEvent'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <EventsProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<AddEvent />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </EventsProvider>
  )
}

export default App
