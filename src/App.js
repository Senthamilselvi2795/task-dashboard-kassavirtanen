import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest } from "./features/tasks/tasksSlice";
import TaskForm from "./components/TaskForm";

function App() {
  const dispatch = useDispatch();
const { tasks, loading, error } = useSelector(
  (state) => state.tasks
);
  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  return (
  <div className="container">
    <h2>Tasks</h2>

    <TaskForm />

    {loading && <div className="spinner"></div>}

    {error && <p className="error">{error}</p>}

    {tasks.map((task) => (
      <div key={task.id} className="task-card">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
    ))}
  </div>
);
}

export default App;