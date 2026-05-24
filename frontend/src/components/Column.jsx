import { useDrop } from "react-dnd";

import TaskCard from "./TaskCard";

function Column({ title, status, tasks, moveTask }) {

    const [, drop] = useDrop(() => ({

        accept: "TASK",

        drop: (item) => {

            moveTask(item._id, status);
        }
    }));

    return (

        <div
            ref={drop}
            className="
                bg-[#111114]
                border border-white/10
                rounded-2xl
                p-4
                min-h-[700px]
                flex flex-col
            "
        >

            {/* Column Header */}
            <div className="
                flex items-center
                justify-between
                mb-5
            ">

                <h2 className="
                    text-2xl
                    font-bold
                    text-white
                ">
                    {title}
                </h2>

                <div className="
                    bg-white/10
                    text-sm
                    px-3
                    py-1
                    rounded-full
                    text-gray-300
                ">

                    {
                        tasks.filter(
                            (task) => task.status === status
                        ).length
                    }

                </div>

            </div>

            {/* Task Container */}
            <div className="
                flex flex-col
                gap-4
                overflow-y-auto
                pr-1
            ">

                {
                    tasks
                        .filter(
                            (task) => task.status === status
                        )
                        .map((task) => (

                            <TaskCard
                                key={task._id}
                                task={task}
                            />

                        ))
                }

            </div>

        </div>
    );
}

export default Column;