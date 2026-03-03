import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest } from "./features/tasks/tasksSlice";
import TaskForm from "./components/TaskForm";

function App() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  return (
    <div>
      <h2>Tasks</h2>

      <TaskForm />

      {loading && <p>Loading...</p>}

      {tasks.map((task) => (
        <div key={task.id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;