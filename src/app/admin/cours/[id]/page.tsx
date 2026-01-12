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
  Edit,
  Eye,
  BookOpen,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Intelligence Artificielle",
  "ChatGPT",
  "Prompting",
  "Automatisation",
  "Productivité",
  "Image IA",
  "Audio IA",
  "Vidéo IA",
  "Agents IA",
  "Business",
];

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
  category: string;
  requiredPlan: string;
  published: boolean;
  chapters: Chapter[];
}

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    level: "BEGINNER",
    category: "Intelligence Artificielle",
    requiredPlan: "FREE",
    published: false,
  });

  // Dialog states
  const [chapterDialogOpen, setChapterDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [deleteChapterDialogOpen, setDeleteChapterDialogOpen] = useState(false);
  const [deleteLessonDialogOpen, setDeleteLessonDialogOpen] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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
        category: data.category || "Intelligence Artificielle",
        requiredPlan: data.requiredPlan,
        published: data.published,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le cours",
        variant: "destructive",
      });
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
      toast({
        title: "Cours mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Error updating course:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le cours",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddChapter = async () => {
    if (!newChapterTitle.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch(`/api/admin/courses/${courseId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newChapterTitle,
          order: (course?.chapters.length || 0) + 1,
        }),
      });

      if (!response.ok) throw new Error("Failed to add chapter");

      await fetchCourse();
      toast({
        title: "Chapitre créé",
        description: `Le chapitre "${newChapterTitle}" a été ajouté.`,
      });
      setNewChapterTitle("");
      setChapterDialogOpen(false);
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le chapitre",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddLesson = async () => {
    if (!newLessonTitle.trim() || !selectedChapterId) return;

    setIsCreating(true);
    try {
      const chapter = course?.chapters.find((c) => c.id === selectedChapterId);
      const response = await fetch(
        `/api/admin/courses/${courseId}/chapters/${selectedChapterId}/lessons`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newLessonTitle,
            slug: generateSlug(newLessonTitle),
            content: "",
            duration: 5,
            order: (chapter?.lessons.length || 0) + 1,
            isFree: false,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add lesson");

      await fetchCourse();
      toast({
        title: "Leçon créée",
        description: `La leçon "${newLessonTitle}" a été ajoutée.`,
      });
      setNewLessonTitle("");
      setLessonDialogOpen(false);
      setSelectedChapterId(null);
    } catch (error) {
      console.error("Error adding lesson:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la leçon",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteChapter = async () => {
    if (!selectedChapterId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/chapters/${selectedChapterId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete chapter");

      await fetchCourse();
      toast({
        title: "Chapitre supprimé",
        description: "Le chapitre et ses leçons ont été supprimés.",
      });
      setDeleteChapterDialogOpen(false);
      setSelectedChapterId(null);
    } catch (error) {
      console.error("Error deleting chapter:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le chapitre",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteLesson = async () => {
    if (!selectedChapterId || !selectedLessonId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/courses/${courseId}/chapters/${selectedChapterId}/lessons/${selectedLessonId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete lesson");

      await fetchCourse();
      toast({
        title: "Leçon supprimée",
        description: "La leçon a été supprimée.",
      });
      setDeleteLessonDialogOpen(false);
      setSelectedChapterId(null);
      setSelectedLessonId(null);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la leçon",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <CardDescription>
              Les informations de base qui apparaîtront sur la page du cours
            </CardDescription>
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
              <p className="text-xs text-muted-foreground">
                URL: /cours/{formData.slug || "..."}
              </p>
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommandé: 1280x720 pixels (16:9)
                  </p>
                </div>
                <div className="h-20 w-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  {formData.thumbnail ? (
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Définissez le niveau, la catégorie et les conditions d'accès
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  <SelectItem value="FREE">Gratuit - Accessible à tous</SelectItem>
                  <SelectItem value="BEGINNER">Débutant (9,99€/mois)</SelectItem>
                  <SelectItem value="PRO">Pro (19,99€/mois)</SelectItem>
                </SelectContent>
              </Select>
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
          <div>
            <CardTitle>Contenu du cours</CardTitle>
            <CardDescription>
              Gérez les chapitres et les leçons de votre cours
            </CardDescription>
          </div>
          <Button onClick={() => setChapterDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un chapitre
          </Button>
        </CardHeader>
        <CardContent>
          {course.chapters.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun chapitre</h3>
              <p className="text-muted-foreground mb-4">
                Ajoutez votre premier chapitre pour structurer le cours
              </p>
              <Button onClick={() => setChapterDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un chapitre
              </Button>
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
                          {chapter.lessons.length} leçon{chapter.lessons.length > 1 ? "s" : ""}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-2 pl-7">
                        {chapter.lessons.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-4 text-center">
                            Aucune leçon dans ce chapitre
                          </p>
                        ) : (
                          chapter.lessons
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
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                      Gratuit
                                    </Badge>
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
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => {
                                      setSelectedChapterId(chapter.id);
                                      setSelectedLessonId(lesson.id);
                                      setDeleteLessonDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                            ))
                        )}
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedChapterId(chapter.id);
                              setLessonDialogOpen(true);
                            }}
                          >
                            <Plus className="mr-2 h-3.5 w-3.5" />
                            Ajouter une leçon
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setSelectedChapterId(chapter.id);
                              setDeleteChapterDialogOpen(true);
                            }}
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

      {/* Add Chapter Dialog */}
      <Dialog open={chapterDialogOpen} onOpenChange={setChapterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un chapitre</DialogTitle>
            <DialogDescription>
              Les chapitres permettent d'organiser les leçons de votre cours.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="chapterTitle">Titre du chapitre</Label>
              <Input
                id="chapterTitle"
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                placeholder="Ex: Introduction à l'IA"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChapterDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddChapter} disabled={isCreating || !newChapterTitle.trim()}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer le chapitre"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une leçon</DialogTitle>
            <DialogDescription>
              Créez une nouvelle leçon dans ce chapitre.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lessonTitle">Titre de la leçon</Label>
              <Input
                id="lessonTitle"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="Ex: Qu'est-ce que ChatGPT ?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLessonDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddLesson} disabled={isCreating || !newLessonTitle.trim()}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer la leçon"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Chapter Dialog */}
      <AlertDialog open={deleteChapterDialogOpen} onOpenChange={setDeleteChapterDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce chapitre ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le chapitre et toutes ses leçons seront
              définitivement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChapter}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Lesson Dialog */}
      <AlertDialog open={deleteLessonDialogOpen} onOpenChange={setDeleteLessonDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette leçon ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La leçon sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLesson}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
