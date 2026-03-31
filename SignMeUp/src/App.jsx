import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;