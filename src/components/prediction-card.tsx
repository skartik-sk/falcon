import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon, MessageSquare, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Prediction } from "@/lib/data";

type PredictionCardProps = Prediction;

export default function PredictionCard({
  id,
  question,
  chance,
  volume,
  comments,
}: PredictionCardProps) {
  return (
    <Link href={`/prediction/${id}`} className="block w-full">
      <Card className="w-full hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">{question}</h3>
            <div className="text-right">
              <div className="text-xl font-bold">{chance}%</div>
              <div className="text-xs text-muted-foreground">chance</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <Progress value={chance} className="mb-2" />
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              Buy Yes
            </Button>
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              Buy No
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground pt-2">
          <div>{volume} Vol.</div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {comments}
            </span>
            <Star className="h-3 w-3" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
