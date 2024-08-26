const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const Employee = require("../Models/Employee");
const User = require("../Models/User");

const employeeAction = {
  // Add Employee
  addEmployee: asyncHandler(async (req, res) => {
    const { username, email, position, salary, department, password } =
      req.body;

    // Validation
    if (
      !username ||
      !email ||
      !position ||
      !salary ||
      !department ||
      !password
    ) {
      throw new Error("Please add all fields");
    }

    // Check if employee exists
    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      throw new Error("Employee already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const employee = await Employee.create({
      username,
      email,
      position,
      salary,
      department,
      password: hashedPassword,
    });

    // Send response
    res.json({
      message: "Employee added successfully",
      username,
      email,
      position,
      department,
      id: employee.id,
    });
  }),

  // Get Employee
  getEmployee: asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Check if employee exists
    let employee = await Employee.findById(id).select("-password");

    if (!employee) {
      employee = await User.findById(id).select("-password");
    }

    if (employee.length === 0) {
      throw new Error("Employee not found");
    }

    // Send response
    res.json({ employee });
  }),

  // Update Employee
  updateEmployee: asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    console.log(employee);

    if (employee.length === 0) {
      throw new Error("Employee not found");
    }

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    // Send response
    res.json({ message: "Employee updated successfully", updatedEmployee });
  }),

  // Delete Employee
  deleteEmployee: asyncHandler(async (req, res) => {
    // Check if employee exists
    const employee = await Employee.findById(req.params.id);

    if (employee.length === 0) {
      throw new Error("Employee not found");
    }

    // Delete employee
    await Employee.findByIdAndDelete(req.params.id);

    // Send response
    res.json({ message: "Employee deleted successfully", employee });
  }),

  // Get All Employee
  getAllEmployee: asyncHandler(async (req, res) => {
    const employee = await Employee.find({});
    const user = await User.find({});

    const allEmployees = [...user, ...employee];

    const employees = allEmployees.filter((emp) => emp.role != "admin");

    if (employees.length === 0) {
      throw new Error("No Users or Employees found");
    }

    res.json(employees);
  }),
};

module.exports = employeeAction;
