import { apiClient } from "./api-client";

export const updateTaskCompletion = async (id: string, completed: boolean) => {
  return await apiClient("/tasks/:id", {
    method: "PUT",
    params: { id },
    body: { completed },
  }).then((res) => {
    if (res.error) {
      // @ts-expect-error: Elysia seems to return error message in error.value.error, but the error.message is [object Object] for some reason
      throw new Error(res.error.value?.error ?? "Unknown error");
    }
  });
};

export const deleteTask = async (id: string) => {
  return await apiClient("/tasks/:id", {
    method: "DELETE",
    params: { id },
  }).then((res) => {
    if (res.error) {
      // @ts-expect-error: Elysia seems to return error message in error.value.error, but the error.message is [object Object] for some reason
      throw new Error(res.error.value?.error ?? "Unknown error");
    }
  });
};

export const updateTaskTitle = async (id: string, title: string) => {
  return await apiClient("/tasks/:id", {
    method: "PUT",
    params: { id },
    body: { title },
  }).then((res) => {
    if (res.error) {
      // @ts-expect-error: Elysia seems to return error message in error.value.error, but the error.message is [object Object] for some reason
      throw new Error(res.error.value?.error ?? "Unknown error");
    }
  });
};

export const createTask = async (title: string) => {
  await apiClient("/tasks", {
    method: "POST",
    body: {
      title,
      completed: false,
    },
  }).then((res) => {
    if (res.error) {
      // @ts-expect-error: Elysia seems to return error message in error.value.error, but the error.message is [object Object] for some reason
      throw new Error(res.error.value?.error ?? "Unknown error");
    }
  });
};
