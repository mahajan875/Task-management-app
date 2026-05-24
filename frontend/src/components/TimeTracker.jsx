import API from "../services/api";

function TimeTracker({ task, refreshTasks }) {

    const startTimer = async () => {

        await API.post(`/tasks/${task._id}/start-timer`);

        refreshTasks();
    };

    const stopTimer = async () => {

        await API.post(`/tasks/${task._id}/stop-timer`);

        refreshTasks();
    };

    return (

        <div className="mt-4">

            <p className="text-sm text-gray-400 mb-2">
                Time Spent:
                {" "}
                {Math.floor(task.timeSpent / 60)} mins
            </p>

            {
                !task.timerStartedAt ? (

                    <button
                        onClick={startTimer}
                        className="
                            bg-green-500
                            text-white
                            px-3 py-1
                            rounded-lg
                            text-sm
                            mr-2
                        "
                    >
                        Start Timer
                    </button>

                ) : (

                    <button
                        onClick={stopTimer}
                        className="
                            bg-red-500
                            text-white
                            px-3 py-1
                            rounded-lg
                            text-sm
                        "
                    >
                        Stop Timer
                    </button>

                )
            }

        </div>
    );
}

export default TimeTracker;