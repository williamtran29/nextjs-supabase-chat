import PostNew from "@/app/components/post/PostNew";
import { Suspense } from "react";
import Loading from "@/app/loading";
import PostList from "@/app/components/post/PostList";

const Page = () => {
  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>
        {/* @ts-ignore */}
        <PostList />
      </Suspense>

      <PostNew />
    </div>
  );
};

export default Page;
