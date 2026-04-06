import { Routes, Route } from 'react-router-dom'
import { EventsProvider } from './context/EventsContext'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Home from './pages/Home'
import Events from './pages/Events'

function App() {
  return (
    <EventsProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
      <Footer />
    </EventsProvider>
  )
}

export default App
