import Image from 'next/image'
import { ArrowDownIcon, ArrowUpIcon, MessageSquare, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Prediction } from "@/lib/data"

type PredictionDetailProps = Prediction

export default function PredictionDetail({ question, chance, volume, comments, description, imageUrl }: PredictionDetailProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">{question}</h1>
          <div className="text-right">
            <div className="text-3xl font-bold">{chance}%</div>
            <div className="text-sm text-muted-foreground">chance</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Image src={imageUrl} alt={question} width={800} height={400} className="w-full h-64 object-cover rounded-md" />
        <Progress value={chance} className="mb-2" />
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <ArrowUpIcon className="mr-2 h-4 w-4" />
            Buy Yes
          </Button>
          <Button className="w-full bg-red-600 hover:bg-red-700">
            <ArrowDownIcon className="mr-2 h-4 w-4" />
            Buy No
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>{volume} Vol.</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {comments}
          </span>
          <Star className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

