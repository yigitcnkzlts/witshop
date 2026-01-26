import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

export default function PageContent() {
  return (
    <main className="flex w-full flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}