import { createClient } from "../../../../utils/supabase-server";
import notFound from "@/app/not-found";
import PostItem from "@/app/components/post/PostItem";

const PostList = async () => {
  const supabase = createClient();

  // 投稿リスト取得
  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: true });

  // 投稿が見つからない場合
  if (!postsData) return notFound();

  return (
    <div>
      {postsData.map((post) => {
        return <PostItem key={post.id} post={{ ...post }} />;
      })}
    </div>
  );
};

export default PostList;
