// src/components/Dashboard.js
import React from 'react';

const tasks = [
    { id: 1, title: 'Implement User Authentication', description: 'Develop and integrate user authentication using email and password.', status: 'To Do', priority: 'Urgent', deadline: '2024-08-15' },
    { id: 2, title: 'Design Home Page UI', description: 'Develop and integrate user authentication using email and password.', status: 'In Progress', priority: 'Medium', deadline: '2024-08-15' },
    { id: 3, title: 'Conduct User Feedback Survey', description: 'Collect and analyze user feedback to improve app features.', status: 'In Progress', priority: 'Low', deadline: '2024-08-05' },
    { id: 4, title: 'Integrate Cloud Storage', description: 'Enable cloud storage for note backup and synchronization.', status: 'Under Review', priority: 'Urgent', deadline: '2024-08-20' },
    { id: 5, title: 'Test Cross-browser Compatibility', description: 'Ensure the app works seamlessly across different web browsers.', status: 'Finished', priority: 'Medium', deadline: '2024-07-30' },
];

const Dashboard = () => {
    const renderTasks = (status) => {
        return tasks.filter(task => task.status === status).map(task => (
            <div key={task.id} className="p-4 mb-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="mt-2">Priority: <span className={`font-bold ${task.priority === 'Urgent' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span></p>
                <p>Deadline: {task.deadline}</p>
            </div>
        ));
    };

    return (
        <div className="flex flex-col flex-grow p-6 bg-gray-100">
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">To Do</h2>
                    {renderTasks('To Do')}
                    <button className="mt-4 py-2 px-4 bg-gray-300 rounded">Add new</button>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">In Progress</h2>
                    {renderTasks('In Progress')}
                    <button className="mt-4 py-2 px-4 bg-gray-300 rounded">Add new</button>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Under Review</h2>
                    {renderTasks('Under Review')}
                    <button className="mt-4 py-2 px-4 bg-gray-300 rounded">Add new</button>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Finished</h2>
                    {renderTasks('Finished')}
                    <button className="mt-4 py-2 px-4 bg-gray-300 rounded">Add new</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
