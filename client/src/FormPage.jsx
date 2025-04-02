import React from 'react';


function FormPage({ AddJournalsFn, handleNewTaskButtonClickFn,formModalOpen }) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-900">
            
            <form
                onSubmit={AddJournalsFn}
                className="bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-6 max-w-md w-full border border-white/50"
            >
                <label htmlFor="title" className="block text-white font-semibold mb-1">
                    Title for the task:
                </label>
                <input
                    id="title"
                    name="title"
                    placeholder="watering the plants.."
                    className="w-full p-2 rounded-lg bg-white/40 backdrop-blur-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label htmlFor="time-spent" className="block text-white font-semibold mt-4 mb-1">
                    Time spent working on the task:
                </label>
                <input
                    id="time-spent"
                    name="time-spent"
                    placeholder="1 hour"
                    className="w-full p-2 rounded-lg bg-white/40 backdrop-blur-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex justify-between mt-6">
                    <button
                        name="add-task-button"
                        id="add-task-button"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 border border-blue-700"
                        // onClick={handleNewTaskButtonClickFn}
                    >
                        Add Task
                    </button>
                    <button
                        name="cancel-button"
                        id="cancel-button"
                        onClick={handleNewTaskButtonClickFn}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 border border-red-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>


    )
}

export default FormPage;