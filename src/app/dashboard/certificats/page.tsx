import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, Download, ExternalLink, BookOpen } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

async function getUserCertificates(userId: string) {
  const certificates = await db.certificate.findMany({
    where: { userId },
    orderBy: { issuedAt: "desc" },
  });

  // Get course details for each certificate
  const courseIds = [...new Set(certificates.map((c) => c.courseId))];
  const courses = await db.course.findMany({
    where: { id: { in: courseIds } },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      level: true,
    },
  });

  const courseMap = new Map(courses.map((c) => [c.id, c]));

  return certificates.map((cert) => ({
    ...cert,
    course: courseMap.get(cert.courseId),
  }));
}

function CertificateSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

async function CertificatesContent() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/connexion");
  }

  const certificates = await getUserCertificates(session.user.id);

  if (certificates.length === 0) {
    return (
      <div className="text-center py-12 rounded-xl border bg-muted/30">
        <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Aucun certificat</h3>
        <p className="text-muted-foreground mb-4">
          Terminez un cours pour obtenir votre premier certificat.
        </p>
        <Button asChild>
          <Link href="/dashboard/mes-cours">
            <BookOpen className="mr-2 h-4 w-4" />
            Voir mes cours
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {certificates.map((cert) => (
        <Card key={cert.id}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Award className="h-6 w-6" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  {cert.course?.title || "Cours"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Délivré le {formatDate(cert.issuedAt)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ID: {cert.uniqueId}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={`/certificat/${cert.uniqueId}`}
                    target="_blank"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Mes certificats</h1>
        <p className="text-muted-foreground">
          Téléchargez et partagez vos certificats de complétion
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CertificateSkeleton key={i} />
            ))}
          </div>
        }
      >
        <CertificatesContent />
      </Suspense>
    </div>
  );
}
