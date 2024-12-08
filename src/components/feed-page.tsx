import PredictionCard from "@/components/prediction-card";
import { Button } from "./ui/button";

interface Post {
  id: number;
  creator: string;
  title: string;
  description: string;
  imageUrl: string;
  status: number;
  createdAt: number;
}

interface FeedPageProps {
  posts?: Post[];
}

export default function FeedPage({ posts = [] }: FeedPageProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold mb-6">Community Feed</div>
        <div>
          <Button className="ml-auto bg-white text-black hover:bg-white hover:scale-105 transition-transform duration-200">
            Raise Concern
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          No posts available. Be the first to raise a concern!
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]"
            >
              {/* <PredictionCard 
                id={toString(post.id)}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                creator={post.creator}
                status={post.status}
                createdAt={post.createdAt}
              /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
