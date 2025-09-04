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
    () => {
      return taskService.listAllTasks();
    },
    {
      response: t.Array(TaskSchema),
    }
  )
  .post(
    "/tasks",
    ({ body }) => {
      return taskService.createTask(body);
    },
    {
      body: CreateTaskSchema,
      response: TaskSchema,
    }
  )
  .put(
    "/tasks/:id",
    ({ body, params: { id } }) => {
      taskService.updateTask(id, body);
      return SUCCESS;
    },
    {
      body: UpdateTaskSchema,
      params: t.Object({ id: t.String() }),
    }
  )
  .delete(
    "/tasks/:id",
    ({ params: { id } }) => {
      taskService.deleteTask(id);
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
