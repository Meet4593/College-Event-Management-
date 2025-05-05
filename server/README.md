# College Event Management System

A full-stack web application for managing college events using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication (Login/Register)
- Create, Read, Update, Delete (CRUD) operations for events
- Image upload for events
- Search functionality
- Modern and responsive UI using Material-UI
- Secure API endpoints with JWT authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/college-events
   JWT_SECRET=your-secret-key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Register a new account or login with existing credentials
2. Create new events with details like title, description, date, time, venue, and image
3. View all events on the home page
4. Search for specific events using the search bar
5. Click on an event to view its details
6. Edit or delete events as needed

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get a specific event
- POST /api/events - Create a new event
- PUT /api/events/:id - Update an event
- DELETE /api/events/:id - Delete an event
- GET /api/events/search/:query - Search events

## Technologies Used

- Frontend:
  - React.js
  - Material-UI
  - Axios
  - React Router

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication
  - Multer for file uploads

## License

This project is licensed under the MIT License. 