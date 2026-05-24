import { useDrag } from "react-dnd";

import API from "../services/api";

import TimeTracker from "./TimeTracker";

function TaskCard({ task }) {

    const [{ isDragging }, drag] = useDrag(() => ({

        type: "TASK",

        item: {
            _id: task._id
        },

        collect: (monitor) => ({

            isDragging: !!monitor.isDragging()
        })
    }));

    // DELETE TASK
    const deleteTask = async () => {

        try {

            await API.delete(
                `/tasks/${task._id}`
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            ref={drag}
            className={`
                bg-[#18181b]
                border border-white/10
                p-4
                rounded-2xl
                shadow-lg
                mb-4
                cursor-pointer
                transition-all
                duration-200
                hover:border-purple-500/40
                active:scale-[0.98]
                touch-none
                select-none
                ${
                    isDragging
                        ? "opacity-50 scale-95"
                        : ""
                }
            `}
        >

            {/* Task Name */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Task Name
                </p>

                <h3 className="
                    text-lg
                    md:text-xl
                    font-bold
                    text-white
                    break-words
                ">
                    {task.title}
                </h3>

            </div>

            {/* Description */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Description
                </p>

                <p className="
                    text-sm
                    text-gray-300
                    break-words
                ">
                    {task.description}
                </p>

            </div>

            {/* Assigned Member */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Assigned To
                </p>

                <p className="
                    text-sm
                    text-blue-400
                    font-medium
                ">
                    {task.assignedTo?.name || "Unassigned"}
                </p>

            </div>

            {/* Due Date */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Due Date
                </p>

                <p className="
                    text-sm
                    text-orange-400
                ">

                    {
                        task.dueDate
                            ? new Date(
                                task.dueDate
                              ).toLocaleDateString()
                            : "No Due Date"
                    }

                </p>

            </div>

            {/* Status */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Status
                </p>

                <span className="
                    inline-block
                    px-3 py-1
                    rounded-full
                    text-xs
                    bg-purple-500/20
                    text-purple-300
                ">

                    {task.status}

                </span>

            </div>

            {/* Priority */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Priority
                </p>

                <span className={`
                    inline-block
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-medium
                    ${
                        task.priority === "high"
                            ? "bg-red-500/20 text-red-400"
                            : task.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                    }
                `}>

                    {task.priority}

                </span>

            </div>

            {/* Billable */}
            <div className="mb-4">

                <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    mb-1
                    tracking-wider
                ">
                    Billable
                </p>

                <span className={`
                    inline-block
                    px-3 py-1
                    rounded-full
                    text-xs
                    ${
                        task.billable
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                    }
                `}>

                    {
                        task.billable
                            ? "Yes"
                            : "No"
                    }

                </span>

            </div>

            {/* Time Tracker */}
            <div className="
                border-t
                border-white/10
                pt-4
            ">

                <TimeTracker
                    task={task}
                    refreshTasks={() =>
                        window.location.reload()
                    }
                />

            </div>

            {/* Delete Button */}
            <button
                onClick={deleteTask}
                className="
                    w-full
                    mt-4
                    bg-red-500/20
                    hover:bg-red-500/30
                    text-red-400
                    py-2
                    rounded-xl
                    transition
                "
            >
                Delete Task
            </button>

        </div>
    );
}

export default TaskCard;