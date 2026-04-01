import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Events from './Pages/Events';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;