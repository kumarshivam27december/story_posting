Vlog Vault

This is a simple website where users can post stories after logging in. You can write stories, read other people's stories, and log out when you're done. The project uses Node.js, Express, MongoDB, and EJS (Embedded JavaScript) for templates.

   Features

-   User Registration & Login  : New users can register and existing users can log in. Passwords are securely stored using bcrypt.
-   Story Posting  : Logged-in users can write and post their stories.
-   Viewing Posts  : Everyone can view the list of stories and read each story individually.
-   Session Management  : After logging in, users stay logged in until they log out.

   How to Run This Project

    1. Install Node.js

First, you need to have Node.js installed on your machine. You can download it from (https://nodejs.org/).

    2. Clone This Repository

You need to copy the project to your computer. Open your terminal (or command prompt) and run:

   
git clone <repository_url>
Go to the project folder:
cd <repository_folder>
 3. Install Dependencies
 
In the project folder, run this command to install all the necessary packages:
npm install

4. Setup MongoDB

This project uses MongoDB to store user data and posts. You need to:

	1. Set up a MongoDB database. You can either:
   	        - Use MongoDB Atlas (cloud-based) or
  	       - Set up MongoDB locally on your machine.

	2. Update the MongoDB connection string in  server.js . Change the URL in the  mongoose.connect()  function with your MongoDB connection string.

  5. Run the Project

Once everything is set up, you can start the server by running:

   
node server.js
  
   

Now, open your browser and go to  http://localhost:3000 .

   File Structure

-   server.js  : The main file that handles routing, user authentication, and database interaction.
-   models/Post.js  : Defines how a story (post) is stored in the database.
-   models/User.js  : Defines how a user is stored in the database.
-   views/  : Contains all the EJS files (HTML templates) that render the pages like login, register, home, and post details.

   How It Works

-   Home Page  : Lists all the stories. Logged-in users can write new stories, and everyone can read existing stories.
-   Compose Page  : Logged-in users can create new stories here.
-   Register/Login  : New users can sign up, and existing users can log in. Passwords are encrypted before being saved.
-   Logout  : Logged-in users can log out of the session.

   Technologies Used

-   Node.js  : Server-side JavaScript runtime.
-   Express.js  : Web framework for Node.js.
-   MongoDB  : Database to store user and story data.
-   Mongoose  : ODM library to interact with MongoDB.
-   EJS  : Templating engine for rendering HTML pages dynamically.
-   bcrypt  : Library for hashing passwords securely.
-   express-session  : Used for session management and user authentication.

