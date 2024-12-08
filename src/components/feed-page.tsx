import PredictionCard from "@/components/prediction-card";
import { predictions } from "@/lib/data";
import { Button } from "./ui/button";

export default function FeedPage() {
  return (
    <div className="w-full ">
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-6">Feed</div>
        <div>
            <Button className="ml-auto bg-white text-black hover:bg-white hover:scale-105 transition-transform duration-200">Raise Concern</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]"
          >
            <PredictionCard {...prediction} />
          </div>
        ))}
      </div>
    </div>
  );
}
