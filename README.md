# Web ER Application

## Overview

Web ER is a modern web application designed to streamline the patient management process in emergency rooms. It offers an efficient way to register patients, prioritize their treatment based on various criteria, and manage their information seamlessly. The application is tailored for use by healthcare professionals, providing a user-friendly interface for both patient registration and administrative tasks.

## Features

- **Patient Registration**: Allows for quick and efficient input of patient data including personal information, injury type, and pain scale.
- **Priority Scoring System**: Automatically calculates a priority score for each patient based on injury severity, pain scale, and waiting time.
- **Dynamic Patient Queue**: Displays patients in a priority-based order, ensuring critical cases are addressed promptly.
- **Patient Code Login**: Patients can check their status and estimated waiting time using a unique code.
- **Admin Dashboard**: Provides administrators with a comprehensive view of the patient queue and allows for easy management of patient records.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Styling**: CSS
- **Deployment**: (If applicable, mention the deployment platform like AWS, Heroku, etc.)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/aidan-elliot/emergency_waitlist.git
   ```
2. Install NPM packages:
   ```
npm install
npm install @fontsource/inter
npm install express
npm install concurrently --save-dev
npm install cors
npm install lodash
npm install react-router-dom
npm install react-draggable
npm install react-grid-layout
npm install react-scripts
npm install axios
npm install nodemon --save-dev
   ```
3. Set up the environment variables in a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_uri
   PORT=8000
   ```
4. Run the application:
   ```
   mongod
   node server
   npm start
   ```

## Usage

- **Admin Login**: Navigate to the Admin Login page, and user the following credentials
   ```
    user: admin
    pass: 123456
      ```
- **Patient Registration**: Navigate to the registration page and enter the patient's details.
- **Patient Queue**: View the prioritized list of patients on the admin dashboard.
- **Patient Code Login**: Patients can log in using their unique code to check their status.


For mongoDB, ensure this library exists. You can confirm it exists by running in your terminal:
   ```
mkdir C:\data\db\
      ```