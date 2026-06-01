import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="bg-black text-white p-4 flex justify-between">
        <div className="font-bold">AI Research Workspace</div>

        <div className="flex gap-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;