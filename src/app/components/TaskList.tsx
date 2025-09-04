"use  client";
import type { Task } from "@/backend/task-service";
import React from "react";
import { TaskItem } from "./TaskItem";

export function TaskList({
  tasks,
  reloadTask,
}: {
  reloadTask: () => void;
  tasks: Task[];
}) {
  return (
    <div className="px-4 py-2  rounded-md bg-gray-900">
      {tasks.map((it, idx) => {
        return (
          <React.Fragment key={it.id}>
            <TaskItem key={it.id} task={it} reloadTask={reloadTask} />
            {idx != tasks.length - 1 && (
              <div className="w-full h-px bg-gray-800"></div>
            )}
          </React.Fragment>
        );
      })}
      {tasks.length == 0 && (
        <div className="text-center text-gray-600">No tasks</div>
      )}
    </div>
  );
}
