import { useEffect, useState } from "react";

import API from "../services/api";

function CreateTask({ createTask }) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [priority, setPriority] = useState("medium");

    const [users, setUsers] = useState([]);

    const [projects, setProjects] = useState([]);

    const [assignedTo, setAssignedTo] = useState("");

    const [project, setProject] = useState("");

    const [dueDate, setDueDate] = useState("");

    useEffect(() => {

        fetchUsers();

        fetchProjects();

    }, []);

    // FETCH USERS
    const fetchUsers = async () => {

        const res = await API.get("/users");

        setUsers(res.data);
    };

    // FETCH PROJECTS
    const fetchProjects = async () => {

        const res = await API.get("/projects");

        setProjects(res.data);
    };

    // CREATE TASK
    const handleSubmit = async () => {

        await createTask({

            title,
            description,
            priority,
            assignedTo,
            project,
            dueDate,
            status: "todo"
        });

        setTitle("");

        setDescription("");

        setPriority("medium");

        setAssignedTo("");

        setProject("");

        setDueDate("");
    };

    return (

        <div className="
            bg-[#18181b]
            border border-white/10
            rounded-2xl
            p-6
            mb-6
        ">

            <h2 className="
                text-2xl
                font-bold
                text-white
                mb-6
            ">
                Create Task
            </h2>

            {/* Task Name */}
            <div className="mb-4">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Task Name
                </label>

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                        focus:border-blue-500
                    "
                />

            </div>

            {/* Description */}
            <div className="mb-4">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Task Description
                </label>

                <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="
                        w-full
                        h-28
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        resize-none
                        outline-none
                        focus:border-blue-500
                    "
                />

            </div>

            {/* Priority */}
            <div className="mb-4">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Priority
                </label>

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                    "
                >

                    <option value="low">
                        Low
                    </option>

                    <option value="medium">
                        Medium
                    </option>

                    <option value="high">
                        High
                    </option>

                </select>

            </div>

            {/* Assign Team Member */}
            <div className="mb-4">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Assign Team Member
                </label>

                <select
                    value={assignedTo}
                    onChange={(e) =>
                        setAssignedTo(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                    "
                >

                    <option value="">
                        Select Team Member
                    </option>

                    {
                        users.map((user) => (

                            <option
                                key={user._id}
                                value={user._id}
                            >
                                {user.name}
                            </option>

                        ))
                    }

                </select>

            </div>

            {/* Project */}
            <div className="mb-4">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Project
                </label>

                <select
                    value={project}
                    onChange={(e) =>
                        setProject(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                    "
                >

                    <option value="">
                        Select Project
                    </option>

                    {
                        projects.map((project) => (

                            <option
                                key={project._id}
                                value={project._id}
                            >
                                {project.name}
                            </option>

                        ))
                    }

                </select>

            </div>

            {/* Due Date */}
            <div className="mb-6">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Due Date
                </label>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                        setDueDate(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                    "
                />

            </div>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                className="
                    w-full
                    bg-blue-500
                    hover:bg-blue-600
                    transition
                    text-white
                    font-semibold
                    py-3
                    rounded-xl
                "
            >
                Create Task
            </button>

        </div>
    );
}

export default CreateTask;