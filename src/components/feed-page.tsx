import { PredictionCard } from "@/components/prediction-card"
import { predictions } from "@/lib/data"

export function FeedPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Prediction Feed</h1>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {predictions.map((prediction) => (
          <div key={prediction.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]">
            <PredictionCard {...prediction} />
          </div>
        ))}
      </div>
    </div>
  )
}

