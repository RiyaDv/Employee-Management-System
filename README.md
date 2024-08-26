# Employee Management System (MERN Stack)

This is a web application that allows administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records, with proper validation and authentication mechanisms to protect sensitive employee data.

## ✨ Features

- **CRUD Operations**: Manage employee records with Create, Read, Update, and Delete functionalities.
- **Authentication**: Secure login system for administrators.
- **Validation**: Ensures that all required fields are correctly filled before processing.
- **Responsive Design**: User-friendly and responsive across devices.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

**Clone the repository:**
```bash
git clone https://github.com/RiyaDV/Employee-Management-System
.git
cd Employee-Management-System

```

**Install backend dependencies:**
```bash
cd Backend
npm install
```

**Install frontend dependencies:**
```bash
cd ../Frontend
npm install
```

**Create a `.env` file in the backend directory and add the following:**
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

**Run the backend server:**
```bash
cd backend
npm start
```

**Run the frontend development server:**
```bash
cd ../Frontend
npm start
```

**Open your browser and navigate to `http://localhost:3000` to use the application.**

## 🛠️ Usage

### Admin Features:
- **Add Employee**: Fill in the employee details and click "Add Employee" to create a new employee record.
- **View Employees**: Navigate to the employee list to view all employees.
- **Update Employee**: Select an employee to update their details.
- **Delete Employee**: Remove an employee from the system.

### Authentication:
- **Login**: Only authenticated administrators can access the system. Ensure you log in using the provided credentials.

## 📁 Project Structure

```plaintext
employee-management-system/
│
├── backend/              # Backend Node.js/Express files
│   ├── Models/           # Mongoose schemas
|   ├── Middleware/       # Middleware functions
│   ├── routes/           # API routes
│   ├── Controllers/      # Request handlers
│   └── server.js         # Entry point for the backend server
│
├── frontend/             # Frontend React files
│   ├── src/
│   │   ├── Components/   # React components
|   |   ├── redux
|   |   |    ├── Slices   # Slice logic
|   |   |    ├── Store    # Local Storage
│   │   ├── services/     # API service functions
│   │   └── App.js        # Main React component
│   └── public/
│
└── README.md             # This README file
```

## 🔧 Technologies Used

**Frontend**:
- React
- Formik & Yup for form handling and validation
- Axios for HTTP requests
- React Query for data-fetching

**Backend**:
- Node.js & Express
- MongoDB & Mongoose for database management
- bcrypt for password hashing
- JWT for authentication

## 👥 Contributing

Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request.
