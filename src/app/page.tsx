"use client";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "./utils/api-client";
// import { Task } from "@/backend/task-service";
import type { Task } from "@/backend/task-service";
import { Plus } from "lucide-react";
import { Button } from "./components/button";
import { TaskList } from "./components/TaskList";
import { createTask } from "./utils/api-calls";
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const { state, data, error } = useLoadingHandler({
    fetcher: fetchTasks,
    depsArray: [],
  });

  const reloadTask = useCallback(() => {
    fetchTasks().then((res) => {
      console.debug("set task to", res);
      setTasks(res);
    });
  }, []);

  useEffect(() => {
    reloadTask();
  }, [reloadTask]);

  return (
    <div className="p-2">
      <h1>Tasks</h1>

      <TaskForm reloadTask={reloadTask} />

      <TaskList tasks={tasks} reloadTask={reloadTask} />
    </div>
  );
}

export function TaskForm({ reloadTask }: { reloadTask: () => void }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <div className="border border-gray-800 rounded-md my-2 p-2 flex items-center gap-x-2">
      <input
        className="bg-gray-700 rounded-md p-2  w-full"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="New task title"
      />
      <Button
        variant="primary"
        onClick={async () => {
          await createTask(newTaskTitle);
          reloadTask();
        }}
        icon={<Plus />}
      >
        <div>Create</div>
      </Button>
    </div>
  );
}
