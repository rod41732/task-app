import { t } from "elysia";

export const TaskSchema = t.Object({
  id: t.String(),
  title: t.String(),
  completed: t.Boolean(),
});

export const CreateTaskSchema = t.Omit(TaskSchema, ["id"]);
export const UpdateTaskSchema = t.Partial(CreateTaskSchema);

// TaskSchema.
// TaskSchema

export type Task = typeof TaskSchema.static;
export type CreateTask = typeof CreateTaskSchema.static;
export type UpdateTask = typeof UpdateTaskSchema.static;

export class TaskService {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  listAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTask: CreateTask): Task {
    const newTask = { ...createTask, id: crypto.randomUUID() };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updateTask: UpdateTask) {
    let updated = false;
    this.tasks.forEach((it) => {
      if (it.id == id) {
        Object.assign(it, updateTask);
        updated = true;
      }
    });
    if (!updated) {
      throw new Error("No task updated");
    }
  }

  deleteTask(id: string) {
    const idx = this.tasks.findIndex((it) => it.id == id);
    if (idx == -1) {
      throw new Error("Task not found");
    }
    this.tasks.splice(idx, 1);
  }
}

export const taskService = new TaskService();
