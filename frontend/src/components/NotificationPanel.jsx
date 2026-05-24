import { useEffect, useState } from "react";

import socket from "../services/socket";

function NotificationPanel() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        socket.on("taskUpdated", (task) => {

            setNotifications((prev) => [

                `Task Updated: ${task.title}`,

                ...prev
            ]);
        });

    }, []);

    return (

        <div className="mt-6">

            <h2 className="font-bold mb-3">
                Notifications
            </h2>

            {
                notifications.map((notification, index) => (

                    <p key={index} className="text-sm mb-2">
                        {notification}
                    </p>

                ))
            }

        </div>
    );
}

export default NotificationPanel;