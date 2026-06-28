'use client';

import React, { Suspense } from 'react';
import Contact from '../components/Contact';
import { useSearchParams } from 'next/navigation';

const BookInner: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedTour = searchParams?.get('tour') || '';
  return <Contact variant="booking" selectedTourTitle={selectedTour} />;
};

const BookPage: React.FC = () => (
  <Suspense fallback={<Contact variant="booking" selectedTourTitle="" />}>
    <BookInner />
  </Suspense>
);

export default BookPage;
