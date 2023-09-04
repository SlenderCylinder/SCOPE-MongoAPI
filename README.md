
# SCOPE-MongoAPI



## Node server defining MongoDB API endpoints for SCOPE app

This will will create a basic server accepting API calls at http://localhost:3000/beneficiaries. Port can be changed.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB Atlas account (or a local MongoDB instance)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git

    Navigate to the project directory:

    bash

cd your-project

Install the project dependencies:

bash

    npm install

Usage

    Create an .env file in the project root directory and add your MongoDB connection URI. For example:

    bash

MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-database?retryWrites=true&w=majority

Replace your-username, your-password, and your-database with your MongoDB credentials and database name.

Start the server:

bash

    node app.js

    The server will run on port 3000 by default. You can access it at http://localhost:3000.

Packages Used

    Express.js: https://expressjs.com/
    Mongoose: https://mongoosejs.com/
