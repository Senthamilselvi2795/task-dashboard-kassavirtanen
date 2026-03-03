import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  clearMessage
} from "./features/tasks/tasksSlice";
import { useForm } from "react-hook-form";

function App() {
  const dispatch = useDispatch();
  const { tasks, loading, successMessage } =
    useSelector((state) => state.tasks);

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const { register, handleSubmit, reset, setValue } =
    useForm();

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const onSubmit = (data) => {
    if (editingId) {
      dispatch(
        updateTaskRequest({
          id: editingId,
          data
        })
      );
      setEditingId(null);
    } else {
      dispatch(createTaskRequest(data));
    }
    reset();
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    Object.keys(task).forEach((key) => {
      setValue(key, task[key]);
    });
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .filter((task) =>
        statusFilter === "All"
          ? true
          : task.status === statusFilter
      )
      .filter((task) =>
        projectFilter === "All"
          ? true
          : task.project === projectFilter
      )
      .filter((task) =>
        assigneeFilter === "All"
          ? true
          : task.assignee === assigneeFilter
      )
      .filter((task) =>
        priorityFilter === "All"
          ? true
          : task.priority === priorityFilter
      );
  }, [
    tasks,
    searchTerm,
    statusFilter,
    projectFilter,
    assigneeFilter,
    priorityFilter
  ]);

  return (
    <div className="container">

      {successMessage && (
        <div className="toast">{successMessage}</div>
      )}

      <h2>Task Management Dashboard</h2>

      {/* FILTER BAR */}
      <div className="filter-bar">

        <input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
        </select>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
        >
          <option value="All">All Projects</option>
          {[...new Set(tasks.map((t) => t.project))]
            .filter(Boolean)
            .map((project, i) => (
              <option key={i} value={project}>
                {project}
              </option>
            ))}
        </select>

        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
        >
          <option value="All">All Assignees</option>
          {[...new Set(tasks.map((t) => t.assignee))]
            .filter(Boolean)
            .map((assignee, i) => (
              <option key={i} value={assignee}>
                {assignee}
              </option>
            ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          className="clear-btn"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("All");
            setProjectFilter("All");
            setAssigneeFilter("All");
            setPriorityFilter("All");
          }}
        >
          Clear Filters
        </button>

      </div>

      <h3>Tasks ({filteredTasks.length})</h3>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
      >

        <input {...register("title")} placeholder="Task Title" />
        <textarea
          {...register("description")}
          placeholder="Task Description"
        />

        <input
          {...register("project")}
          placeholder="Project Name"
        />

        <div className="form-row">
          <select {...register("type")}>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
          </select>

          <select {...register("status")}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
          </select>

          <select {...register("priority")}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <input
          {...register("assignee")}
          placeholder="Assigned To"
        />

        <input
          type="date"
          className="date-input"
          {...register("dueDate")}
        />

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {editingId
              ? "Update Task"
              : "+ Create Task"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                reset();
              }}
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {/* TASK GRID */}
      <div className="task-grid">
        {[...filteredTasks]
          .reverse()
          .map((task) => (
            <div key={task.id} className="task-card">

              <div className="card-header">
                <span
                  className={`badge ${
                    task.type?.toLowerCase()
                  }`}
                >
                  {task.type}
                </span>

                <span>{task.status}</span>
              </div>

              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="card-meta">
                <span>Project: {task.project}</span>
                <span>Priority: {task.priority}</span>
              </div>

              <div className="card-meta">
                <span>Assignee: {task.assignee}</span>
                <span>
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("fi-FI")
                    : "-"}
                </span>
              </div>

              <div className="card-meta">
                <span>
                  Created:{" "}
                  {task.createdAt &&
                    new Date(task.createdAt).toLocaleDateString("fi-FI")}
                </span>
              </div>

              <div className="card-actions">
                <button onClick={() => handleEdit(task)}>
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(deleteTaskRequest(task.id))
                  }
                >
                  🗑 Delete
                </button>
              </div>

            </div>
          ))}
      </div>

    </div>
  );
}

export default App;