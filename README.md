# Blog APP

## Description (Features of the app)

- User should be able to register with display name, username and password
- User should be able to login
- User should be able to update his/her display name and password
- User can create a blog with title and body
- Listing down blog order by datetime
- Edit and deleting blog
- Searching blog content
- User should be able to see only his/her blogs
- Other user can’t see, edit or delete blogs
- Use Postgres as database
- Make blog public so that anyone can see the blog

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Git**: To clone the repository.
- **Node.js**: Ensure you have Node.js and npm installed. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

Follow these steps to set up the project on your local machine:

1. **Navigate to the Project Directory**

   Create an new empty directory and switch to make it your current working directory:

   ```bash
   mkdir blog_app_frontend
   cd blog_app_frontend
   ```

2. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/cshiva256/blog_app_frontend.git
   ```

3. **Install Dependencies**

   Use npm (Node Package Manager) to install the project's dependencies:

   ```bash
   npm install
   ```

   This command reads the `package.json` file and installs all the required packages.

## Running the Application

Once you have installed the dependencies, you can start the application:

1. **Start the Application**

   Run the following command to start the application:

   ```bash
   npm start
   ```

2. **Access the Application**

   After starting the application, open your web browser and go to:

   ```
   http://localhost:3001
   ```

## Testing the Application with jest

Once you have installed the dependencies, you can start testing the application:

1. **Begin the excution of test scripts**

   Run the following command to start testing the application:

   ```bash
   npm run test
   ```

2. **To get the Complete Coverage Report**

   Run the following command:

   ```
   npm run test -- --coverage .
   ```

## Contributing

If you would like to contribute to the project, please follow these guidelines:

- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Make your changes and commit them (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin feature-branch`).
- Create a new Pull Request.

Feel free to modify this template to better fit the specific needs and details of your project.
