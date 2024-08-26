const express = require("express");
const userAction = require("../Controllers/UserControl");
const { isAuth, isAdmin } = require("../Middlewares/isAuth");
const employeeAction = require("../Controllers/EmployeeControl");
const router = express.Router();

// Register Page
router.post("/api/users/register", userAction.register);

// Login Page
router.post("/api/users/login", userAction.login);

// Profile Page
router.get("/api/users/profile", isAuth, userAction.profile);

// Admin Page
router.get("/api/users/admin", isAdmin, userAction.admin);

// Admin Controller

// All Employees
router.get(
  "/api/users/admin/employees",
  isAdmin,
  employeeAction.getAllEmployee
);

// Add Employee
router.post(
  "/api/users/admin/createemployee",
  isAdmin,
  employeeAction.addEmployee
);

// Find Employee
router.get(
  "/api/users/admin/findemployee/:id",
  isAdmin,
  employeeAction.getEmployee
);

// Update Employee
router.put(
  "/api/users/admin/updateemployee/:id",
  isAdmin,
  employeeAction.updateEmployee
);

// Delete Employee
router.delete(
  "/api/users/admin/deleteemployee/:id",
  isAdmin,
  employeeAction.deleteEmployee
);

module.exports = router;
