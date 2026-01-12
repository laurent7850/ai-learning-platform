"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

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
  createdAt: string;
  chapters: Array<{
    id: string;
    lessons: Array<{
      id: string;
      duration: number;
    }>;
  }>;
  _count: {
    enrollments: number;
  };
}

function CoursesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les cours",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/courses/${courseToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete course");

      toast({
        title: "Cours supprimé",
        description: `Le cours "${courseToDelete.title}" a été supprimé avec succès.`,
      });

      setCourses(courses.filter((c) => c.id !== courseToDelete.id));
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le cours",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCoursesStats = (course: Course) => {
    const totalLessons = course.chapters.reduce(
      (acc, chapter) => acc + chapter.lessons.length,
      0
    );
    const totalDuration = course.chapters.reduce(
      (acc, chapter) =>
        acc + chapter.lessons.reduce((a, l) => a + l.duration, 0),
      0
    );
    return {
      totalLessons,
      totalDuration,
      totalChapters: course.chapters.length,
      enrollmentCount: course._count.enrollments,
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion des cours</h1>
          <p className="text-muted-foreground">
            Créez et gérez les cours de la plateforme
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => { setIsLoading(true); fetchCourses(); }}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/admin/cours/nouveau">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau cours
            </Link>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un cours..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredCourses.length} cours
        </div>
      </div>

      {isLoading ? (
        <CoursesSkeleton />
      ) : filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "Aucun résultat" : "Aucun cours"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Essayez avec d'autres termes de recherche"
                : "Créez votre premier cours pour commencer"}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/admin/cours/nouveau">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un cours
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => {
            const stats = getCoursesStats(course);
            return (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Thumbnail */}
                    <div className="h-16 w-24 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold truncate">{course.title}</h3>
                        <Badge
                          variant={course.published ? "default" : "secondary"}
                          className="shrink-0"
                        >
                          {course.published ? "Publié" : "Brouillon"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {stats.totalChapters} chapitres, {stats.totalLessons} leçons
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {stats.enrollmentCount} inscrits
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {Math.round(stats.totalDuration / 60)}h {stats.totalDuration % 60}min
                        </span>
                      </div>
                    </div>

                    {/* Level & Plan */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={course.level === "BEGINNER" ? "outline" : "secondary"}>
                        {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
                      </Badge>
                      <Badge variant="outline">
                        {course.requiredPlan === "FREE"
                          ? "Gratuit"
                          : course.requiredPlan === "BEGINNER"
                          ? "Débutant"
                          : "Pro"}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="icon" asChild title="Voir">
                        <Link href={`/cours/${course.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Modifier">
                        <Link href={`/admin/cours/${course.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        title="Supprimer"
                        onClick={() => handleDeleteClick(course)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce cours ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le cours "{courseToDelete?.title}" sera
              définitivement supprimé avec tous ses chapitres, leçons et inscriptions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
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
