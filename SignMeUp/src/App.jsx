import React from 'react';
import Header from './Header';
import Footer from './Footer';

function App () {
   return (
       <div className="app">
          <Header />
          <main className="app-main">
           <h1>Hello, LaunchCode</h1>
          </main>
           <Footer />
       </div>
   );
}

export default App;