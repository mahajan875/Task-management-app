import { useState } from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

function CalendarView({ tasks }) {

    const [selectedDate, setSelectedDate] = useState(
        new Date()
    );

    // Tasks for selected day
    const selectedTasks = tasks.filter((task) => {

        if (!task.dueDate) return false;

        const due = new Date(task.dueDate);

        return (
            due.toDateString() ===
            selectedDate.toDateString()
        );
    });

    // Check if date has tasks
    const hasTaskOnDate = (date) => {

        return tasks.some((task) => {

            if (!task.dueDate) return false;

            const due = new Date(task.dueDate);

            return (
                due.toDateString() ===
                date.toDateString()
            );
        });
    };

    return (

        <div className="
            bg-[#18181b]
            border border-white/10
            rounded-2xl
            p-6
            mt-6
        ">

            <h2 className="
                text-3xl
                font-bold
                text-white
                mb-6
            ">
                Task Calendar
            </h2>

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-8
            ">

                {/* Calendar */}
                <div className="
                    bg-white
                    rounded-2xl
                    p-4
                ">

                    <Calendar

                        onChange={setSelectedDate}

                        value={selectedDate}

                        tileContent={({ date, view }) =>

                            view === "month" &&
                            hasTaskOnDate(date) ? (

                                <div className="
                                    flex
                                    justify-center
                                    mt-1
                                ">

                                    <div className="
                                        w-2
                                        h-2
                                        bg-red-500
                                        rounded-full
                                    "></div>

                                </div>

                            ) : null
                        }

                        tileClassName={({ date }) => {

                            return hasTaskOnDate(date)
                                ? "bg-red-100 rounded-lg"
                                : "";
                        }}

                    />

                </div>

                {/* Task Details */}
                <div>

                    <h3 className="
                        text-xl
                        font-semibold
                        text-white
                        mb-4
                    ">

                        Tasks Due On:
                        {" "}

                        <span className="text-blue-400">

                            {
                                selectedDate.toDateString()
                            }

                        </span>

                    </h3>

                    {
                        selectedTasks.length === 0 ? (

                            <div className="
                                bg-[#0f0f12]
                                border border-white/10
                                rounded-xl
                                p-6
                                text-gray-400
                            ">

                                No tasks due on this day.

                            </div>

                        ) : (

                            selectedTasks.map((task) => (

                                <div
                                    key={task._id}
                                    className="
                                        bg-[#0f0f12]
                                        border border-white/10
                                        rounded-xl
                                        p-5
                                        mb-4
                                    "
                                >

                                    <h4 className="
                                        text-lg
                                        font-bold
                                        text-white
                                        mb-2
                                    ">
                                        {task.title}
                                    </h4>

                                    <p className="
                                        text-gray-400
                                        mb-3
                                    ">
                                        {task.description}
                                    </p>

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-3
                                    ">

                                        <span className="
                                            bg-purple-500/20
                                            text-purple-300
                                            px-3 py-1
                                            rounded-full
                                            text-sm
                                        ">

                                            {task.status}

                                        </span>

                                        <span className={`
                                            px-3 py-1
                                            rounded-full
                                            text-sm
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

                                </div>

                            ))
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default CalendarView;