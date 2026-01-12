import type { Course, Chapter, Lesson, User, Enrollment, Progress, Certificate, Subscription } from "@prisma/client";

export type { Course, Chapter, Lesson, User, Enrollment, Progress, Certificate, Subscription };

export type Level = "BEGINNER" | "INTERMEDIATE";
export type Plan = "FREE" | "BEGINNER" | "PRO";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING";
export type Role = "USER" | "ADMIN";

export interface CourseWithChapters extends Course {
  chapters: ChapterWithLessons[];
}

export interface ChapterWithLessons extends Chapter {
  lessons: Lesson[];
}

export interface CourseWithProgress extends Course {
  chapters: ChapterWithLessonsAndProgress[];
  _count: {
    enrollments: number;
  };
  enrollment?: Enrollment | null;
  progressPercentage?: number;
}

export interface ChapterWithLessonsAndProgress extends Chapter {
  lessons: LessonWithProgress[];
}

export interface LessonWithProgress extends Lesson {
  progress?: Progress | null;
}

export interface UserWithSubscription extends User {
  subscription: Subscription | null;
}

export interface EnrollmentWithCourse extends Enrollment {
  course: Course;
}

export interface ProgressWithLesson extends Progress {
  lesson: Lesson;
}

export interface CertificateWithCourse extends Certificate {
  course?: Course;
}

export interface CourseCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  level: Level;
  category: string;
  duration: number;
  requiredPlan: Plan;
  _count: {
    enrollments: number;
  };
  progressPercentage?: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  stripePriceId: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  highlighted?: boolean;
  plan: Plan;
}

export interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLessonsCompleted: number;
  totalTimeSpent: number;
  certificates: number;
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  level: Level;
}
