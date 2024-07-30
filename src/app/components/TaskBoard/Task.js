import React, { useState } from 'react';
import api from '../../services/api';

const Task = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [deadline, setDeadline] = useState(task.deadline);

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                title,
                description,
                priority,
                deadline,
                status: task.status // ensure status is included if it's part of the task schema
            };
            const res = await api.put(`/tasks/${task._id}`, updatedTask);
            onUpdate(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const handleDelete = async () => {
        console.log("entered delete with id:",task._id)
        try {
            await api.delete(`/tasks/${task._id}`);
            onDelete(task._id);
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    return (
        <div className="p-4 mb-4 bg-white rounded shadow">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <button onClick={handleUpdate} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">
                        Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                    <p className="mt-2">Priority: <span className={`font-bold ${task.priority === 'Urgent' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span></p>
                    <p>Deadline: {task.deadline}</p>
                    <button onClick={() => setIsEditing(true)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Edit
                    </button>
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Task;
