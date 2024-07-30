import React, { useState, useEffect } from 'react';
import { FaTimes, FaShareAlt, FaStar, FaPencilAlt } from "react-icons/fa";
import { LuAlertTriangle } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { PiSpinnerBold } from "react-icons/pi";

const AddTaskModal = ({ showModal, setShowModal, addTask, columnId, task, updateTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Not selected');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState(columnId ? getStatusName(columnId) : 'Not selected');
    const [creationTime, setCreationTime] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority || 'Not selected');
            setDeadline(task.deadline || '');
            setStatus(task.status || 'Not selected');
            setCreationTime(task.creationTime || new Date().toISOString());
        } else {
            resetForm();
        }
    }, [showModal, task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task) {
            await updateTask({ ...task, title, description, priority, deadline, status, creationTime });
        } else {
            await addTask(columnId, title, description, priority, deadline, status, creationTime);
        }
        resetForm();
        setShowModal(false);
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('Not selected');
        setDeadline('');
        setStatus(columnId ? getStatusName(columnId) : 'Not selected');
        setCreationTime('');
    };

    function getStatusName(columnId) {
        switch (columnId) {
            case '1':
                return 'To Do';
            case '2':
                return 'In Progress';
            case '3':
                return 'Under Review';
            case '4':
                return 'Finished';
            default:
                return 'Not selected';
        }
    }

    return (
        <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${showModal ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowModal(false)}></div>
            <div className="absolute right-0 w-full max-w-md h-full bg-white p-6 overflow-auto shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                        <FaTimes className="h-6 w-6" />
                    </button>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <FaShareAlt />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <FaStar />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            placeholder='Title'
                            type="text"
                            className="w-full p-2 border-b border-gray-300 text-4xl"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <span className="w-1/4 text-gray-700 flex items-center"><PiSpinnerBold className="mr-2" />Status</span>
                        <span className="w-3/4">{status}</span>
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <span className="w-1/4 text-gray-700 flex items-center"><LuAlertTriangle className="mr-2" />Priority</span>
                        <select
                            className="w-3/4 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-600"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Not selected">Not selected</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <span className="w-1/4 text-gray-700 flex items-center"><SlCalender className="mr-2" />Deadline</span>
                        <input
                            type="date"
                            className="w-3/4 p-2 border-b border-gray-300 "
                            value={deadline === 'Not selected' ? '' : deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <span className="w-1/4 text-gray-700 flex items-center"><FaPencilAlt className="mr-2" />Description</span>
                        <textarea
                            className="w-3/4 p-2 border-b border-gray-300 "
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <button type="button" className="text-black">+ Add custom property</button>
                    </div>
                    <h1 className='text-gray-600 pl-4 text-xs'>Start writing, or add new file</h1>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="py-2 px-4 text-white bg-black rounded">
                            {task ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
