import {useState, useEffect} from "react";
import useSWR from "swr";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {createClient} from "@/utils/supabase/client";
import {useSession} from "@/providers/sessionProvider";

type OperationStatus = "unset" | "operate" | "doNotOperate";

interface OperationSettingsProps {
  onStatusChange: (status: OperationStatus) => void;
  satelliteScheduleId: string;
}

const supabase = createClient();

// ユーザーリストを取得するフェッチ関数
const fetcher = async () => {
  const {data, error} = await supabase.from("user_details").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const OperationSettings = ({
  onStatusChange,
  satelliteScheduleId,
}: OperationSettingsProps) => {
  const {session} = useSession();
  const [operationStatus, setOperationStatus] =
    useState<OperationStatus>("unset");
  const [operators, setOperators] = useState<string[]>([]); // 運用者のIDリストを管理
  const [commands, setCommands] = useState<
    {order: number; command: string[]; description: string}[]
  >([]); // コマンドリスト
  const [commandInput, setCommandInput] = useState<Array<string>>(
    new Array(11).fill("") // 11個の要素に変更
  );
  const [commandDescription, setCommandDescription] = useState<string>(""); // コマンドの説明
  const {data: userDetails, error} = useSWR("user_details", fetcher); // SWRでユーザーリストを取得

  // 初期設定を取得する
  useEffect(() => {
    const fetchInitialSettings = async () => {
      try {
        const {data, error} = await supabase
          .from("operation")
          .select("*")
          .eq("satellite_schedule_id", satelliteScheduleId)
          .single(); // Fetch a single row

        if (error && error.code !== "PGRST116") {
          // Ignore no row found error
          throw error;
        }

        if (data) {
          // 既存のエントリが存在する場合、それを初期設定に使用
          setOperationStatus((data.status as OperationStatus) || "unset");
          setOperators((data.operators as string[]) || []);
          setCommands(
            (data.commands as {
              order: number;
              command: string[];
              description: string;
            }[]) || []
          );
        }
      } catch (error) {
        console.error("初期設定の取得中にエラーが発生しました", error);
      }
    };

    fetchInitialSettings();
  }, [satelliteScheduleId]); // satelliteScheduleIdが変わったら再度フェッチ

  const handleStatusChange = (status: OperationStatus) => {
    setOperationStatus(status);
    onStatusChange(status);
  };

  const addOperator = (id: string) => {
    setOperators([...operators, id]);
  };

  const removeOperator = (index: number) => {
    setOperators(operators.filter((_, i) => i !== index));
  };

  const handleSelectUser = (auth_id: string) => {
    if (auth_id && !operators.includes(auth_id)) {
      addOperator(auth_id);
    }
  };

  const handleCommandInputChange = (index: number, value: string) => {
    const newCommandInput = [...commandInput];
    newCommandInput[index] = value.toUpperCase();
    setCommandInput(newCommandInput);
  };

  const handleAddCommand = () => {
    if (commandInput.every((c) => /^[0-9A-F]{2}$/.test(c))) {
      setCommands([
        ...commands,
        {
          order: commands.length + 1,
          command: commandInput,
          description: commandDescription || "No description",
        },
      ]);
      setCommandInput(new Array(11).fill("")); // フォームをリセット
      setCommandDescription(""); // 説明をリセット
    } else {
      alert("すべてのフィールドに16進数の2桁の値を入力してください");
    }
  };

  const removeCommand = (index: number) => {
    setCommands(commands.filter((_, i) => i !== index));
  };

  // DBに保存する関数
  const saveOperationSettings = async () => {
    try {
      // Check if an entry with the given satellite_schedule_id already exists
      const {data: existingEntry, error: fetchError} = await supabase
        .from("operation")
        .select("*")
        .eq("satellite_schedule_id", satelliteScheduleId)
        .single(); // Fetch a single row

      if (fetchError && fetchError.code !== "PGRST116") {
        // Ignore no row found error
        throw fetchError;
      }

      if (existingEntry) {
        // If the entry exists, update it
        const {data, error} = await supabase
          .from("operation")
          .update({
            status: operationStatus,
            operators: operators,
            commands: commands,
            update_at: new Date().toISOString(),
            create_user_id: session?.user.id,
          })
          .eq("satellite_schedule_id", satelliteScheduleId);

        if (error) {
          throw error;
        }
        alert("設定が更新されました！");
      } else {
        // If no entry exists, insert a new one
        const {data, error} = await supabase.from("operation").insert({
          status: operationStatus,
          operators: operators,
          commands: commands,
          update_at: new Date().toISOString(),
          create_user_id: session?.user.id,
          satellite_schedule_id: satelliteScheduleId,
        });

        if (error) {
          throw error;
        }
        alert("設定が保存されました！");
      }
    } catch (error) {
      alert("設定の保存中にエラーが発生しました");
    }
  };

  if (error) return <div>Error loading user details...</div>;
  if (!userDetails) return <div>Loading user details...</div>;

  return (
    <div>
      <div className="flex justify-center mt-8 space-x-8">
        <Button
          variant={operationStatus === "operate" ? "default" : "outline"}
          onClick={() =>
            handleStatusChange(
              operationStatus === "operate" ? "unset" : "operate"
            )
          }
        >
          運用する
        </Button>
        <Button
          variant={operationStatus === "doNotOperate" ? "default" : "outline"}
          onClick={() =>
            handleStatusChange(
              operationStatus === "doNotOperate" ? "unset" : "doNotOperate"
            )
          }
        >
          運用しない
        </Button>
      </div>
      <div className="mt-8">
        {operationStatus === "operate" && (
          <>
            <h3 className="text-lg font-bold">担当者アサイン</h3>
            <div className="mt-2">
              {/* ドロップダウンメニュー */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">運用者を選択</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>ユーザーを選択</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {userDetails.map((user) => (
                      <DropdownMenuItem
                        key={user.auth_id}
                        onClick={() => handleSelectUser(user.auth_id as string)}
                      >
                        {user.last_name} {user.first_name} ({user.unit_no}号機)
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <ul>
                {operators.map((operatorId, index) => {
                  const user = userDetails.find(
                    (user) => user.auth_id === operatorId
                  );
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center mt-2"
                    >
                      <span>
                        {user
                          ? `${user.last_name} ${user.first_name}`
                          : "Unknown User"}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => removeOperator(index)}
                      >
                        削除
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Separator className="my-4" />
            <h3 className="text-lg font-bold">コマンド登録</h3>
            <div className="mt-2">
              <div className="flex space-x-2 mb-2">
                {commandInput.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleCommandInputChange(index, e.target.value)
                    }
                    placeholder="00"
                    maxLength={2}
                    className="border rounded px-2 py-1 w-12 text-center"
                  />
                ))}
              </div>
              <input
                type="text"
                value={commandDescription}
                onChange={(e) => setCommandDescription(e.target.value)}
                placeholder="コマンドの説明を入力"
                className="border rounded px-2 py-1 w-full mt-2"
              />
              <Button onClick={handleAddCommand} className="mt-4">
                コマンドを追加
              </Button>
              <ul className="mt-4">
                {commands.map((command, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mt-2"
                  >
                    <span>
                      順序: {command.order}, コマンド:{" "}
                      {command.command.join(" ")}, 説明: {command.description}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => removeCommand(index)}
                    >
                      削除
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {operationStatus === "doNotOperate" && (
          <>
            <p>このパスは運用しない設定です</p>
            <p>切り替えるにはボタンを押してください</p>
          </>
        )}
        {operationStatus === "unset" && (
          <>
            <p>運用するかどうかを選択してください</p>
          </>
        )}
      </div>
      {/* 変更を反映するボタン */}
      <div className="mt-8 flex justify-center">
        <Button onClick={saveOperationSettings}>変更を反映</Button>
      </div>
    </div>
  );
};

export default OperationSettings;
