'use client';

import React from 'react';
import Home from '../components/Home';
import HomeMobileV2 from '../components/HomeMobileV2';

/**
 * Both homepages ship in the same HTML for the A/B test (src/config/abTest.ts):
 * `data-ab="b"` on <html> (set by the ab-home edge function) shows the new
 * mobile homepage below 900px; everyone else sees Home. See home-ab.css.
 */
const HomePage: React.FC = () => (
  <>
    <div className="home-variant-a">
      <Home />
    </div>
    <div className="home-variant-b">
      <HomeMobileV2 />
    </div>
  </>
);

export default HomePage;
