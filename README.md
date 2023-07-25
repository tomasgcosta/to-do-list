# To-Do List App

## Description

This is a To-Do List application built using the MERN stack (PostgreSQL, Express.js, React.js, Node.js). It allows users to manage their tasks by creating, updating, and marking tasks as completed. The project also includes user authentication using JSON Web Token (JWT) and bcrypt for password hashing.

The application uses PostgreSQL as the database, Express.js as the backend server, React.js for the frontend, and Tailwind CSS for styling.

## Features

- User Registration and Login with JWT authentication
- Create, Read, Update, and Delete tasks
  
## Technologies Used

- PostgreSQL (Database)
- Express.js (Backend Server)
- React.js (Frontend)
- Tailwind CSS (Styling)
- JSON Web Token (JWT) for user authentication
- bcrypt for password hashing
- npm cors for handling cross-origin requests
- pool query for interacting with the PostgreSQL database

## Installation and Setup

1. Clone the repository: `git clone https://github.com/your-username/to-do-list.git`
2. Navigate to the project directory: `cd to-do-list`
3. Install server dependencies: `npm install`
4. Navigate to the client directory: `cd client`
5. Install client dependencies: `npm install`
6. Set up the PostgreSQL database and configure the connection in `server.js`
7. Run the server and client concurrently: `npm run dev`

## Usage

- Access the application at `http://localhost:3000` in your web browser.
- Register a new user or log in with existing credentials to start managing your tasks.

## Acknowledgments

- [Express.js](https://expressjs.com/) - Backend framework
- [React.js](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [JSON Web Token (JWT)](https://jwt.io/) - User authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [npm cors](https://www.npmjs.com/package/cors) - Handling CORS
- [pool query](https://www.npmjs.com/package/pg-pool) - PostgreSQL client library
