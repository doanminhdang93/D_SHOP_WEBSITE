import React from 'react'
import Header from '../components/Layout/Header';
import EventCard from '../components/Events/EventCard';

const EventsPage = () => {
  return (
    <div>
        <Header activeHeading={4}></Header>
        <EventCard active={true}></EventCard>
        <EventCard active={true}></EventCard>
    </div>
  )
}

export default EventsPage;