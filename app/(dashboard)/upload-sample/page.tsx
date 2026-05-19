"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileAudio,
  CheckCircle,
  Clock,
  Trash2,
  Play,
  AlertCircle,
} from "lucide-react"

const uploadedFiles = [
  {
    id: "1",
    name: "interview_sample_001.wav",
    size: "24.5 MB",
    duration: "12:34",
    uploadedAt: "2024-01-15 09:30",
    status: "uploaded",
  },
  {
    id: "2",
    name: "call_recording_002.wav",
    size: "18.2 MB",
    duration: "08:45",
    uploadedAt: "2024-01-15 09:28",
    status: "uploaded",
  },
  {
    id: "3",
    name: "meeting_audio_003.mp3",
    size: "32.1 MB",
    duration: "15:22",
    uploadedAt: "2024-01-15 09:25",
    status: "uploaded",
  },
  {
    id: "4",
    name: "briefing_004.wav",
    size: "8.7 MB",
    duration: "04:12",
    uploadedAt: "2024-01-15 09:20",
    status: "processing",
  },
]

export default function UploadSamplePage() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Simulate upload
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setUploadProgress(null), 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Upload Sample Audio</h1>
        <p className="text-muted-foreground">
          라벨링을 위해 비식별화된 샘플 음성을 업로드하세요
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">How it works</p>
            <p className="text-sm text-muted-foreground">
              Upload unlabeled audio samples. KAIL will process them externally using Soniox and human review to prepare labeled transcripts. 
              Once ready, you can import the labeled data into your secure on-premise workspace.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Upload Audio Files</CardTitle>
          <CardDescription>Supported formats: WAV, MP3, FLAC, M4A (max 500MB per file)</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">
              Drag and drop audio files here
            </p>
            <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
            <Button variant="outline" className="mt-4">
              Select Files
            </Button>
          </div>

          {uploadProgress !== null && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="font-medium text-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-1.5" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Uploaded Files</CardTitle>
              <CardDescription>
                {uploadedFiles.length} files ready for KAIL labeling
              </CardDescription>
            </div>
            <Button>
              Submit for Labeling
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileAudio className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.size} • {file.duration} • {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      file.status === "uploaded"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {file.status === "uploaded" ? (
                      <>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Uploaded
                      </>
                    ) : (
                      <>
                        <Clock className="mr-1 h-3 w-3" />
                        Processing
                      </>
                    )}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
