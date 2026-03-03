import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTaskRequest } from "../features/tasks/tasksSlice";

export default function TaskForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createTaskRequest(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">

      <input
        {...register("title", { required: "Title required" })}
        placeholder="Task Title"
      />
      {errors.title && <p className="error">{errors.title.message}</p>}

      <textarea
        {...register("description", { required: "Description required" })}
        placeholder="Task Description"
      />
      {errors.description && (
        <p className="error">{errors.description.message}</p>
      )}

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

      <input
        type="text"
        {...register("assignee")}
        placeholder="Assigned To"
      />

      <input
        type="date"
        {...register("dueDate")}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "+ Create Task"}
      </button>
    </form>
  );
}