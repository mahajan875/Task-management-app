function SavedFilters({

    setPriorityFilter,
    setStatusFilter

}) {

    return (

        <div className="
            flex flex-wrap
            gap-3
            mb-6
        ">

            <button
                onClick={() => {

                    setPriorityFilter("high");
                    setStatusFilter("");
                }}
                className="
                    bg-red-500/20
                    text-red-400
                    px-4 py-2
                    rounded-xl
                "
            >
                High Priority
            </button>

            <button
                onClick={() => {

                    setPriorityFilter("");
                    setStatusFilter("completed");
                }}
                className="
                    bg-green-500/20
                    text-green-400
                    px-4 py-2
                    rounded-xl
                "
            >
                Completed
            </button>

        </div>
    );
}

export default SavedFilters;