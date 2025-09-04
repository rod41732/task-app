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

/** sleep is used for simulating delay e.g. in DB access */
async function sleep(ms: number): Promise<void> {
  await new Promise((res) => {
    setTimeout(() => res(undefined), ms);
  });
}

export class TaskService {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  async listAllTasks(): Promise<Task[]> {
    await sleep(100);
    return this.tasks;
  }

  async createTask(createTask: CreateTask): Promise<Task> {
    await sleep(100);
    const newTask = { ...createTask, id: crypto.randomUUID() };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, updateTask: UpdateTask) {
    await sleep(100);
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

  async deleteTask(id: string) {
    await sleep(100);
    const idx = this.tasks.findIndex((it) => it.id == id);
    if (idx == -1) {
      throw new Error("Task not found");
    }
    this.tasks.splice(idx, 1);
  }
}

export const taskService = new TaskService();
