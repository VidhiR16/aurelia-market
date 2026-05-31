import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 dark:border-gray-800 dark:bg-dark-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Signing out</p>
        <h1 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">You’ve been signed out</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Redirecting to the login page. If you are not redirected automatically, click the button below.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="mt-6 inline-flex rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Go to login
        </button>
      </div>
    </div>
  );
}