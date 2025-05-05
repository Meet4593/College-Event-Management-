import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/events/${id}`);
          const event = res.data;
          setTitle(event.title);
          setDescription(event.description);
          setType(event.type);
          setDate(event.date);
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      };
      fetchEvent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('date', date);
    if (image) formData.append('image', image);

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/events/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/events');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Event' : 'Create Event'}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default EventForm; 