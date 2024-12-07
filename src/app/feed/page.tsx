import React from "react";
import ThreeColumnLayout from "../../components/three-column-layout";
import FeedPage from "@/components/feed-page";
function page() {
  return (
    <div className="relative bg-black text-white">
      <div className="z-40 relative">
        {" "}
        {/* Ensure the content is above gradients */}
        <ThreeColumnLayout>
          <FeedPage />
        </ThreeColumnLayout>
      </div>

      <div className="z-10 absolute inset-0">
        {" "}
        {/* Set gradients behind content */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-blue-900/30" />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default page;
