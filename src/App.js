import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import {
  fetchTasksRequest,
  clearMessage
} from "./features/tasks/tasksSlice";

function App() {
  const dispatch = useDispatch();

  const { tasks, loading, error, successMessage } =
    useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  // Auto clear toast after 2 seconds
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
      {successMessage && (
        <div className="toast">{successMessage}</div>
      )}

      <h2>Tasks</h2>

      <TaskForm />

      {error && <p className="error">{error}</p>}

      {loading && (
        <>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
        </>
      )}

      {!loading &&
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
        ))}
    </div>
  );
}

export default App;