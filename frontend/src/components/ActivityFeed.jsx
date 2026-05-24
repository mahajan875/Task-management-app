import { useEffect, useState } from "react";

import socket from "../services/socket";

function ActivityFeed() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        socket.on("taskUpdated", (task) => {

            setActivities((prev) => [

                `${task.title} moved to ${task.status}`,

                ...prev
            ]);
        });

    }, []);

    return (

        <div className="mt-6">

            <h2 className="font-bold mb-3">
                Activity Feed
            </h2>

            {
                activities.map((activity, index) => (

                    <p key={index} className="text-sm mb-2">
                        {activity}
                    </p>

                ))
            }

        </div>
    );
}

export default ActivityFeed;