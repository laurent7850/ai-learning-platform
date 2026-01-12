import { Suspense } from "react";
import Link from "next/link";
import {
  FileText,
  Image,
  Video,
  Upload,
  FolderOpen,
  MoreHorizontal,
  Eye,
  Trash2,
  Copy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ContentSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <Skeleton className="h-32 w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MediaGrid() {
  // Placeholder for media content
  const mediaItems = [
    {
      id: "1",
      name: "hero-banner.jpg",
      type: "image",
      size: "245 KB",
      url: "/images/hero.jpg",
    },
    {
      id: "2",
      name: "course-thumbnail-1.png",
      type: "image",
      size: "128 KB",
      url: "/images/course-1.png",
    },
    {
      id: "3",
      name: "intro-video.mp4",
      type: "video",
      size: "15.2 MB",
      url: "/videos/intro.mp4",
    },
    {
      id: "4",
      name: "lesson-guide.pdf",
      type: "document",
      size: "1.2 MB",
      url: "/docs/guide.pdf",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return Image;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {mediaItems.map((item) => {
        const Icon = getIcon(item.type);
        return (
          <Card key={item.id} className="group overflow-hidden">
            <div className="relative h-32 bg-muted flex items-center justify-center">
              {item.type === "image" ? (
                <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" />
              ) : (
                <Icon className="h-12 w-12 text-muted-foreground" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="secondary" className="text-xs">
                  {item.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.size}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-lg">
      <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Aucun fichier</h3>
      <p className="text-muted-foreground mb-4">
        Téléchargez vos premiers fichiers pour commencer
      </p>
      <Button>
        <Upload className="mr-2 h-4 w-4" />
        Télécharger des fichiers
      </Button>
    </div>
  );
}

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion du contenu</h1>
          <p className="text-muted-foreground">
            Gérez les médias et ressources de la plateforme
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Télécharger
        </Button>
      </div>

      {/* Storage Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <Image className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Vidéos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <FolderOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">156 MB</p>
                <p className="text-sm text-muted-foreground">Stockage utilisé</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Vidéos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Suspense fallback={<ContentSkeleton />}>
            <MediaGrid />
          </Suspense>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <MediaGrid />
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <MediaGrid />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <MediaGrid />
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuration du stockage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pour une gestion complète des médias, configurez un service de
            stockage cloud comme:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">AWS S3</h4>
              <p className="text-sm text-muted-foreground">
                Stockage scalable et économique pour les fichiers volumineux.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Cloudinary</h4>
              <p className="text-sm text-muted-foreground">
                Optimisation automatique des images et vidéos.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Vercel Blob</h4>
              <p className="text-sm text-muted-foreground">
                Intégration native avec Next.js et Vercel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
