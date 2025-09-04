import { expect, test } from "vitest";
import { Task, TaskService } from "./task-service";

test("Test task is initially empty", async () => {
  const taskService = new TaskService();
  await expect(taskService.listAllTasks()).resolves.toEqual([]);
});

test("Test add task", async () => {
  const taskService = new TaskService();

  await taskService.createTask({
    title: "First Task",
    completed: false,
  });
  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    {
      title: "First Task",
      completed: false,
    },
  ] satisfies DeepPartial<Task[]>);

  await taskService.createTask({
    title: "Second Task",
    completed: false,
  });
  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    {
      title: "First Task",
      completed: false,
    },
    {
      title: "Second Task",
      completed: false,
    },
  ] satisfies DeepPartial<Task[]>);
});

test("Update task title", async () => {
  const taskService = new TaskService();
  const task = await taskService.createTask({
    title: "First Task",
    completed: false,
  });

  await taskService.updateTask(task.id, { title: "Updated title" });
  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    {
      title: "Updated title",
      completed: false,
    },
  ] satisfies DeepPartial<Task[]>);
});

test("Update task completion", async () => {
  const taskService = new TaskService();
  const task = await taskService.createTask({
    title: "First Task",
    completed: false,
  });

  await taskService.updateTask(task.id, { completed: true });
  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    {
      title: "First Task",
      completed: true,
    },
  ] satisfies DeepPartial<Task[]>);
});

test("Cannot update non-existent task", async () => {
  const taskService = new TaskService();
  const task = await taskService.createTask({
    title: "First Task",
    completed: false,
  });
  const invalidId = task.id + "-invalid";

  await expect(
    taskService.updateTask(invalidId, { title: "Some update" })
  ).rejects.toThrow();
});

test("Delete task deletes correct task", async () => {
  const taskService = new TaskService();
  const task1 = await taskService.createTask({
    title: "First Task",
    completed: false,
  });
  const task2 = await taskService.createTask({
    title: "Second Task",
    completed: false,
  });
  const task3 = await taskService.createTask({
    title: "Third Task",
    completed: false,
  });

  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    { title: "First Task" },
    { title: "Second Task" },
    { title: "Third Task" },
  ] satisfies DeepPartial<Task[]>);

  await taskService.deleteTask(task2.id);

  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    { title: "First Task" },
    { title: "Third Task" },
  ] satisfies DeepPartial<Task[]>);

  await taskService.deleteTask(task3.id);
  await expect(taskService.listAllTasks()).resolves.toMatchObject([
    { title: "First Task" },
  ] satisfies DeepPartial<Task[]>);

  await taskService.deleteTask(task1.id);
  await expect(taskService.listAllTasks()).resolves.toMatchObject(
    [] satisfies DeepPartial<Task[]>
  );
});

test("Cannot delete non-existent task", async () => {
  const taskService = new TaskService();
  const task = await taskService.createTask({
    title: "First Task",
    completed: false,
  });

  const invalidId = task.id + "-invalid";

  await expect(taskService.deleteTask(invalidId)).rejects.toThrow();
});

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
