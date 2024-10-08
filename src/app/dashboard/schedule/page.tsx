"use client";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {columns} from "./columns";
import {DataTable} from "./data-table";
import {createClient} from "@/utils/supabase/client";

const supabase = createClient();

// データフェッチ用の関数
const fetcher = async () => {
  const {data, error} = await supabase.from("satellite_schedule").select("*");
  if (error) {
    throw new Error(error.message);
  }

  console.log(data);

  return data;
};

export default function Schedule() {
  const {data, error} = useSWR("satellite_schedule", fetcher);

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  // dataから今日の日付以降のpass_start_timeを持つデータを抽出
  const today = new Date();
  const filteredData = data.filter((row) => {
    if (!row.pass_start_time) {
      return false;
    }
    const passStartTime = new Date(row.pass_start_time);
    return passStartTime.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  });

  return (
    <main className="bg-neutral-50 w-full p-12 grid grid-cols-1 gap-8">
      <div className="max-w-screen-xl w-full mx-auto">
        <Card className="md:col-span-2 w-full">
          <CardHeader>
            <CardTitle className="text-xl">パス計画の作成</CardTitle>
            <CardDescription>各パスでの運用計画を作成します</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={filteredData} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
