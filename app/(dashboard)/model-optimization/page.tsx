"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  CheckCircle2,
  Clock,
  FileAudio,
  BookOpen,
  MessageSquare,
  ArrowRight,
  Info,
  Rocket,
} from "lucide-react"

const optimizationStatus = {
  status: "ready",
  lastOptimized: "Jan 15, 2024",
  recognitionScore: 87,
  previousScore: 72,
}

const requirements = [
  {
    label: "Sample Audio Uploaded",
    count: "48 files",
    required: "10+ files",
    status: "complete",
    icon: FileAudio,
  },
  {
    label: "Transcripts Reviewed",
    count: "25 reviewed",
    required: "20+ reviewed",
    status: "complete",
    icon: CheckCircle2,
  },
  {
    label: "Vocabulary Added",
    count: "156 terms",
    required: "50+ terms",
    status: "complete",
    icon: BookOpen,
  },
  {
    label: "Feedback Collected",
    count: "12 corrections",
    required: "Optional",
    status: "complete",
    icon: MessageSquare,
  },
]

const optimizationHistory = [
  {
    version: "v1.2",
    date: "Jan 15, 2024",
    improvement: "+15%",
    details: "Added 156 vocabulary terms",
  },
  {
    version: "v1.1",
    date: "Jan 8, 2024",
    improvement: "+8%",
    details: "Initial customization with 25 reviewed transcripts",
  },
  {
    version: "v1.0",
    date: "Jan 1, 2024",
    improvement: "Baseline",
    details: "Initial deployment",
  },
]

export default function ModelOptimizationPage() {
  const allRequirementsMet = requirements.every((r) => r.status === "complete")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Model Optimization</h1>
        <p className="text-sm text-muted-foreground">
          Customize speech recognition for your organization
        </p>
      </div>

      {/* Current Status */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Recognition Accuracy</h2>
                <p className="text-sm text-muted-foreground">
                  How well the system recognizes your organization&apos;s speech
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{optimizationStatus.recognitionScore}%</span>
                <Badge variant="outline" className="text-xs bg-success/5 text-success border-success/20">
                  +{optimizationStatus.recognitionScore - optimizationStatus.previousScore}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Previously {optimizationStatus.previousScore}%
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={optimizationStatus.recognitionScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Optimization Requirements</CardTitle>
          <CardDescription>Complete these steps to optimize recognition for your domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {requirements.map((req) => (
              <div
                key={req.label}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  req.status === "complete"
                    ? "border-success/30 bg-success/5"
                    : "border-border"
                }`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  req.status === "complete" ? "bg-success/10" : "bg-muted"
                }`}>
                  {req.status === "complete" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <req.icon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{req.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {req.count} <span className="text-muted-foreground/70">({req.required})</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-4 border-t border-border">
            {allRequirementsMet ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  All requirements met. Ready to optimize.
                </div>
                <Button>
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  Start Optimization
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                Complete all requirements to enable optimization.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">How optimization works</p>
              <p className="text-sm text-muted-foreground mt-1">
                KAIL uses your reviewed transcripts and vocabulary to customize the speech recognition model 
                for your organization&apos;s specific terminology and speaking patterns. The more data you provide, 
                the better the recognition accuracy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization History */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Optimization History</CardTitle>
          <CardDescription>Previous optimizations and improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {optimizationHistory.map((item, index) => (
              <div
                key={item.version}
                className={`flex items-center justify-between rounded-md border p-3 ${
                  index === 0 ? "border-primary/30 bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    index === 0 ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {index === 0 ? (
                      <Sparkles className="h-4 w-4 text-primary" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-foreground">{item.version}</p>
                      {index === 0 && (
                        <Badge variant="outline" className="text-[9px] bg-success/5 text-success border-success/20">Current</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.details}</p>
                    <p className="text-[9px] text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    item.improvement !== "Baseline" 
                      ? "bg-success/5 text-success border-success/20" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.improvement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Rocket className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Deploy Optimized Model</p>
                <p className="text-xs text-muted-foreground">
                  Make your customized speech recognition available for use
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Go to Deployment
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
