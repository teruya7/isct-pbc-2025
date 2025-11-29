"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/navbar";
import { Plus, Sparkles } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  category: string;
  breed?: string;
  imageUrl?: string;
}

export default function MyPetsPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchPets(JSON.parse(userData));
  }, [router]);

  const fetchPets = async (userData: any) => {
    try {
      const response = await fetch("/api/pets", {
        headers: {
          "x-user-id": userData.id,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
          <div className="flex gap-2">
            <Link href="/my-pets/generate">
              <Button variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                子供を生成
              </Button>
            </Link>
            <Link href="/my-pets/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Pet
              </Button>
            </Link>
          </div>
        </div>

        {pets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                You don&apos;t have any pets yet.
              </p>
              <Link href="/my-pets/new">
                <Button>Add Your First Pet</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <Link key={pet.id} href={`/my-pets/${pet.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={pet.imageUrl} alt={pet.name} />
                      <AvatarFallback>
                        {pet.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{pet.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {pet.category}
                        {pet.breed && ` • ${pet.breed}`}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
