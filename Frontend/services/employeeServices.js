import axios from "axios";

export const getEmployeesAPI = async (token) => {
  const response = await axios.get(
    "http://localhost:3500/api/users/admin/employees",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Employee API Response:", response.data);
  return response.data;
};

export const addEmployeeAPI = async ({ token, values }) => {
  const response = await axios.post(
    "http://localhost:3500/api/users/admin/createemployee",
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response.data);

  return response.data;
};

export const deleteEmployeeAPI = async (id, token) => {
  const response = await axios.delete(
    `http://localhost:3500/api/users/admin/deleteemployee/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateEmployeeAPI = async ({ id, token, userData }) => {
  const response = await axios.put(
    `http://localhost:3500/api/users/admin/updateemployee/${id}`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response.data);

  return response.data;
};

export const findEmployeeAPI = async (id, token) => {
  const response = await axios.get(
    `http://localhost:3500/api/users/admin/findemployee/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
