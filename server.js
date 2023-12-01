const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const db = new sqlite3.Database('./base/api01.db');

// Получение всех записей
app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.all(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Получение одной записи 
app.get('/employees/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM employees WHERE employee_id = ?';
  db.get(sql, [id], (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

// Добавление новой записи
app.post('/employees', (req, res) => {
  const employee = req.body;
  const sql = 'INSERT INTO employees(employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    employee.employee_id,
    employee.first_name,
    employee.last_name,
    employee.email,
    employee.phone_number,
    employee.hire_date,
    employee.job_id,
    employee.salary,
    employee.commission_pct,
    employee.manager_id,
    employee.department_id
  ];
  db.run(sql, values, (error) => {
    if (error) throw error;
    res.send('Employee added successfully');
  });
});

// Обновление записи 
app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const updatedEmployee = req.body;
  const sql = 'UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, job_id = ?, salary = ?, commission_pct = ?, manager_id = ?, department_id = ? WHERE employee_id = ?';
  const values = [
    updatedEmployee.first_name,
    updatedEmployee.last_name,
    updatedEmployee.email,
    updatedEmployee.phone_number,
    updatedEmployee.hire_date,
    updatedEmployee.job_id,
    updatedEmployee.salary,
    updatedEmployee.commission_pct,
    updatedEmployee.manager_id,
    updatedEmployee.department_id,
    id
  ];
  db.run(sql, values, (error) => {
    if (error) throw error;
    res.send('Employee updated successfully');
  });
});

// Удаление записи 
app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM employees WHERE employee_id = ?';
  db.run(sql, [id], (error) => {
    if (error) throw error;
    res.send('Employee deleted successfully');
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});