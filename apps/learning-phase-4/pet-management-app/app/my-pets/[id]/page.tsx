"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Navbar } from "@/components/layout/navbar";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { HealthChat } from "@/components/pets/health-chat";

interface Pet {
  id: string;
  name: string;
  category: string;
  breed?: string;
  birthday?: string;
  gender?: string;
  imageUrl?: string;
  createdAt: string;
}

export default function PetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const petId = params.id as string;

  const [pet, setPet] = useState<Pet | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchPet(parsedUser.id);
  }, [petId, router]);

  const fetchPet = async (userId: string) => {
    try {
      const response = await fetch(`/api/pets/${petId}`, {
        headers: {
          "x-user-id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pet");
      }

      const data = await response.json();
      setPet(data.pet);
    } catch (error) {
      console.error("Fetch pet error:", error);
      router.push("/my-pets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": user.id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      router.push("/my-pets");
    } catch (error) {
      console.error("Delete pet error:", error);
      alert("Failed to delete pet");
    } finally {
      setDeleting(false);
    }
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
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

  if (!pet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/my-pets">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Pets
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl">{pet.name}</CardTitle>
              <div className="flex gap-2">
                <Link href={`/my-pets/${pet.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your pet&apos;s profile.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {pet.imageUrl && (
              <div className="flex justify-center">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-lg font-semibold">{pet.category}</p>
              </div>

              {pet.breed && (
                <div>
                  <p className="text-sm text-gray-600">Breed</p>
                  <p className="text-lg font-semibold">{pet.breed}</p>
                </div>
              )}

              {pet.gender && (
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="text-lg font-semibold">{pet.gender}</p>
                </div>
              )}

              {pet.birthday && (
                <div>
                  <p className="text-sm text-gray-600">Birthday</p>
                  <p className="text-lg font-semibold">
                    {format(new Date(pet.birthday), "MMM d, yyyy")}
                  </p>
                </div>
              )}

              {pet.birthday && (
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="text-lg font-semibold">
                    {calculateAge(pet.birthday)}{" "}
                    {calculateAge(pet.birthday) === 1 ? "year" : "years"} old
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600">Added on</p>
                <p className="text-lg font-semibold">
                  {format(new Date(pet.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <HealthChat
        petInfo={{
          name: pet.name,
          category: pet.category,
          breed: pet.breed,
          gender: pet.gender,
          age: pet.birthday ? calculateAge(pet.birthday) : undefined,
        }}
      />
    </div>
  );
}
