
<<<<<<< HEAD
import { PredictionDetail } from "@/components/prediction-detail"
import { ThreeColumnLayout } from "@/components/three-column-layout"
=======
import PredictionDetail  from "@/components/prediction-detail"
import  ThreeColumnLayout  from "@/components/three-column-layout"
>>>>>>> 4b0d1c26d4c75684f38bd4f230a9645018a0e09a
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

