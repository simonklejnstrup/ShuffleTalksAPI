# Shuffle Talks API

> RESTful API meant to provide the ShuffleTalk Android app with data.

## Features

- Create, get, update or delete user
- Login/logout
- Create, get, update or delete user
- Give a post a like or remove a like already given.

## Technologies Used

- Node.js
- Express
- Mongo DB
- Mongoose

## Authors

- **Simon Klejnstrup** - [simonklejnstrup](https://github.com/simonklejnstrup)

## License

This project is licensed under the [MIT] License - see the [LICENSE.md](LICENSE.md) file for details.

# Getting Started

This guide provides instructions on how to run the server defined in the `server.js` file located in the root of the project.

## Prerequisites

Before running the server, ensure you have the following installed:

1. **Node.js**: Download and install Node.js from [Node.js official website](https://nodejs.org/). This will also install npm (Node Package Manager) which is required to manage project dependencies.
2. **MongoDB**: Ensure you have MongoDB installed and running. You can download it from [MongoDB official website](https://www.mongodb.com/try/download/community).

## Steps to Run the Server

1. **Clone the repository**:
   
   Open your terminal or command prompt and run the following command to clone the repository:
   ```
   git clone https://github.com/simonklejnstrup/ShuffleTalksAPI
   ```

2. **Navigate to the project directory**:

   Change your working directory to the project's root directory where **'server.js'** is located:

   ```
   cd <project_directory>
   ```

   Replace ***<project_directory>'** with the actual path to your project directory.

3. **Create a .env file**:

   In the root of your project directory, create a file named **'.env'** and add your environment variables. At a
   minimum, you need to define the **'MONGODB_URI'** and optionally the **'PORT'**:

   ```
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   PORT=3000
   ```

4. **Install dependencies:**

   Before running the server, install all the required dependencies. In the terminal, run:

   ```
   npm install
   ```

   This command will read the **'package.json'** file and install the necessary packages.

5. **Run the server:**

   Once the dependencies are installed and your **'.env'** file is configured, you can start the server using the
   following command:

   ```
   node server.js
   ```

   This will execute the **'server.js'** file and start the server.

7. **Access the server:**

   After running the server, it should be accessible at **'http://localhost:<port>'**. By default, the port is set
   to
   **'8080'** unless specified otherwise in the ***.env'** file.

# Additional Notes

   - **Nodemon:** For development purposes, you might want to use **'nodemon'** which automatically restarts the server
     when file changes in the directory are detected.

   ```
   npm install -g nodemon
   nodemon server.js
   ```

   **MongoDB Connection:** Ensure that the MongoDB instance specified in **'MONGODB_URI'** is running and accessible. If
   you are using a cloud-based MongoDB service, make sure your connection string is correctly formatted and
   contains the correct credentials.

By following these steps, you should be able to successfully run the server defined in **'server.js'**.
