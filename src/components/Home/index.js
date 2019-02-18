import React from 'react';
import footer from '../Footer'


const HomePage = () => (
  <div>
    <Home />
    <footer />
  </div>
);

const Home = () => (
  <div>
  <h1>Home Page</h1>
  <p> The Home Page is accessible by every user.</p>
</div>
);

export default (HomePage);
