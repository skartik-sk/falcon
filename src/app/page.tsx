import  FeedPage  from "@/components/feed-page"
import  ThreeColumnLayout  from "@/components/three-column-layout"

export default function Home() {
  return (
    <div className="">
      <ThreeColumnLayout>
        <FeedPage />
      </ThreeColumnLayout>
    </div>
  )
}