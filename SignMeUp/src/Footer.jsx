import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} SignMeUp. All rights reserved.</p>
        <nav className="site-footer__nav" aria-label="Footer">
          <a className="link" href="#">Privacy</a>
          <a className="link" href="#">Terms</a>
          <a className="link" href="#">Contact</a>
        </nav>
      </div>
    </footer>
  );
}