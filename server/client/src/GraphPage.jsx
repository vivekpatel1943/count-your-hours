import React, { useState } from 'react';
import { BarChart, Bar, Legend, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useAuth } from './Root';
import { useNavigate } from 'react-router-dom';


function GraphPage({ filterDataFn, tasks, selectGraphTypeFn, filteredTasks, graphType, updateTaskFn, deleteTaskFn, handleNewTaskButtonClickFn }) {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    console.log(filteredTasks);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTaskText, setNewTaskText] = useState("");
    const [newAddTime, setNewAddTime] = useState(0);

    const openModal = (task) => {
        if (!task) return;
        setSelectedTask(task);
        setNewTaskText(task.task); // Prefill with current task
        setNewAddTime(0); // Prefill with 0
        setModalOpen(true);
    };

    const handleUpdate = () => {
        updateTaskFn(selectedTask.id, newTaskText, newAddTime);
        setModalOpen(false);
    };

    const handleDelete = () => {
        deleteTaskFn(selectedTask.id);
        setModalOpen(false);
    };


    const handleGraphClick = (e) => {
        if (!e || !e.activeLabel) return;
        const clickedTask = filteredTasks.find((task) => task.task === e.activeLabel);
        if (clickedTask) {
            openModal(clickedTask);
        }
    };

    const navigateToLandingPage = () => {
        logout();
        navigate('/page');
    }

    const navigateToProfilePage = () => {
        navigate('/profile');
    }


    return (
        <div className="h-screen  bg-gray-900  text-white p-6 flex flex-col items-center justify-center">
            <div className='fixed top-4 right-4 flex gap-2 flex-wrap'>
                <button onClick={navigateToLandingPage} className='border-2 border-white text-white rounded px-2 py-1 mr-2 bg-blue-500'>Logout</button>
                <button onClick={navigateToProfilePage} className='border-2 border-white text-white rounded bg-orange-400 px-2 py-1'><strong>{user.username}</strong></button>
            </div>

            {/* Filter and Graph Type Selection */}

            <div className="flex gap-4 mb-6">
                <button onClick={handleNewTaskButtonClickFn} className='px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md border border-gray-600 focus:ring-2 focus:ring-blue-500'>NewTask</button>
                <select
                    onChange={(e) => filterDataFn(tasks, e.target.value)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>

                <select
                    onChange={(event) => selectGraphTypeFn(event.target.value)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="line-chart">Line Chart</option>
                    <option value="bar-chart">Bar Chart</option>
                </select>
            </div>

            {/* Graph Container */}
            <div className="w-full max-w-4xl h-[400px] bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20">
                <ResponsiveContainer width="100%" height="100%">
                    {graphType === "line-chart" ? (
                        <LineChart data={filteredTasks} onClick={handleGraphClick}>
                            <XAxis dataKey="task" stroke="white" />
                            <YAxis stroke="white" />
                            <CartesianGrid stroke="gray" strokeDasharray="5 5" />
                            <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                            <Line type="monotone" dataKey="time" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    ) : (
                        <BarChart data={filteredTasks} onClick={handleGraphClick}>
                            <XAxis dataKey="task" stroke="white" />
                            <YAxis stroke="white" />
                            <CartesianGrid stroke="gray" strokeDasharray="5 5" />
                            <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
                            <Legend />
                            <Bar dataKey="time" fill="#8884d8" barSize={50} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Modal for Editing Task */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
                    <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-6 max-w-md w-full border border-white/50">
                        <h1 className="text-white text-xl font-bold mb-4 text-center">Edit Task</h1>

                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/40 backdrop-blur-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                            placeholder="Update task name..."
                        />

                        <input
                            type="text"
                            value={newAddTime}
                            onChange={(e) => setNewAddTime(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white/40 backdrop-blur-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
                            placeholder="Update time spent..."
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 border border-green-700"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 border border-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 border border-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GraphPage;
