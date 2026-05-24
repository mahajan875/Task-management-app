function SearchBar({

    searchTerm,
    setSearchTerm

}) {

    return (

        <div className="mb-6">

            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="
                    w-full
                    bg-[#18181b]
                    border border-white/10
                    text-white
                    p-4
                    rounded-2xl
                "
            />

        </div>
    );
}

export default SearchBar;