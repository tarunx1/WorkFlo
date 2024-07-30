import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddTaskModal from "./AddTaskModal";
import api from "../../services/api";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { BsStars } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { HiOutlineShare } from "react-icons/hi2";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { BiMenuAltLeft } from "react-icons/bi";
import moment from "moment";

const TaskBoard = () => {
  const [columns, setColumns] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        const tasks = res.data;
        const columnsFromBackend = {
          1: {
            name: "To Do",
            items: tasks.filter((task) => task.status === "To Do"),
          },
          2: {
            name: "In Progress",
            items: tasks.filter((task) => task.status === "In Progress"),
          },
          3: {
            name: "Under Review",
            items: tasks.filter((task) => task.status === "Under Review"),
          },
          4: {
            name: "Finished",
            items: tasks.filter((task) => task.status === "Finished"),
          },
        };
        setColumns(columnsFromBackend);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    removed.status = destColumn.name;
    destItems.splice(destination.index, 0, removed);

    try {
      await api.put(`/tasks/${removed._id}`, removed);
    } catch (err) {
      console.error("Failed to update task", err);
      sourceItems.splice(source.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const newColumn = {
        ...sourceColumn,
        items: sourceItems,
      };
      setColumns({
        ...columns,
        [source.droppableId]: newColumn,
      });
    } else {
      const newSourceColumn = {
        ...sourceColumn,
        items: sourceItems,
      };
      const newDestColumn = {
        ...destColumn,
        items: destItems,
      };
      setColumns({
        ...columns,
        [source.droppableId]: newSourceColumn,
        [destination.droppableId]: newDestColumn,
      });
    }
  };

  const addTask = async (
    columnId,
    title,
    description,
    priority,
    deadline,
    status,
    creationTime
  ) => {
    try {
      const res = await api.post("/tasks", {
        title,
        description,
        priority,
        deadline,
        status,
        creationTime,
      });
      const newTask = res.data;

      const newColumn = {
        ...columns[columnId],
        items: [...columns[columnId].items, newTask],
      };

      setColumns({
        ...columns,
        [columnId]: newColumn,
      });
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      await api.put(`/tasks/${updatedTask._id}`, updatedTask);

      const newColumns = { ...columns };
      const sourceColumnId = Object.keys(newColumns).find(
        (key) =>
          newColumns[key].items.findIndex(
            (task) => task._id === updatedTask._id
          ) > -1
      );
      const sourceColumn = newColumns[sourceColumnId];

      const sourceItems = [...sourceColumn.items];
      const taskIndex = sourceItems.findIndex(
        (task) => task._id === updatedTask._id
      );
      const [removed] = sourceItems.splice(taskIndex, 1);

      if (sourceColumn.name === updatedTask.status) {
        sourceItems.splice(taskIndex, 0, updatedTask);
        setColumns({
          ...newColumns,
          [sourceColumnId]: {
            ...sourceColumn,
            items: sourceItems,
          },
        });
      } else {
        const destColumnId = Object.keys(newColumns).find(
          (key) => newColumns[key].name === updatedTask.status
        );
        const destColumn = newColumns[destColumnId];
        const destItems = [...destColumn.items, updatedTask];

        setColumns({
          ...newColumns,
          [sourceColumnId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destColumnId]: {
            ...destColumn,
            items: destItems,
          },
        });
      }
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      const newColumns = { ...columns };
      Object.keys(newColumns).forEach((key) => {
        newColumns[key].items = newColumns[key].items.filter(
          (task) => task._id !== taskId
        );
      });
      setColumns(newColumns);
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleAddNewTask = (columnId, columnStatus) => {
    setCurrentTask(null);
    setCurrentColumnId(columnId);
    setCurrentStatus(columnStatus);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col flex-grow p-4 sm:p-6 bg-gray-100 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row mb-6">
        <div className="flex-1 p-4 flex flex-col sm:flex-row bg-white rounded-md justify-center items-center mb-4 lg:mb-0">
          <Image
            src="/1p.jpg"
            alt="Introducing tags"
            width={70}
            height={70}
            className="mx-3"
          />
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-500">
              Introducing tags
            </h2>
            <p className="text-gray-700">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col sm:flex-row bg-white rounded-md mx-0 sm:mx-4 justify-center items-center mb-4 lg:mb-0">
          <Image
            src="/2p.jpg"
            alt="Share Notes"
            width={60}
            height={60}
            className="mx-3"
          />
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-500">
              Share Notes Instantly
            </h2>
            <p className="text-gray-700">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row p-4 bg-white rounded-md justify-center items-center">
          <Image
            src="/3p.jpg"
            alt="Access Anywhere"
            width={60}
            height={60}
            className="mx-3"
          />
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-500">
              Access Anywhere
            </h2>
            <p className="text-gray-700">
              Sync your notes across all devices. Stay productive whether you're
              on your phone, tablet, or computer.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-6 relative flex-wrap">
        <div className="flex items-center py-2 px-4 bg-white rounded-md mb-4 sm:mb-0 sm:mr-4">
          <input type="text" placeholder="Search" className="outline-none" />
          <button className="ml-2">
            <HiMiniMagnifyingGlass className="text-gray-700" />
          </button>
        </div>
        <div className="absolute right-0 flex flex-wrap justify-end w-full gap-4 sm:w-auto">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-6">
            <Link href="#" legacyBehavior>
              <a className="text-gray-700 flex flex-row justify-center items-center gap-2">
                Calendar <SlCalender />
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="text-gray-700 flex flex-row justify-center items-center gap-2">
                Automation <BsStars />
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="text-gray-700 flex flex-row justify-center items-center gap-2">
                Filter <CiFilter />
              </a>
            </Link>
            <Link href="#" legacyBehavior>
              <a className="text-gray-700 flex flex-row justify-center items-center gap-2">
                Share <HiOutlineShare />
              </a>
            </Link>
          </div>
          <button
            className="py-2.5 px-4 big-button text-white rounded transition duration-200 hover:bg-purple-700 flex items-center justify-center"
            onClick={() => handleAddNewTask(null, null)}
          >
            Create new task
            <FaPlus className="ml-2 bg-white text-purple-900 rounded-full" />
          </button>
        </div>
      </div>
      
      </div>
      <div className="bg-gray-50 rounded-md p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(columns).map(([id, column]) => (
              <div key={id} className="flex flex-col bg-gray-50">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-l mb-4 p-4 text-gray-700">
                    {column.name}
                  </h2>
                  <BiMenuAltLeft className="w-5 h-8 mb-4" />
                </div>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-4 bg-gray-50 flex-grow ${
                        snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-50"
                      }`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-4 bg-white border border-gray-150 rounded shadow ${
                                snapshot.isDragging ? "bg-blue-100" : "bg-white"
                              }`}
                            >
                              <div className="p-8 bg-gray-100">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-bold text-gray-800">
                                    {item.title}
                                  </h3>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEdit(item)}
                                      className="text-gray-700"
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      onClick={() => deleteTask(item._id)}
                                      className="text-gray-700"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </div>
                                <p className="text-gray-600">
                                  {item.description}
                                </p>
                                <div>
                                  <span
                                    className={`inline-block text-xs font-semibold py-1 px-2 rounded-md text-white ${
                                      item.priority === "Urgent"
                                        ? "bg-red-500"
                                        : item.priority === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`}
                                  >
                                    {item.priority}
                                  </span>
                                  <span className="text-sm text-gray-600 flex items-center">
                                    <CiClock2 className="mr-1" />{" "}
                                    {item.deadline.substring(0, 10)}
                                  </span>
                                </div>
                                <p className="text-gray-500 mt-2 ">
                                  {moment(item.updatedAt).fromNow()}{" "}
                                </p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button
                  className="mt-4 py-2 px-4 big-button-b text-white text-lg rounded flex flex-row items-center relative"
                  onClick={() => handleAddNewTask(id, column.name)}
                >
                  Add new
                  <FiPlus className="absolute right-8" />
                </button>
              </div>
            ))}
          </div>
        </DragDropContext>
        <AddTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
          columnId={currentColumnId}
          status={currentStatus}
          task={currentTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
};

export default TaskBoard;
