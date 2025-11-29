"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/layout/navbar";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  category: string;
  breed?: string;
  imageUrl?: string;
}

export default function GenerateChildPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [parent1Id, setParent1Id] = useState<string>("");
  const [parent2Id, setParent2Id] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchPets(parsedUser.id);
  }, [router]);

  const fetchPets = async (userId: string) => {
    try {
      const response = await fetch("/api/pets", {
        headers: {
          "x-user-id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }

      const data = await response.json();
      setPets(data.pets);
    } catch (error) {
      console.error("Fetch pets error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!parent1Id || !parent2Id) {
      alert("2匹のペットを選択してください");
      return;
    }

    if (parent1Id === parent2Id) {
      alert("異なるペットを選択してください");
      return;
    }

    const parent1 = pets.find((p) => p.id === parent1Id);
    const parent2 = pets.find((p) => p.id === parent2Id);

    setGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/pets/generate-child", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parent1, parent2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error("Generate error:", error);
      alert("画像の生成に失敗しました");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/my-pets">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ペット一覧に戻る
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              子供のイメージ画像を生成
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-600">
              2匹のペットを選択すると、その子供の姿をAIが生成します。
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">親1を選択</label>
                <Select value={parent1Id} onValueChange={setParent1Id}>
                  <SelectTrigger>
                    <SelectValue placeholder="ペットを選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.breed || pet.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">親2を選択</label>
                <Select value={parent2Id} onValueChange={setParent2Id}>
                  <SelectTrigger>
                    <SelectValue placeholder="ペットを選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.breed || pet.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!parent1Id || !parent2Id || generating}
              className="w-full"
            >
              {generating ? "生成中..." : "子供の画像を生成"}
            </Button>

            {generatedImage && (
              <div className="space-y-2">
                <p className="text-sm font-medium">生成された画像:</p>
                <img
                  src={generatedImage}
                  alt="Generated child"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
