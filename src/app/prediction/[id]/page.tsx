
import { PredictionDetail } from "@/components/prediction-detail"
import { ThreeColumnLayout } from "@/components/three-column-layout"
import { getPrediction } from "@/lib/data"

export default function PredictionPage({ params }: { params: { id: string } }) {
  const prediction = getPrediction(params.id)

  if (!prediction) {
    return <div>Prediction not found</div>
  }

  return (
    <ThreeColumnLayout>
      <div className="w-full">
        <PredictionDetail {...prediction} />
      </div>
    </ThreeColumnLayout>
  )
}

