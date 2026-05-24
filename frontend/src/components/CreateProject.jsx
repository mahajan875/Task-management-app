import { useState } from "react";

import API from "../services/api";

function CreateProject() {

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const createProject = async () => {

        await API.post("/projects", {

            name,
            description
        });

        setName("");
        setDescription("");
    };

    return (

        <div className="
            bg-[#18181b]
            border border-white/10
            rounded-2xl
            p-6
        ">

            <h2 className="
                text-2xl
                font-bold
                text-white
                mb-6
            ">
                Create Project
            </h2>

            {/* Project Name */}
            <div className="mb-5">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Project Name
                </label>

                <input
                    type="text"
                    placeholder="Enter project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                        focus:border-green-500
                    "
                />

            </div>

            {/* Description */}
            <div className="mb-6">

                <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                ">
                    Project Description
                </label>

                <textarea
                    placeholder="Enter project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="
                        w-full
                        h-28
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                        outline-none
                        resize-none
                        focus:border-green-500
                    "
                />

            </div>

            <button
                onClick={createProject}
                className="
                    w-full
                    bg-green-500
                    hover:bg-green-600
                    transition
                    text-white
                    font-semibold
                    py-3
                    rounded-xl
                "
            >
                Create Project
            </button>

        </div>
    );
}

export default CreateProject;