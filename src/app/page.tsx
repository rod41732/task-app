"use client";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "./utils/api-client";
// import { Task } from "@/backend/task-service";
import type { Task } from "@/backend/task-service";

async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await apiClient("/tasks", {
    method: "GET",
  });
  if (error) {
    throw new Error(`Request failed with status: ${error.status}`);
  }
  return data;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const reloadTask = useCallback(() => {
    fetchTasks().then((res) => {
      console.debug("set task to", res);
      setTasks(res);
    });
  }, []);
  useEffect(() => {
    reloadTask();
  }, [reloadTask]);

  const updateTaskCompletion = useCallback(
    async (id: string, completed: boolean) => {
      await apiClient("/tasks/:id", {
        method: "PUT",
        params: { id },
        body: { completed },
      });
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    await apiClient("/tasks/:id", {
      method: "DELETE",
      params: { id },
    });
  }, []);

  const updateTaskTitle = useCallback(async (id: string, title: string) => {
    await apiClient("/tasks/:id", {
      method: "PUT",
      params: { id },
      body: { title },
    });
  }, []);

  const createTask = useCallback(async (title: string) => {
    await apiClient("/tasks", {
      method: "POST",
      body: {
        title,
        completed: false,
      },
    });
  }, []);

  return (
    <div className="p-2">
      <h1>Tasks</h1>
      <div className="border border-gray-800 rounded-md my-2 p-2 flex items-center gap-x-2">
        <input
          className="bg-gray-700 rounded-md p-2  w-full"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={async () => {
            await createTask(newTaskTitle);
            reloadTask();
          }}
        >
          Create
        </button>
      </div>
      {tasks.map((it) => (
        <div key={it.id}>
          <span
            onClick={async () => {
              await updateTaskCompletion(it.id, !it.completed);
              await reloadTask();
            }}
          >
            {it.completed ? "[x]" : "[ ]"}
          </span>
          {it.title}

          <span
            className="text-red-500"
            onClick={async () => {
              if (window.confirm(`Delete task: '${it.title}'?`)) {
                await deleteTask(it.id);
                await reloadTask();
              }
            }}
          >
            del
          </span>
        </div>
      ))}
    </div>
  );
}
