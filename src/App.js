import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import {
  fetchTasksRequest,
  deleteTaskRequest,
  updateTaskRequest,
  clearMessage
} from "./features/tasks/tasksSlice";

function App() {
  const dispatch = useDispatch();

  const { tasks, loading, error, successMessage } =
    useSelector((state) => state.tasks);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch tasks on load
  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  // Auto clear toast
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  return (
    <div className="container">

      {/* Toast */}
      {successMessage && (
        <div className="toast">{successMessage}</div>
      )}

      <h2>Tasks</h2>

      <TaskForm />

      {error && <p className="error">{error}</p>}

      {/* Skeleton Loader */}
      {loading && (
        <>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
        </>
      )}

      {/* Task List */}
      {!loading &&
        [...tasks]
          .reverse() // newest on top
          .map((task) => (
            <div key={task.id} className="task-card">

             {editingId === task.id ? (
  <div className="edit-container">
    <input
      className="edit-input"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      placeholder="Edit title"
    />

    <textarea
      className="edit-input"
      value={editDescription}
      onChange={(e) => setEditDescription(e.target.value)}
      placeholder="Edit description"
    />

    <div className="edit-actions">
      <button
        disabled={loading}
        onClick={() => {
          dispatch(
            updateTaskRequest({
              id: task.id,
              data: {
                ...task,
                title: editTitle,
                description: editDescription
              }
            })
          );
          setEditingId(null);
        }}
        className="save-btn"
      >
        {loading ? "Saving..." : "Save"}
      </button>

      <button
        onClick={() => setEditingId(null)}
        className="cancel-btn"
      >
        Cancel
      </button>
    </div>
  </div>
)  : (
                <>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>

                  <small>
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleString()
                      : ""}
                  </small>

                  <div style={{ marginTop: "8px" }}>
                    <button
                      onClick={() => {
                        setEditingId(task.id);
                        setEditTitle(task.title);
                        setEditDescription(task.description);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      disabled={loading}
                      onClick={() =>
                        dispatch(deleteTaskRequest(task.id))
                      }
                      className="delete-btn"
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
    </div>
  );
}

export default App;