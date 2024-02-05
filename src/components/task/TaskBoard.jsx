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


  const handleSetTask = (addtask) => {
  
    console.log(addtask);
    
  };

  return (
    <section className="mb-20" id="tasks">
      {showModal && <AddTaskModal onSave={handleSetTask} />}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction activeModal={() => SetShowModal(true)} />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  );
}
