import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h1 className="flex text-2xl font-bold">404</h1>
      <p className="flex text-sm text-gray-600">Sayfa bulunamadı.</p>
      <Link to="/" className="flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
        Home’a dön
      </Link>
    </div>
  );
}