export const requestNotificationPermission = async () => {

    const permission =
        await Notification.requestPermission();

    if (permission === "granted") {

        new Notification(
            "Task Manager Notifications Enabled"
        );
    }
};