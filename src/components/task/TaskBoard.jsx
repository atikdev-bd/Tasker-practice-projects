import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such than I can treat it like my soave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    IsFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, SetShowModal] = useState(false);
  const [TaskUpdate, setTaskUpdate] = useState(null);

  const handleSetTask = (addtask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, addtask]);
    } else {
      setTasks(
        tasks.map((t) => {
          if (t.id === addtask.id) {
            return addtask;
          } else {
            return t;
          }
        })
      );
    }

    SetShowModal(false);
  };

  const handleEditTask = (task) => {
    setTaskUpdate(task);
    SetShowModal(true);
  };

  const handleDelete = (task) => {
    console.log(task);

    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleAllDeleteTasks = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleClose = () => {
    SetShowModal(false);
    setTaskUpdate(null);
  };

  const handleOnFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTasks = [...tasks];

    newTasks[taskIndex].IsFavorite = !newTasks[taskIndex].IsFavorite;

    setTasks(newTasks);
  };

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal
          onSave={handleSetTask}
          onUpdate={TaskUpdate}
          handleClose={handleClose}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            activeModal={() => SetShowModal(true)}
            deleteTasks={handleAllDeleteTasks}
          />
          <TaskList
            onFav={handleOnFavorite}
            tasks={tasks}
            onEdit={handleEditTask}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}
