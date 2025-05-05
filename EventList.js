import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredEvents.map(event => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Type: {event.type}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            {event.image && <img src={event.image} alt={event.title} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList; 