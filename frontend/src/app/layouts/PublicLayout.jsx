import { Link, Outlet } from "react-router-dom";
import BrandLogo from "../../components/common/BrandLogo";

export default function PublicLayout() {
  return (
    <div className="min-h-screen text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <BrandLogo />

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
