import { useEffect, useState } from "react";

import API from "../services/api";

import socket from "../services/socket";

import Column from "./Column";

import CreateTask from "./CreateTask";

import AdvancedFilters from "./AdvancedFilters";

import SearchBar from "./SearchBar";

import SavedFilters from "./SavedFilters";

import ExportButtons from "./ExportButtons";

import CalendarView from "./CalendarView";

import ReportsDashboard from "./ReportsDashboard";

function KanbanBoard() {

    const [tasks, setTasks] = useState([]);

    const [priorityFilter, setPriorityFilter] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        fetchTasks();

        // TASK UPDATE
        socket.on("taskUpdated", (updatedTask) => {

            setTasks((prev) => {

                const exists = prev.find(
                    (task) => task._id === updatedTask._id
                );

                if (exists) {

                    return prev.map((task) =>
                        task._id === updatedTask._id
                            ? updatedTask
                            : task
                    );
                }

                return [...prev, updatedTask];
            });
        });

        // TASK DELETE
        socket.on("taskDeleted", (taskId) => {

            setTasks((prev) =>
                prev.filter(
                    (task) => task._id !== taskId
                )
            );
        });

        return () => {

            socket.off("taskUpdated");

            socket.off("taskDeleted");
        };

    }, []);

    const fetchTasks = async () => {

        const res = await API.get("/tasks");

        setTasks(res.data);
    };

    // CREATE TASK
    const createTask = async (taskData) => {

        await API.post("/tasks", taskData);

        // Socket.IO updates automatically
    };

    // MOVE TASK
    const moveTask = async (taskId, status) => {

        const res = await API.put(`/tasks/${taskId}`, {
            status
        });

        setTasks((prev) =>
            prev.map((task) =>
                task._id === taskId
                    ? res.data
                    : task
            )
        );
    };

    // FILTER TASKS
    const filteredTasks = tasks.filter((task) => {

        const matchesPriority =
            priorityFilter
                ? task.priority === priorityFilter
                : true;

        const matchesStatus =
            statusFilter
                ? task.status === statusFilter
                : true;

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return (
            matchesPriority &&
            matchesStatus &&
            matchesSearch
        );
    });

    return (

        <div className="w-full">

            {/* Create Task */}
            <CreateTask createTask={createTask} />

            {/* Reports Dashboard */}
            <ReportsDashboard tasks={tasks} />

            {/* Search */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Saved Filters */}
            <SavedFilters
                setPriorityFilter={setPriorityFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Advanced Filters */}
            <AdvancedFilters
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Export */}
            <ExportButtons tasks={filteredTasks} />

            {/* Responsive Kanban */}
            <div className="
                flex
                gap-6
                overflow-x-auto
                pb-4
                mt-6
                snap-x
                scrollbar-thin
            ">

                {/* Todo */}
                <div className="
                    min-w-[320px]
                    lg:min-w-0
                    flex-1
                    snap-center
                ">

                    <Column
                        title="Todo"
                        status="todo"
                        tasks={filteredTasks}
                        moveTask={moveTask}
                    />

                </div>

                {/* In Progress */}
                <div className="
                    min-w-[320px]
                    lg:min-w-0
                    flex-1
                    snap-center
                ">

                    <Column
                        title="In Progress"
                        status="in-progress"
                        tasks={filteredTasks}
                        moveTask={moveTask}
                    />

                </div>

                {/* Done */}
                <div className="
                    min-w-[320px]
                    lg:min-w-0
                    flex-1
                    snap-center
                ">

                    <Column
                        title="Done"
                        status="completed"
                        tasks={filteredTasks}
                        moveTask={moveTask}
                    />

                </div>

            </div>

            {/* Calendar */}
            <CalendarView tasks={tasks} />

        </div>
    );
}

export default KanbanBoard;