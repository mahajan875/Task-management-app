function AdvancedFilters({

    priorityFilter,
    setPriorityFilter,

    statusFilter,
    setStatusFilter

}) {

    return (

        <div className="
            bg-[#18181b]
            border border-white/10
            rounded-2xl
            p-5
            mb-6
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
        ">

            <div>

                <label className="
                    text-sm
                    text-gray-400
                    block
                    mb-2
                ">
                    Filter By Priority
                </label>

                <select
                    value={priorityFilter}
                    onChange={(e) =>
                        setPriorityFilter(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                    "
                >

                    <option value="">
                        All Priorities
                    </option>

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

            <div>

                <label className="
                    text-sm
                    text-gray-400
                    block
                    mb-2
                ">
                    Filter By Status
                </label>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="
                        w-full
                        bg-[#0f0f12]
                        border border-white/10
                        text-white
                        p-3
                        rounded-xl
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="todo">
                        Todo
                    </option>

                    <option value="in-progress">
                        In Progress
                    </option>

                    <option value="completed">
                        Done
                    </option>

                </select>

            </div>

        </div>
    );
}

export default AdvancedFilters;