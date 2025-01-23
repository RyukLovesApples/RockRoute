RockRoute

RockRoute is a Reddit-inspired social media web application where users can create accounts, post content, comment on posts, and interact with others via upvotes and downvotes. The project is designed to strengthen programming knowledge and showcase full-stack development skills.

Features

User Authentication: Users can register and log in securely using bcrypt for password hashing.

Posts: Users can create, edit, and delete posts.

Comments: Nested comments are supported, allowing users to reply to posts or other comments.

Voting System: Upvote and downvote functionality for both posts and comments.

Real-Time Updates: WebSocket integration ensures real-time updates for voting.

Dynamic Rendering: EJS templates are used to dynamically render content based on user interactions.

Responsive Design: Mobile-friendly interface for seamless browsing.

Technologies Used

Frontend

HTML/CSS/JavaScript: Vanilla JavaScript for interactivity and DOM manipulation.

EJS: Template engine for rendering dynamic content.

Backend

Node.js: Server-side JavaScript runtime.

Express.js: Framework for handling routes and server logic.

WebSocket (ws): Real-time communication for voting updates.

PostgreSQL: Relational database for storing user, post, comment, and vote data.

bcrypt: For password hashing and secure authentication.

Installation and Setup

Clone the repository:

git clone https://github.com/yourusername/rockroute.git
cd rockroute

Install dependencies:

npm install

Set up the database:

Create a PostgreSQL database.

Update the database configuration in the .env file (create one if it doesn’t exist):

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

Run migrations and seed data (if applicable).

Start the server:

npm start

Open the application in your browser at http://localhost:3000.

Project Structure

rockroute/
├── public/         # Static files (CSS, JavaScript, images)
│   ├── utils/      # Utility scripts
│   ├── scripts/    # Client-side JavaScript
│   └── templates/  # Frontend templates
├── routes/         # Express route handlers
├── models/         # Database models and queries
├── views/          # EJS templates
├── controllers/    # Application logic
├── app.js          # Entry point of the application
└── .env            # Environment variables (not included in repo)

Key Functionalities

Authentication

Secure user authentication with bcrypt.

Login and registration forms with proper error handling.

Post and Comment Management

Create, read, update, and delete posts and comments.

Support for nested comment structures.

Voting System

Users can upvote or downvote posts and comments.

WebSocket integration provides real-time updates for vote counts without page reloads.

Real-Time Features

WebSocket functionality ensures that updates are instantly reflected for all connected users.

No page reloads required for voting actions.

Future Improvements

Testing: Add comprehensive unit and integration tests.

Containerization: Introduce Docker for easier setup and deployment.

Enhanced Features: Add support for user profiles and direct messaging.

Acknowledgments

This project was inspired by Reddit and built as a way to deepen my understanding of full-stack web development and real-time communication.

License

This project is licensed under the MIT License. See the LICENSE file for details.
