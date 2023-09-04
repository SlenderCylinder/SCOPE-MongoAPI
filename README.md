
# SCOPE-MongoAPI



## Node server defining MongoDB API endpoints for SCOPE app

This will will create a basic node server accepting API calls at http://localhost:3000/beneficiaries. 

> Port can be changed in app.js file

> Fileds can be changed in beneficiary.js inside the models folder

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB Atlas account (or a local MongoDB instance)

## Installation

1. Clone the repository:

   
         git clone https://github.com/your-username/your-project.git

2. Navigate to the project directory:

         cd <path-to-your-project>

3. Install the project dependencies:

          npm install

## Usage

    Create an .env file in the project root directory and add your MongoDB connection URI. For example:
    
    MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-database?retryWrites=true&w=majority


Replace your-username, your-password, and your-database with your MongoDB credentials and database name.

## Start the server:

    node app.js

    The server will run on port 3000 by default. You can access it at http://localhost:3000.

Packages Used

    Express.js: https://expressjs.com/
    Mongoose: https://mongoosejs.com/
