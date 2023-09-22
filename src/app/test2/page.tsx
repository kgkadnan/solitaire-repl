'use client';
import { useEffect } from 'react';

const ListingPage = () => {
  useEffect(() => {
    const handlePopstate = (event: any) => {
      console.log('herrrrrrrrrrrrr');
      // Check if the event is a popstate event
      if (event.type === 'popstate') {
        // Access the state object to get data
        const state = event.state;
        if (state) {
          console.log('Data from previous page:', state.searchParam);
          // Use the data as needed
        }
      }
    };

    // Attach the event listener
    window.addEventListener('popstate', handlePopstate);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []); // Empty dependency array means this effect runs only once

  return <div>Listing Page</div>;
};

export default ListingPage;
