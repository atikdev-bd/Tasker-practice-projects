import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {

  // task default value
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such than I can treat it like my soave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    IsFavorite: false,
  };
//// state here
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, SetShowModal] = useState(false);
  const [TaskUpdate, setTaskUpdate] = useState(null);

  /// handle add task aciton here
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

  /// hadle edit task action here
  const handleEditTask = (task) => {
    setTaskUpdate(task);
    SetShowModal(true);
  };

  /// delete single tadk aciton here
  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  /// handle all delete action here
  const handleAllDeleteTasks = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  /// handle close modal action here
  const handleClose = () => {
    SetShowModal(false);
    setTaskUpdate(null);
  };

  /// handle favorite toggle here
  const handleOnFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].IsFavorite = !newTasks[taskIndex].IsFavorite;
    setTasks(newTasks);
  };

  /// handle Search action here
  const handleSearchInupt = (searchTram) => {
    const searchResult = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTram.toLowerCase())
    );
    setTasks([...searchResult]);
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
          <SearchTask onSearch={handleSearchInupt} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            activeModal={() => SetShowModal(true)}
            deleteTasks={handleAllDeleteTasks}
          />
          {tasks.length > 0 ? (
            <TaskList
              onFav={handleOnFavorite}
              tasks={tasks}
              onEdit={handleEditTask}
              handleDelete={handleDelete}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
