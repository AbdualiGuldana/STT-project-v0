"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  FileAudio,
  FileText,
  Download,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  User,
  Calendar,
} from "lucide-react"

const labelingPackage = {
  id: "PKG-2024-001",
  status: "ready",
  createdAt: "2024-01-13",
  completedAt: "2024-01-15",
  audioFiles: 12,
  totalDuration: "3.5 hours",
  transcriptFiles: 12,
  processedBy: "KAIL Labeling Team",
  reviewedBy: "Human QA Review",
}

const processingSteps = [
  {
    step: 1,
    title: "Sample Audio Received",
    description: "Audio files uploaded and received by KAIL",
    status: "completed",
    completedAt: "2024-01-13 10:30",
  },
  {
    step: 2,
    title: "Automatic Transcription",
    description: "Initial transcription using Soniox ASR",
    status: "completed",
    completedAt: "2024-01-13 14:00",
  },
  {
    step: 3,
    title: "Human Review & Correction",
    description: "Professional transcriptionists review and correct",
    status: "completed",
    completedAt: "2024-01-14 18:00",
  },
  {
    step: 4,
    title: "Quality Assurance",
    description: "Final QA check for accuracy and formatting",
    status: "completed",
    completedAt: "2024-01-15 09:00",
  },
  {
    step: 5,
    title: "Package Ready for Import",
    description: "Labeled transcript package ready for secure import",
    status: "current",
    completedAt: null,
  },
]

const packageContents = [
  { name: "interview_sample_001.json", type: "Transcript", size: "45 KB" },
  { name: "call_recording_002.json", type: "Transcript", size: "32 KB" },
  { name: "meeting_audio_003.json", type: "Transcript", size: "58 KB" },
  { name: "briefing_004.json", type: "Transcript", size: "18 KB" },
  { name: "metadata.json", type: "Metadata", size: "4 KB" },
  { name: "vocabulary_suggestions.json", type: "Vocabulary", size: "12 KB" },
]

export default function KailLabelingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">KAIL Labeling Package</h1>
        <p className="text-muted-foreground">
          KAIL에서 준비한 라벨링 패키지를 확인하고 가져오세요
        </p>
      </div>

      {/* Package Status */}
      <Card className="border-success/30 bg-success/5 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
                <Package className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">Labeling Package Ready</h2>
                  <Badge className="bg-success/20 text-success border-success/30">Ready for Import</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Package ID: {labelingPackage.id}
                </p>
              </div>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Import to Workspace
            </Button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-success/20 bg-card p-4">
              <div className="flex items-center gap-2">
                <FileAudio className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Audio Files</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{labelingPackage.audioFiles} files</p>
            </div>
            <div className="rounded-lg border border-success/20 bg-card p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Total Duration</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{labelingPackage.totalDuration}</p>
            </div>
            <div className="rounded-lg border border-success/20 bg-card p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Transcript Files</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{labelingPackage.transcriptFiles} files</p>
            </div>
            <div className="rounded-lg border border-success/20 bg-card p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Reviewed By</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">Human QA</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Timeline */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Processing Timeline</CardTitle>
          <CardDescription>KAIL 라벨링 처리 과정</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4">
            {processingSteps.map((step, index) => (
              <div key={step.step} className="relative flex gap-4">
                {/* Connector line */}
                {index < processingSteps.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-px bg-border" />
                )}
                
                {/* Step indicator */}
                <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                  step.status === "completed"
                    ? "border-success bg-success/10"
                    : step.status === "current"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted"
                }`}>
                  {step.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : step.status === "current" ? (
                    <span className="text-sm font-semibold text-primary">{step.step}</span>
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground">{step.step}</span>
                  )}
                </div>

                {/* Step content */}
                <div className={`flex-1 pb-6 ${step.status === "current" ? "" : ""}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{step.title}</h3>
                    {step.status === "current" && (
                      <Badge className="bg-primary/10 text-primary border-primary/20">Current</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  {step.completedAt && (
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {step.completedAt}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Package Contents */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Package Contents</CardTitle>
              <CardDescription>패키지에 포함된 파일 목록</CardDescription>
            </div>
            <Badge variant="outline">{packageContents.length} files</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {packageContents.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.type}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{file.size}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Secure Import Process</p>
            <p className="text-sm text-muted-foreground">
              When you import this package, all data will be transferred directly to your secure on-premise workspace. 
              The original audio files and transcripts will be deleted from KAIL servers after successful import.
              No client audio leaves your secure environment after import.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Ready to proceed?</p>
              <p className="text-sm text-muted-foreground">
                Import the labeled package and start reviewing transcripts
              </p>
            </div>
            <Button className="gap-2">
              Continue to Transcript Review
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
