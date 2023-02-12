"use client";

import { useSupabase } from "@/app/components/SupabaseProvider";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "@/app/components/Loader";

const PostNew = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const { supabase } = useSupabase();
  const router = useRouter();

  const onSubmit = async () => {
    if (prompt) {
      try {
        // データベースに保存
        const { data: insertData, error: insertError } = await supabase
          .from("posts")
          .insert({ prompt })
          .select();

        if (insertError) {
          alert(insertError.message);
        }

        if (!insertData) {
          return alert("No data returned");
        }

        // 入力欄をクリア
        setPrompt("");
        router.refresh();

        setLoading(true);

        // テキストプロンプトをAPIに送信
        const body = JSON.stringify({ prompt });
        console.log(body);
        const res = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const resData = await res.json();

        // postsテーブル更新
        const { error: updateError } = await supabase
          .from("posts")
          .update({
            content: resData.text,
          })
          .eq("id", insertData[0].id);

        // エラー処理
        if (updateError) {
          alert(updateError.message);
          setLoading(false);
          return;
        }

        // キャッシュクリア
        router.refresh();
      } catch (error) {
        alert(error);
      }

      setLoading(false);
    }
  };

  // 入力フォームでEnterが押されたら送信、Shift+Enterは改行
  const enterPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await onSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-2 right-2 h-40 flex flex-col justify-end items-center bg-[#7494C0] pb-5">
      {loading && (
        <div className="flex items-center justify-center space-x-3 my-2">
          <Loader />
          <div className="text-white font-bold">GPT is thinking!</div>
        </div>
      )}

      <textarea
        className="w-[752px] bg-gray-50 rounded py-3 px-3 outline-none focus:bg-white"
        id="prompt"
        name="prompt"
        placeholder="How are you?"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => enterPress(e)}
        value={prompt}
        rows={2}
        required
      />

      <div className="text-white text-sm mt-2">
        Shift+Enter: 改行, Enter: 送信
      </div>
    </div>
  );
};

export default PostNew;
