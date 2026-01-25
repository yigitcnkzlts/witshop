import Header from "./layout/Header";
import PageContent from "./layout/PageContent";

export default function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <PageContent />
    </div>
  );
}