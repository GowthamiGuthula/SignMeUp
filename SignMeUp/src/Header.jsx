import React from 'react';
import './Header.css';
import logo from './assets/signmeuplogo.png'
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="brand">
                      <img src={logo} alt="SignMeUp logo" className="brand__logo-img" />
                    <div className="brand__text">
                        <h1>SignMeUp</h1>
                    </div>
                </div>

                <nav className="site-nav" aria-label="Primary">
                    <button className="btn btn--ghost">About</button>
                    <button className="btn btn--primary">Sign up</button>
                    <NavLink to="/Events" className="btn btn--secondary">Events</NavLink>
                </nav>
            </div>
        </header>
    );
}