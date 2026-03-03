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
      <div>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Task Title"
        />
        {errors.title && (
          <p className="error">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("description", {
            required: "Description is required"
          })}
          placeholder="Task Description"
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}