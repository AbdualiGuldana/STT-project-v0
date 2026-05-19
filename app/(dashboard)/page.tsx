"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Package,
  Download,
  FileText,
  BookOpen,
  Brain,
  Rocket,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  FileAudio,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const onboardingSteps = [
  {
    step: 1,
    title: "Upload Sample Audio",
    titleKo: "샘플 음성 업로드",
    description: "Upload unlabeled audio samples for initial processing",
    icon: Upload,
    status: "completed" as const,
    href: "/upload-sample",
  },
  {
    step: 2,
    title: "KAIL Labeling",
    titleKo: "KAIL 라벨링",
    description: "KAIL prepares labeled transcripts using Soniox/human review",
    icon: Package,
    status: "completed" as const,
    href: "/kail-labeling",
  },
  {
    step: 3,
    title: "Import Labeled Sample",
    titleKo: "라벨 데이터 가져오기",
    description: "Import labeled samples into your secure on-premise workspace",
    icon: Download,
    status: "completed" as const,
    href: "/kail-labeling",
  },
  {
    step: 4,
    title: "Review Transcripts",
    titleKo: "전사 검토",
    description: "Review and correct transcripts with human-in-the-loop",
    icon: FileText,
    status: "in-progress" as const,
    href: "/transcript-review",
  },
  {
    step: 5,
    title: "Add Domain Vocabulary",
    titleKo: "도메인 용어 추가",
    description: "Add organization-specific terms and vocabulary",
    icon: BookOpen,
    status: "pending" as const,
    href: "/domain-vocabulary",
  },
  {
    step: 6,
    title: "Adapt Model",
    titleKo: "모델 적응",
    description: "Train the ASR model on your domain-specific data",
    icon: Brain,
    status: "pending" as const,
    href: "/model-configuration",
  },
  {
    step: 7,
    title: "Deploy On-Premise",
    titleKo: "온프레미스 배포",
    description: "Deploy the adapted ASR endpoint to your secure environment",
    icon: Rocket,
    status: "pending" as const,
    href: "/deployment",
  },
  {
    step: 8,
    title: "Collect Feedback",
    titleKo: "피드백 수집",
    description: "Continue collecting corrections for future retraining",
    icon: MessageSquare,
    status: "pending" as const,
    href: "/feedback-queue",
  },
]

const workflowCards = [
  {
    label: "Sample Audio Uploaded",
    labelKo: "업로드된 샘플 음성",
    value: "12 files",
    subtext: "3.5 hours total",
    icon: FileAudio,
    status: "success",
  },
  {
    label: "Labeled Sample Ready",
    labelKo: "라벨링 완료",
    value: "Ready",
    subtext: "Last updated 2 hours ago",
    icon: Package,
    status: "success",
  },
  {
    label: "Transcripts Awaiting Review",
    labelKo: "검토 대기 전사",
    value: "8 files",
    subtext: "4 completed today",
    icon: Clock,
    status: "warning",
  },
  {
    label: "Vocabulary Terms Added",
    labelKo: "추가된 도메인 용어",
    value: "156 terms",
    subtext: "+28 this week",
    icon: BookOpen,
    status: "info",
  },
  {
    label: "Model Adaptation",
    labelKo: "모델 적응 상태",
    value: "Ready",
    subtext: "Awaiting vocabulary setup",
    icon: Brain,
    status: "pending",
  },
  {
    label: "Deployment Status",
    labelKo: "배포 상태",
    value: "Not Deployed",
    subtext: "On-premise endpoint pending",
    icon: Rocket,
    status: "pending",
  },
]

function getStepStatusStyles(status: "completed" | "in-progress" | "pending") {
  switch (status) {
    case "completed":
      return {
        badge: "bg-success/10 text-success border-success/20",
        icon: "bg-success/10 text-success",
        ring: "",
      }
    case "in-progress":
      return {
        badge: "bg-primary/10 text-primary border-primary/20",
        icon: "bg-primary/10 text-primary",
        ring: "ring-1 ring-primary/30",
      }
    case "pending":
      return {
        badge: "bg-muted text-muted-foreground border-border",
        icon: "bg-muted text-muted-foreground",
        ring: "",
      }
  }
}

function getCardStatusStyles(status: string) {
  switch (status) {
    case "success":
      return "border-success/30 bg-success/5"
    case "warning":
      return "border-warning/30 bg-warning/5"
    case "info":
      return "border-primary/30 bg-primary/5"
    default:
      return "border-border"
  }
}

export default function OverviewPage() {
  const completedSteps = onboardingSteps.filter((s) => s.status === "completed").length
  const progress = (completedSteps / onboardingSteps.length) * 100

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Client Onboarding</h1>
        <p className="text-muted-foreground">
          도메인 특화 ASR 모델 구축을 위한 온보딩 진행 상황
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Onboarding Progress</CardTitle>
              <CardDescription>
                {completedSteps} of {onboardingSteps.length} steps completed
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Workflow Status Cards */}
      <div>
        <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">Workflow Status</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflowCards.map((card) => (
            <Card key={card.label} className={`border bg-card shadow-sm ${getCardStatusStyles(card.status)}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    card.status === "success" ? "bg-success/10" :
                    card.status === "warning" ? "bg-warning/10" :
                    card.status === "info" ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <card.icon className={`h-5 w-5 ${
                      card.status === "success" ? "text-success" :
                      card.status === "warning" ? "text-warning" :
                      card.status === "info" ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  {card.status === "success" && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-xl font-semibold text-foreground">{card.value}</p>
                  <p className="text-sm font-medium text-foreground">{card.label}</p>
                  <p className="text-xs text-muted-foreground">{card.subtext}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Onboarding Timeline */}
      <div>
        <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">Setup Timeline</h2>
        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-border hidden lg:block" />
          
          <div className="space-y-3">
            {onboardingSteps.map((step) => {
              const styles = getStepStatusStyles(step.status)
              return (
                <Card
                  key={step.step}
                  className={`border bg-card shadow-sm transition-all hover:shadow-md ${styles.ring}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
                        {step.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground">Step {step.step}</span>
                          <Badge variant="outline" className={`text-xs ${styles.badge}`}>
                            {step.status === "completed" ? "완료" : step.status === "in-progress" ? "진행 중" : "대기"}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <Link href={step.href}>
                        <Button
                          variant={step.status === "in-progress" ? "default" : "outline"}
                          size="sm"
                        >
                          {step.status === "completed" ? "View" : step.status === "in-progress" ? "Continue" : "Start"}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
