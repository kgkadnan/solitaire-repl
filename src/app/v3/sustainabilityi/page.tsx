import MainLayout from '@/components/v3/scroller/main-layout';
import VerticalContainer from '@/components/v3/scroller/vertical-component';
import React from 'react';

const items = [
  {
    id: 1,
    title: 'Card 1',
    description: 'This is the description for card 1.',
    imageUrl: 'https://via.placeholder.com/150',
    details: 'Detailed information about card 1.'
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'This is the description for card 2.',
    imageUrl: 'https://via.placeholder.com/150',
    details: 'Detailed information about card 2.'
  }
  // Add more items as needed
];

const App: React.FC = () => {
  return (
    <div>
      <VerticalContainer items={items} />
      <MainLayout />;
    </div>
  );
};

export default App;
