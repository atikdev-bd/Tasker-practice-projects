/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AddTaskModal({ onSave, onUpdate, handleClose }) {
  const [addTask, setAddTask] = useState(
    onUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      IsFavorite: false,
    }
  );

  const [isAdd, setIsAdd] = useState(Object.is(onUpdate, null));


  // handle text input here to add task
  const handleSetTaskInput = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    let value = evt.target.value;

    if (name === "tags") {
      value = value.split(",");
    }

    setAddTask({
      ...addTask,
      [name]: value,
    });
  };

  return (
    <>
      <div className="bg-black bg-opacity-70 h-full z-10 absolute top-0 left-0"></div>
      <form
        onSubmit={handleSetTaskInput}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={addTask.title}
              onChange={handleSetTaskInput}
              id="title"
              required
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={addTask.description}
              onChange={handleSetTaskInput}
              id="description"
              required
            ></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={addTask.tags}
                onChange={handleSetTaskInput}
                id="tags"
                required
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={addTask.priority}
                onChange={handleSetTaskInput}
                id="priority"
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-10 lg:mt-20">
          <button
            disabled={
              !addTask.title || !addTask.description || !addTask.priority
            }
            type="submit"
            onClick={() => onSave(addTask, isAdd)}
            className="rounded bg-blue-600 px-4 py-2 w-28 text-white transition-all hover:opacity-80"
          >
            Save
          </button>
        </div>
        <div className="flex   justify-end mr-2">
          {" "}
          <AiOutlineClose
            className="border rounded-full bg-red-400 h-8 w-8 hover:bg-red-500 "
            onClick={handleClose}
          />
        </div>
      </form>
    </>
  );
}
