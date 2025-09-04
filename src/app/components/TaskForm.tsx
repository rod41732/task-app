import { Plus } from "lucide-react";
import { useState } from "react";
import { createTask } from "../utils/api-calls";
import { handleError } from "../utils/handle-error";
import { Button } from "./button";

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
          try {
            await createTask(newTaskTitle);
            reloadTask();
          } catch (err) {
            handleError(err);
          }
        }}
        icon={<Plus />}
      >
        <div>Create</div>
      </Button>
    </div>
  );
}
