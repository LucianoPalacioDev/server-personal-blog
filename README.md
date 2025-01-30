# Personal Blog - API

This project is a backend API developed with Express for a personal blog. It allows users to register, log in, manage their posts, and view posts from other users.

## Getting started

These instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.

### Prerequisites
  - Node.js
  - MySQL

### Enviroment Variables
```
PORT=
CLIENT_URL=
JWT_SECRET=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_HOST=
MYSQL_SSL_CA=
```

### Installation
  - **Clone the repository**
  - **Install the dependency**: npm install or yarn install
  - **Run migrations**: npx sequelize-cli db:migrate
  - **Run the development server**: npm run dev or yarn dev

## Use

### User Endpoints

- **Login**: `POST /users/login` - Allows a user to log in to the blog.
  
- **Register**: `POST /users/register` - Allows a new user to register for the blog.
  
- **getUserData**: `GET /users/getUserData/:id` - Gets the user's data based on their ID.

### Post Endpoints

- **getAllPostByUsers**: `GET /posts/:userid` - Gets all posts by a user.
  
- **create**: `POST /posts` - Creates a new post.
  
- **update**: `PUT /posts/update/:id` - Updates an existing post based on its ID.
  
- **delete**: `DELETE /posts/delete/:id` - Deletes a post based on its ID.
  
- **getAllPostsByUserFiltered**: `GET /posts/getAllPostsByUserFiltered/:userId` - Gets all posts by a specific user, with optional filters.
  
- **getPostsByUserFilteredPaginated**: `GET /posts/getPostsByUserFilteredPaginated/:userId` - Gets posts by a specific user with filters and pagination.

## Built with

* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/)
* [Sequelize](https://sequelize.org/)

## Author

* **Luciano Palacio** - *Software Development*

## License

This project is licensed under the MIT License

