"use client";

import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "@/lib/signIn";
import {useSession} from "@/providers/sessionProvider";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const {setSession} = useSession(); // セッションを更新できるように修正
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // フォームデータの作成
    const formData = new FormData();
    formData.append("email", username);
    formData.append("password", password);

    const result = await signIn(formData);

    if (!result.supabase?.success) {
      setError(result.supabase?.message || "ログインに失敗しました");
    } else {
      // ログイン成功後にセッションを更新
      const sessionData = result.supabase?.session;
      setSession(sessionData); // セッションを更新

      router.push("/dashboard"); // ダッシュボードにリダイレクト
    }
  };

  return (
    <div className="grid grid-rows-[auto_2fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-sm items-center sm:items-start">
        <div className="flex items-center gap-8">
          <Image
            src="/gardens_logo.png"
            alt="Gardens Task Manager"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Gardens Task Manager</h1>
            <a className="text-sm">
              A task manager for the Satellite Operation
            </a>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-2">
            <span className="font-medium text-sm">Username</span>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-sm">Password</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-red-500">{error}</p>}

          <Link
            href="/signup"
            className="text-sm text-blue-500 hover:underline"
          >
            新しいアカウントを作成するにはこちら
          </Link>

          <Button type="submit" className="mt-4">
            Sign In
          </Button>
        </form>
      </main>
    </div>
  );
}
