import Slider from "../components/Slider";
import EditorsPick from "../components/EditorsPick";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Slider />
      <EditorsPick />
    </div>
  );
}