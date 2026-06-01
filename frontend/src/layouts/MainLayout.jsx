import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">
          AI Research Workspace
        </h1>

        <div className="flex gap-4">
          <Link className="hover:text-gray-300" to="/">
            Home
          </Link>

          <Link className="hover:text-gray-300" to="/dashboard">
            Dashboard
          </Link>

          <Link className="hover:text-gray-300" to="/login">
            Login
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;