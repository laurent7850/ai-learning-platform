"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string;
  duration: number;
  order: number;
  isFree: boolean;
}

interface Chapter {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  level: string;
  requiredPlan: string;
  published: boolean;
  chapters: Chapter[];
}

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    level: "BEGINNER",
    requiredPlan: "FREE",
    published: false,
  });

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`);
      if (!response.ok) throw new Error("Course not found");
      const data = await response.json();
      setCourse(data);
      setFormData({
        title: data.title,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail || "",
        level: data.level,
        requiredPlan: data.requiredPlan,
        published: data.published,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      router.push("/admin/cours");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update course");

      await fetchCourse();
      alert("Cours mis à jour avec succès");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Erreur lors de la mise à jour du cours");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddChapter = async () => {
    const title = prompt("Titre du chapitre:");
    if (!title) return;

    try {
      const response = await fetch(`/api/admin/courses/${courseId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          order: (course?.chapters.length || 0) + 1,
        }),
      });

      if (!response.ok) throw new Error("Failed to add chapter");
      await fetchCourse();
    } catch (error) {
      console.error("Error adding chapter:", error);
      alert("Erreur lors de l'ajout du chapitre");
    }
  };

  const handleAddLesson = async (chapterId: string, chapterOrder: number) => {
    const title = prompt("Titre de la leçon:");
    if (!title) return;

    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/chapters/${chapterId}/lessons`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            slug: generateSlug(title),
            content: "",
            duration: 5,
            order:
              (course?.chapters.find((c) => c.id === chapterId)?.lessons.length ||
                0) + 1,
            isFree: false,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add lesson");
      await fetchCourse();
    } catch (error) {
      console.error("Error adding lesson:", error);
      alert("Erreur lors de l'ajout de la leçon");
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (!confirm("Supprimer ce chapitre et toutes ses leçons?")) return;

    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/chapters/${chapterId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete chapter");
      await fetchCourse();
    } catch (error) {
      console.error("Error deleting chapter:", error);
      alert("Erreur lors de la suppression du chapitre");
    }
  };

  const handleDeleteLesson = async (chapterId: string, lessonId: string) => {
    if (!confirm("Supprimer cette leçon?")) return;

    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete lesson");
      await fetchCourse();
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("Erreur lors de la suppression de la leçon");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/cours">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">Modifier le cours</p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/cours/${course.slug}`} target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Voir le cours
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du cours *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Image de couverture (URL)</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Niveau</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Débutant</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermédiaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Plan requis</Label>
                <Select
                  value={formData.requiredPlan}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, requiredPlan: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">Gratuit</SelectItem>
                    <SelectItem value="BEGINNER">Débutant</SelectItem>
                    <SelectItem value="PRO">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Publier le cours</Label>
                <p className="text-sm text-muted-foreground">
                  Le cours sera visible sur la plateforme
                </p>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, published: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Chapters & Lessons */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contenu du cours</CardTitle>
          <Button onClick={handleAddChapter}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un chapitre
          </Button>
        </CardHeader>
        <CardContent>
          {course.chapters.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucun chapitre. Ajoutez votre premier chapitre pour commencer.
              </p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {course.chapters
                .sort((a, b) => a.order - b.order)
                .map((chapter) => (
                  <AccordionItem
                    key={chapter.id}
                    value={chapter.id}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{chapter.title}</span>
                        <Badge variant="secondary">
                          {chapter.lessons.length} leçons
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-2 pl-7">
                        {chapter.lessons
                          .sort((a, b) => a.order - b.order)
                          .map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                            >
                              <div className="flex items-center gap-3">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.isFree && (
                                  <Badge variant="success">Gratuit</Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration} min
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                  className="h-8 w-8"
                                >
                                  <Link
                                    href={`/admin/cours/${courseId}/lecons/${lesson.id}`}
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() =>
                                    handleDeleteLesson(chapter.id, lesson.id)
                                  }
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAddLesson(chapter.id, chapter.order)
                            }
                          >
                            <Plus className="mr-2 h-3.5 w-3.5" />
                            Ajouter une leçon
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteChapter(chapter.id)}
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Supprimer le chapitre
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
