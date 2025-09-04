import node from "@elysiajs/node";
import { Elysia, t } from "elysia";
import {
  CreateTaskSchema,
  TaskSchema,
  taskService,
  UpdateTaskSchema,
} from "./task-service";

const SuccessSchema = t.Object({ success: t.Literal(true) });
const SUCCESS: typeof SuccessSchema.static = { success: true };

const app = new Elysia({ adapter: node() })
  .get("/", () => "Hello, world!")
  .get(
    "/tasks",
    async () => {
      return taskService.listAllTasks();
    },
    {
      response: t.Array(TaskSchema),
    }
  )
  .post(
    "/tasks",
    async ({ body }) => {
      return taskService.createTask(body);
    },
    {
      body: CreateTaskSchema,
      response: TaskSchema,
    }
  )
  .put(
    "/tasks/:id",
    async ({ body, params: { id } }) => {
      await taskService.updateTask(id, body);
      return SUCCESS;
    },
    {
      body: UpdateTaskSchema,
      params: t.Object({ id: t.String() }),
    }
  )
  .delete(
    "/tasks/:id",
    async ({ params: { id } }) => {
      await taskService.deleteTask(id);
      return SUCCESS;
    },
    {
      params: t.Object({ id: t.String() }),
      response: SuccessSchema,
    }
  )
  .listen(3001, ({ hostname, port }) => {
    console.log(`Backend is listending on ${hostname}:${port}`);
  });

export type BackendApp = typeof app;
