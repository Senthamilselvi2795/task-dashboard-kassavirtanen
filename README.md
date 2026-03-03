# Task Management Dashboard

A task management dashboard built using React, Redux Toolkit, Redux Saga, and React Hook Form.

This project implements a task creation feature similar to the provided demo environment. Tasks can be created, updated, deleted, filtered, and retrieved from an API.

---

## 🚀 Features

- Create Task
- Update Task
- Delete Task
- Finland Date Format (fi-FI)
- Search Tasks
- Filter by:
  - Status
  - Project
  - Assignee
  - Priority
- Clear Filters
- Dynamic Task Count
- Toast Notifications
- Skeleton Loading
- Dashboard Grid Layout

---

## 🛠 Tech Stack

- React
- Redux Toolkit
- Redux Saga
- React Hook Form
- Axios
- JSON Server (Mock REST API)

---

## 🏗 Architecture

- Feature-based folder structure
- Centralized state management with Redux Toolkit
- Async side effects handled using Redux Saga
- Refetch after mutation to keep UI consistent with API
- Region-specific date formatting using `toLocaleDateString("fi-FI")`

---

## ▶️ How to Run Locally

1. Install dependencies
npm install


2. Start mock API


npx json-server db.json --port 5000


3. Start frontend


npm start


Application runs at:

http://localhost:3000