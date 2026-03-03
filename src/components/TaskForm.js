import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTaskRequest } from "../features/tasks/tasksSlice";

export default function TaskForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(createTaskRequest(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: true })}
        placeholder="Title"
      />

      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}