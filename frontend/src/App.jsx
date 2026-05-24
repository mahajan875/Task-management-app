import { lazy, Suspense } from "react";

const Dashboard = lazy(() =>
    import("./pages/Dashboard")
);

function App() {

    return (

        <Suspense fallback={<p>Loading...</p>}>

            <Dashboard />

        </Suspense>
    );
}

export default App;