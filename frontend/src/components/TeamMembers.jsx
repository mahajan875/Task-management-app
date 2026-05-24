import { useEffect, useState } from "react";

import API from "../services/api";

function TeamMembers() {

    const [members, setMembers] = useState([]);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    useEffect(() => {

        fetchMembers();

    }, []);

    const fetchMembers = async () => {

        const res = await API.get("/users");

        setMembers(res.data);
    };

    const addMember = async () => {

        if (!name || !email) return;

        await API.post("/users", {

            name,
            email,
            password: "123456",
            role: "member"
        });

        setName("");
        setEmail("");

        fetchMembers();
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                Team Members
            </h2>

            <div className="mb-4">

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                        border p-2 rounded w-full mb-2
                    "
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                        border p-2 rounded w-full mb-2
                    "
                />

                <button
                    onClick={addMember}
                    className="
                        bg-blue-500 text-white px-4 py-2 rounded w-full
                    "
                >
                    Add Member
                </button>

            </div>

            {
                members.map((member) => (

                    <div
                        key={member._id}
                        className="flex items-center mb-3"
                    >

                        <div className="
                            w-3 h-3 bg-green-500 rounded-full mr-3
                        "></div>

                        <p>{member.name}</p>

                    </div>

                ))
            }

        </div>
    );
}

export default TeamMembers;