import { Task } from "@/backend/task-service";
import { Save, Trash, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteTask,
  updateTaskCompletion,
  updateTaskTitle,
} from "../utils/api-calls";
import { handleError } from "../utils/handle-error";
import { Button } from "./button";

export function TaskItem({
  task,
  reloadTask,
}: {
  task: Task;
  reloadTask: () => void;
}) {
  const [isEditing, setEditing] = useState(false);
  const [localText, setLocalText] = useState("");
  const [isToggling, setToggling] = useState(false);

  // initialize input to task's title
  useEffect(() => {
    if (isEditing) {
      setLocalText(task.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  return (
    <div key={task.id} className="flex items-center gap-x-2 my-2">
      <input
        type="checkbox"
        checked={task.completed}
        disabled={isToggling}
        onChange={async () => {
          setToggling(true);
          try {
            await updateTaskCompletion(task.id, !task.completed);
            reloadTask();
          } catch (err) {
            handleError(
              err,
              (msg) => `Failed to update task completion: ${msg}`
            );
          } finally {
            setToggling(false);
          }
        }}
      />

      {isEditing ? (
        <>
          <input
            className="p-2 flex-1 rounded-md bg-gray-800"
            value={localText}
            autoFocus
            onChange={(e) => {
              setLocalText(e.target.value);
            }}
          />
          <Button
            variant="secondary"
            onClick={async () => {
              setEditing(false);
            }}
            className="text-gray-500"
            icon={<Undo2 />}
          ></Button>
          <Button
            variant="primary"
            onClick={async () => {
              try {
                await updateTaskTitle(task.id, localText);
                // intentionally not await this to prevent reload error being misleadingly treated as update error
                reloadTask();
              } catch (err) {
                handleError(err, (msg) => `Failed to update title: ${msg}`);
              } finally {
                setEditing(false);
              }
            }}
            icon={<Save />}
          ></Button>
        </>
      ) : (
        <>
          <div className="flex-1 p-2" onClick={() => setEditing(true)}>
            {task.title}
          </div>
          {/* if editing, mean user most likely not intend to delete, 
          then we should also hide the delete button,
          to make save button more prominent */}
          <Button
            variant="destructive"
            disabled={isToggling}
            onClick={async () => {
              if (window.confirm(`Delete task: '${task.title}'?`)) {
                try {
                  await deleteTask(task.id);
                  reloadTask();
                } catch (err) {
                  handleError(err, (msg) => `Failed to update title: ${msg}`);
                } finally {
                }
              }
            }}
            icon={<Trash />}
          ></Button>
        </>
      )}
    </div>
  );
}
