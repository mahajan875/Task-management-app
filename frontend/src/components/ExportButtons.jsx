import { saveAs } from "file-saver";

function ExportButtons({ tasks }) {

    const exportJSON = () => {

        const blob = new Blob(

            [JSON.stringify(tasks, null, 2)],

            {
                type: "application/json"
            }
        );

        saveAs(blob, "tasks.json");
    };

    return (

        <button
            onClick={exportJSON}
            className="
                bg-purple-500
                text-white
                px-5 py-3
                rounded-xl
                mb-6
            "
        >
            Export Tasks
        </button>
    );
}

export default ExportButtons;