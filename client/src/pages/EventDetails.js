import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {event.image && (
          <Box sx={{ mb: 3 }}>
            <img
              src={`http://localhost:5000/${event.image}`}
              alt={event.title}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </Box>
        )}
        <Typography variant="h4" component="h1" gutterBottom>
          {event.title}
        </Typography>
        <Chip
          label={event.eventType}
          color="primary"
          sx={{ mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          Date and Time
        </Typography>
        <Typography variant="body1" paragraph>
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Venue
        </Typography>
        <Typography variant="body1" paragraph>
          {event.venue}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Created By
        </Typography>
        <Typography variant="body1" paragraph>
          {event.createdBy.name}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/events/${id}/edit`)}
          >
            Edit Event
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete Event
          </Button>
        </Box>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this event? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetails; 