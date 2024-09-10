import {createServerClient, type CookieOptions} from "@supabase/ssr";
import {cookies} from "next/headers";
import {Database} from "@/types/supabase";

// Supabaseクライアントのセットアップ
export const supabase = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() {
        return cookies().getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({name, value, options}) =>
            cookies().set(name, value, options)
          );
        } catch {
          // ignore
        }
      },
    },
  }
);
