"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Link2,
  Image,
  Heading1,
  Heading2,
  Quote,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { LessonContent } from "@/components/courses/lesson-content";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string;
  videoUrl: string | null;
  duration: number;
  order: number;
  isFree: boolean;
  chapter: {
    id: string;
    title: string;
    course: {
      id: string;
      title: string;
      slug: string;
    };
  };
}

const markdownTools = [
  { icon: Heading1, label: "Titre H1", prefix: "# ", suffix: "" },
  { icon: Heading2, label: "Titre H2", prefix: "## ", suffix: "" },
  { icon: Bold, label: "Gras", prefix: "**", suffix: "**" },
  { icon: Italic, label: "Italique", prefix: "_", suffix: "_" },
  { icon: List, label: "Liste", prefix: "- ", suffix: "" },
  { icon: ListOrdered, label: "Liste numérotée", prefix: "1. ", suffix: "" },
  { icon: Quote, label: "Citation", prefix: "> ", suffix: "" },
  { icon: Code, label: "Code inline", prefix: "`", suffix: "`" },
  { icon: FileCode, label: "Bloc de code", prefix: "```\n", suffix: "\n```" },
  { icon: Link2, label: "Lien", prefix: "[", suffix: "](url)" },
  { icon: Image, label: "Image", prefix: "![alt](", suffix: ")" },
];

export default function EditLessonPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const lessonId = params.lessonId as string;
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    videoUrl: "",
    duration: 5,
    isFree: false,
  });
  const [activeTab, setActiveTab] = useState("edit");

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const response = await fetch(`/api/admin/lessons/${lessonId}`);
      if (!response.ok) throw new Error("Lesson not found");
      const data = await response.json();
      setLesson(data);
      setFormData({
        title: data.title,
        slug: data.slug,
        content: data.content || "",
        videoUrl: data.videoUrl || "",
        duration: data.duration,
        isFree: data.isFree,
      });
    } catch (error) {
      console.error("Error fetching lesson:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la leçon",
        variant: "destructive",
      });
      router.push(`/admin/cours/${courseId}`);
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

  const insertMarkdown = (prefix: string, suffix: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newText =
      formData.content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      formData.content.substring(end);

    setFormData((prev) => ({ ...prev, content: newText }));

    // Set cursor position after insert
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update lesson");

      await fetchLesson();
      toast({
        title: "Leçon enregistrée",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la leçon",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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

  if (!lesson) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/cours/${courseId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link
                href={`/admin/cours/${courseId}`}
                className="hover:underline"
              >
                {lesson.chapter.course.title}
              </Link>
              <span>/</span>
              <span>{lesson.chapter.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">{lesson.title}</h1>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link
            href={`/dashboard/cours/${lesson.chapter.course.slug}/${lesson.slug}`}
            target="_blank"
          >
            <Eye className="mr-2 h-4 w-4" />
            Voir la leçon
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la leçon</CardTitle>
            <CardDescription>
              Configurez les métadonnées de la leçon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la leçon *</Label>
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
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: parseInt(e.target.value) || 5,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">URL de la vidéo (optionnel)</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Leçon gratuite</Label>
                <p className="text-sm text-muted-foreground">
                  Cette leçon sera accessible sans abonnement
                </p>
              </div>
              <Switch
                checked={formData.isFree}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isFree: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu de la leçon</CardTitle>
            <CardDescription>
              Rédigez le contenu en Markdown avec prévisualisation en temps réel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="edit">Édition</TabsTrigger>
                  <TabsTrigger value="preview">Prévisualisation</TabsTrigger>
                  <TabsTrigger value="split">Côte à côte</TabsTrigger>
                </TabsList>

                {/* Toolbar */}
                <TooltipProvider>
                  <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
                    {markdownTools.map((tool, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => insertMarkdown(tool.prefix, tool.suffix)}
                          >
                            <tool.icon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tool.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>

              <TabsContent value="edit" className="mt-0">
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={25}
                  className="font-mono text-sm resize-none"
                  placeholder="# Titre de la leçon

Écrivez votre contenu en Markdown...

## Sous-titre

Votre texte ici avec **gras** et _italique_.

### Liste
- Point 1
- Point 2
- Point 3

### Code
```javascript
const hello = 'world';
```"
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <div className="min-h-[500px] border rounded-lg p-6 bg-background overflow-auto">
                  {formData.content ? (
                    <LessonContent content={formData.content} />
                  ) : (
                    <p className="text-muted-foreground text-center py-12">
                      Commencez à écrire pour voir la prévisualisation
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="split" className="mt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">
                      Markdown
                    </Label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, content: e.target.value }))
                      }
                      rows={20}
                      className="font-mono text-sm resize-none"
                      placeholder="# Votre contenu en Markdown..."
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">
                      Prévisualisation
                    </Label>
                    <div className="min-h-[430px] border rounded-lg p-4 bg-background overflow-auto">
                      {formData.content ? (
                        <LessonContent content={formData.content} />
                      ) : (
                        <p className="text-muted-foreground text-center py-12">
                          Prévisualisation
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-muted-foreground mt-4">
              Syntaxe Markdown supportée : titres (#), gras (**), italique (_), listes (-), code (`), liens, images
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" asChild>
            <Link href={`/admin/cours/${courseId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au cours
            </Link>
          </Button>
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
    </div>
  );
}
