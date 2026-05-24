import KanbanBoard from "../components/KanbanBoard";
import TeamMembers from "../components/TeamMembers";
import NotificationPanel from "../components/NotificationPanel";
import ActivityFeed from "../components/ActivityFeed";
import CreateProject from "../components/CreateProject";

export default function Dashboard() {

  return (

    <div className="min-h-screen bg-[#0c0c0e] text-white">

      {/* Navbar */}
      <div className="
        h-16 border-b border-white/10
        flex items-center px-6
        bg-[#111]
        sticky top-0 z-50
      ">

        <h1 className="text-2xl font-bold">
          Task Management Dashboard
        </h1>

      </div>

      {/* Main Layout */}
      <div className="
        max-w-[1600px]
        mx-auto
        p-6
        grid
        grid-cols-1 lg:grid-cols-[1fr_350px]
        gap-6
      ">

        {/* Left Section */}
        <div className="space-y-6">

          {/* Create Project */}
          <div className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-6
          ">

            <h2 className="text-xl font-bold mb-4">
              Create Project
            </h2>

            <CreateProject />

          </div>

          {/* Kanban Board */}
          <div className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-6
            overflow-x-auto
          ">

            <h2 className="text-xl font-bold mb-6">
              Project Board
            </h2>

            <KanbanBoard />

          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Team Members */}
          <div className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-6
          ">

            <h2 className="text-xl font-bold mb-4">
              Team Members
            </h2>

            <TeamMembers />

          </div>

          {/* Notifications */}
          <div className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-6
            max-h-[300px]
            overflow-y-auto
          ">

            <h2 className="text-xl font-bold mb-4">
              Notifications
            </h2>

            <NotificationPanel />

          </div>

          {/* Activity Feed */}
          <div className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-6
            max-h-[300px]
            overflow-y-auto
          ">

            <h2 className="text-xl font-bold mb-4">
              Activity Feed
            </h2>

            <ActivityFeed />

          </div>

        </div>

      </div>

    </div>
  );
}