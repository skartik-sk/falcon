export interface Prediction {
  id: string;
  question: string;
  chance: number;
  volume: string;
  comments: number;
  description: string;
  imageUrl: string;
}

export const predictions: Prediction[] = [
  {
    id: "1",
    question: "Will Assad remain President of Syria through 2024?",
    chance: 38,
    volume: "$2m",
    comments: 1289,
    description: "This prediction concerns the political future of Syria's current president, Bashar al-Assad. It takes into account factors such as the ongoing civil war, international pressure, and internal political dynamics.",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "2",
    question: "Issue with female security ",
    chance: 42,
    volume: "$5m",
    comments: 2456,
    description: "I faced an issue in regular life where I was not able to maintain my security.",
    imageUrl: "https://media.istockphoto.com/id/1384434228/vector/tiny-woman-holding-online-virus-protection-shield.jpg?s=612x612&w=0&k=20&c=SxMsN0HzMtqSe6VFSbCgDK59gD3qg7_FHAKjxa8hJeI=",
  },
  {
    id: "3",
    question: "Will SpaceX successfully launch Starship to orbit in 2024?",
    chance: 75,
    volume: "$3.5m",
    comments: 1876,
    description: "This prediction is about SpaceX's ambitious goal to launch its Starship spacecraft into orbit. It considers factors such as technological readiness, regulatory approvals, and past performance in spacecraft development.",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "4",
    question: "Will the global average temperature exceed 1.5°C above pre-industrial levels in 2024?",
    chance: 60,
    volume: "$1.8m",
    comments: 1032,
    description: "This prediction relates to global climate change, specifically whether the world will cross a critical temperature threshold. It takes into account current climate trends, emissions data, and climate model projections.",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "5",
    question: "Will AI surpass human performance on the Turing test by the end of 2024?",
    chance: 15,
    volume: "$4.2m",
    comments: 3210,
    description: "This prediction is about the advancement of artificial intelligence, specifically whether AI will be able to convincingly pass as human in conversation. It considers current AI capabilities, ongoing research, and the challenges of natural language processing.",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
];

export function getPrediction(id: string): Prediction | undefined {
  return predictions.find(p => p.id === id);
}

