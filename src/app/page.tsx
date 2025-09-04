"use client";
import { apiClient } from "./utils/api-client";
// import { Task } from "@/backend/task-service";
import type { Task } from "@/backend/task-service";
import { Loader2 } from "lucide-react";

import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useLoadingHandler } from "./utils/useLoadingHandler";

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
  const { state, data, error, invalidate } = useLoadingHandler({
    fetcher: fetchTasks,
    depsArray: [],
  });

  return (
    <div className="p-4 w-full  h-screen flex flex-col">
      <h1 className="text-xl font-bold">Tasks</h1>

      <TaskForm reloadTask={invalidate} />

      {/* note that it's possible to have loading state, but data present */}
      {data != null && <TaskList tasks={data} reloadTask={invalidate} />}

      {data == null && (
        <div className="flex flex-col flex-1 items-center justify-center w-full ">
          {state == "loading" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <p className="text-red-500"> Error: {error?.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
