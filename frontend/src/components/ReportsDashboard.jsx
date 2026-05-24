function ReportsDashboard({ tasks }) {

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(
            (task) => task.status === "completed"
        ).length;

    const overdueTasks =
        tasks.filter(
            (task) =>
                task.dueDate &&
                new Date(task.dueDate) < new Date() &&
                task.status !== "completed"
        ).length;

    const totalTime =
        tasks.reduce(
            (acc, task) => acc + task.timeSpent,
            0
        );

    return (

        <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            mb-6
        ">

            <div className="
                bg-blue-500/20
                p-5
                rounded-2xl
            ">
                <p>Total Tasks</p>
                <h2 className="text-3xl font-bold">
                    {totalTasks}
                </h2>
            </div>

            <div className="
                bg-green-500/20
                p-5
                rounded-2xl
            ">
                <p>Completed</p>
                <h2 className="text-3xl font-bold">
                    {completedTasks}
                </h2>
            </div>

            <div className="
                bg-red-500/20
                p-5
                rounded-2xl
            ">
                <p>Overdue</p>
                <h2 className="text-3xl font-bold">
                    {overdueTasks}
                </h2>
            </div>

            <div className="
                bg-yellow-500/20
                p-5
                rounded-2xl
            ">
                <p>Time Logged</p>
                <h2 className="text-3xl font-bold">
                    {Math.floor(totalTime / 60)} mins
                </h2>
            </div>

        </div>
    );
}

export default ReportsDashboard;