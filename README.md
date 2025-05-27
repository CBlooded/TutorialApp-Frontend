# TutorialApp Chat Application

## Overview
TutorialApp is a real-time chat application built with React, TypeScript, and WebSockets. It allows users to register, login, join chat rooms using room keys, and exchange messages in real time.

## Features
- User authentication (register/login)
- Real-time messaging using WebSockets
- Chat room functionality with room keys
- Message history
- Responsive design
- Protected routes for authenticated users

## Tech Stack
- React 19
- TypeScript
- Vite
- WebSockets (STOMP over SockJS)
- Axios for HTTP requests
- React Hook Form for form handling
- React Router for navigation

## Prerequisites
- Node.js (v16+)
- npm or yarn
- Backend server running at http://localhost:8080

## Installation
1. Clone the repository
`git clone https://github.com/CBlooded/TutorialApp-Frontend.git`
`cd TutorialApp-Frontend`
2. Install dependencies
`npm install`
3. Start the development server:
`npm run dev`
4. Set up the backend
   - Clone the backend repository:
     `git clone https://github.com/CBlooded/TutorialApp-Backend.git`
     `cd TutorialApp-Backend`
   - Follow the instructions in the backend README.md


## Usage
1. Register a new account or login with existing credentials
2. Navigate to the Chat page
3. Enter a room key (must start with #, e.g., #key12)
4. Start chatting in real-time with other users in the same room

## Project Structure
- `/src/components`: UI components (Login, Register, NavBar, ChatRoomMessenger)
- `/src/pages`: Page components (Dashboard, Chat)
- `/src/Services`: Service modules (WebSocket service)
- `/src/api`: API configuration and interceptors
- `/src/assets`: Static assets

## API Endpoints
- Authentication: `/api/v1/auth/authenticate` (POST)
- Registration: `/api/v1/auth/register` (POST)
- Chat WebSocket: `http://localhost:8080/chat`
- Chat topics: `/topic/messages/{roomKey}`
- Send message: `/app/sendMessage/{roomKey}`

## WebSocket Configuration
The application uses STOMP over SockJS for WebSocket communication. Messages are sent to specific rooms and received from subscribed topics.

## Styling
Styling is done using CSS files for each component.
