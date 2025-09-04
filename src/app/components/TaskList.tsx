"use  client";
import type { Task } from "@/backend/task-service";
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
      {tasks.map((it) => {
        return <TaskItem key={it.id} task={it} reloadTask={reloadTask} />;
      })}
      {tasks.length == 0 && (
        <div className="text-center text-gray-600">No tasks</div>
      )}
    </div>
  );
}
