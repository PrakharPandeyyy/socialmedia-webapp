
# Social Media Web-APP

This is a full-stack web application that serves as a social media app. It provides similar features and functionalities as Facebook, including user registration, login, posting updates, commenting, liking posts, and more. The application is built using the MERN stack, which includes MongoDB, Express.js, React, and Node.js.


## Installation

Install my-project with npm

```bash
  git clone https://github.com/PrakharPandeyyy/socialmedia-webapp
  cd ./frontend
  npm i
  cd ./backend
  npm i
```
    
## Usage/Examples

```javascript
Make sure you have MongoDB installed and running on your system.
Create a .env file in the root directory and provide the necessary environment variables. You can use the .env.example file as a template.
To start the server and the client, go back to the root directory and run:

npm start

Open your web browser and visit http://localhost:3000 to access the Social Media web app.


```


## Tech Stack

**Client:** React, Redux, CSS

**Server:** Node, Express
```
MongoDB: A NoSQL database used for storing user information, posts, comments, etc.

Express.js: A minimal and flexible Node.js web application framework used for building the backend server.

React: A JavaScript library for building user interfaces, used for the frontend.

Node.js: A JavaScript runtime environment used for the server-side development.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, used for database interactions.

Redux: A state management library for managing application state in the frontend.

Axios: A promise-based HTTP client used for making API requests.
JWT (JSON Web Tokens): Used for secure authentication and user session management.

Bcrypt: A library used for hashing and salting passwords for secure storage.

Bootstrap: A popular CSS framework used for styling the user interface.
```


## Features

- User registration and authentication.
- Posting status updates with text and media (images and videos).
- Commenting on posts.
Liking posts.
- User profiles with avatar images and cover photos.
- Friend requests and friend lists.
- Real-time notifications for new friend requests, likes, and     comments.
- News feed displaying posts from friends in chronological order.
- Search functionality to find other users.


## End Points
- `POST /api/auth/register:` Register a new user.
- `POST /api/auth/login:` Log in an existing user.
- `POST /api/posts:` Create a new post.
- `GET /api/posts:` Get all posts in the news feed.
- `GET /api/posts/:`postId: Get a specific post by ID.
- `POST /api/posts/:postId/comment:` Add a comment to a post.
- `PUT /api/posts/:postId/like:` Like or unlike a post.
- `GET /api/users/:userId:` Get a user's profile information.
- `POST /api/users/:userId/send-friend-request:` Send a friend request to another user.
- `PUT /api/users/:userId/accept-friend-request:` Accept a friend request.
- `PUT /api/users/:userId/decline-friend-request:` Decline a friend request.
- `GET /api/users/:userId/friends:` Get the list of friends for a user.
- `GET /api/search/users:` Search for users based on their names or usernames.

## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.

Fork the repository.
- Create a new branch with a descriptive name for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your forked repository.
- Create a pull request with a detailed explanation of your changes

