"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react"

const feedbackStats = {
  totalCorrections: 47,
  approvedCorrections: 35,
  pendingReview: 12,
  improvementThreshold: 50,
}

const recentFeedback = [
  {
    id: "1",
    original: "국민건강보험꽁단",
    corrected: "국민건강보험공단",
    submittedBy: "Kim Youngsoo",
    submittedAt: "2 hours ago",
    status: "approved",
  },
  {
    id: "2",
    original: "조달청 입찰 공고",
    corrected: "조달청 입찰 공고",
    submittedBy: "Lee Miyoung",
    submittedAt: "3 hours ago",
    status: "approved",
  },
  {
    id: "3",
    original: "수의게약 절차",
    corrected: "수의계약 절차",
    submittedBy: "Park Jihoon",
    submittedAt: "Yesterday",
    status: "pending",
  },
  {
    id: "4",
    original: "나라장터 시스템",
    corrected: "나라장터 시스템",
    submittedBy: "Kim Youngsoo",
    submittedAt: "Yesterday",
    status: "pending",
  },
  {
    id: "5",
    original: "법재사법위원회",
    corrected: "법제사법위원회",
    submittedBy: "Lee Miyoung",
    submittedAt: "2 days ago",
    status: "approved",
  },
]

export default function FeedbackLearningPage() {
  const progress = (feedbackStats.approvedCorrections / feedbackStats.improvementThreshold) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Feedback Learning</h1>
        <p className="text-sm text-muted-foreground">
          Continuously improve recognition accuracy with user corrections
        </p>
      </div>

      {/* Progress Card */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Improvement Progress</h2>
                <p className="text-sm text-muted-foreground">
                  Collect {feedbackStats.improvementThreshold} approved corrections to trigger automatic improvement
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-foreground">{feedbackStats.approvedCorrections}</span>
              <span className="text-lg text-muted-foreground"> / {feedbackStats.improvementThreshold}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {feedbackStats.improvementThreshold - feedbackStats.approvedCorrections} more corrections needed
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{feedbackStats.totalCorrections}</p>
                <p className="text-xs text-muted-foreground">Total Corrections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{feedbackStats.approvedCorrections}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{feedbackStats.pendingReview}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">How feedback learning works</p>
              <p className="text-sm text-muted-foreground mt-1">
                When users correct recognition errors, those corrections are collected here. 
                Once you have enough approved corrections, KAIL can use them to improve recognition accuracy 
                for similar phrases in the future.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Corrections */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">Recent Corrections</CardTitle>
              <CardDescription>Review and approve user-submitted corrections</CardDescription>
            </div>
            {feedbackStats.pendingReview > 0 && (
              <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                {feedbackStats.pendingReview} pending
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentFeedback.map((item) => (
              <div
                key={item.id}
                className={`flex items-start justify-between rounded-lg border p-3 ${
                  item.status === "pending" ? "border-warning/30 bg-warning/5" : "border-border"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.status === "approved" ? (
                      <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {item.submittedBy} · {item.submittedAt}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Original</p>
                      <p className="text-sm text-foreground bg-destructive/10 rounded px-2 py-1 inline-block">
                        {item.original}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Corrected</p>
                      <p className="text-sm text-foreground bg-success/10 rounded px-2 py-1 inline-block">
                        {item.corrected}
                      </p>
                    </div>
                  </div>
                </div>
                {item.status === "pending" && (
                  <div className="flex gap-1 ml-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      {progress >= 100 && (
        <Card className="border-success/30 bg-success/5 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Sparkles className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Ready for Improvement</p>
                  <p className="text-xs text-muted-foreground">
                    You have enough corrections to improve recognition accuracy
                  </p>
                </div>
              </div>
              <Button>
                Apply Improvements
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
