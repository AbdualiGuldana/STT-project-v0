"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Check,
  Edit3,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Keyboard,
  RotateCcw,
  FastForward,
  Rewind,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"

const mockTranscriptSegments = [
  {
    id: "1",
    speaker: "Speaker A",
    startTime: 0,
    endTime: 8,
    text: "더불어민주당에서는 이번 국정감사에서 공직선거법 개정안에 대해 논의할 예정입니다.",
    confidence: 0.95,
  },
  {
    id: "2",
    speaker: "Speaker B",
    startTime: 8,
    endTime: 15,
    text: "네, 법제사법위원회에서 다룰 주요 안건 중 하나입니다.",
    confidence: 0.92,
  },
  {
    id: "3",
    speaker: "Speaker A",
    startTime: 15,
    endTime: 25,
    text: "국민의힘 측에서는 이에 대해 어떤 입장을 표명하고 있습니까?",
    confidence: 0.88,
  },
  {
    id: "4",
    speaker: "Speaker B",
    startTime: 25,
    endTime: 38,
    text: "조달청 관련 수의계약 건에 대해서도 추가 질의가 예정되어 있습니다.",
    confidence: 0.72,
  },
  {
    id: "5",
    speaker: "Speaker A",
    startTime: 38,
    endTime: 52,
    text: "나라장터 시스템 개선과 관련된 입찰 절차 변경 사항도 함께 검토될 것으로 보입니다.",
    confidence: 0.68,
  },
]

const mockFiles = [
  { id: "1", name: "interview_sample_001.wav", duration: "12:34", segments: 24, status: "in_review" },
  { id: "2", name: "call_recording_002.wav", duration: "08:45", segments: 18, status: "pending" },
  { id: "3", name: "meeting_audio_003.mp3", duration: "15:22", segments: 32, status: "approved" },
]

// Generate deterministic waveform data
const generateWaveformData = (count: number, seed: number = 42) => {
  const data: number[] = []
  for (let i = 0; i < count; i++) {
    const noise = Math.sin(seed * i * 0.1) * 0.3
    const wave1 = Math.sin(i * 0.05) * 0.4
    const wave2 = Math.sin(i * 0.02) * 0.3
    const value = 0.3 + Math.abs(wave1 + wave2 + noise)
    data.push(Math.min(1, Math.max(0.1, value)))
  }
  return data
}

const waveformData = generateWaveformData(200)

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export default function TranscriptReviewPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<string | null>("4")
  const [playbackRate, setPlaybackRate] = useState(1)
  const waveformRef = useRef<HTMLDivElement>(null)

  const totalDuration = 754 // 12:34 in seconds
  const progress = (currentTime / totalDuration) * 100

  // Find which segment is currently playing
  const currentSegment = mockTranscriptSegments.find(
    (s) => currentTime >= s.startTime && currentTime < s.endTime
  )

  // Auto-scroll to current segment
  useEffect(() => {
    if (currentSegment && !selectedSegment) {
      const element = document.getElementById(`segment-${currentSegment.id}`)
      element?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [currentSegment, selectedSegment])

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current) return
    const rect = waveformRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    setCurrentTime(Math.floor(percentage * totalDuration))
  }

  const jumpToSegment = (segment: typeof mockTranscriptSegments[0]) => {
    setSelectedSegment(segment.id)
    setCurrentTime(segment.startTime)
  }

  const lowConfidenceCount = mockTranscriptSegments.filter((s) => s.confidence < 0.8).length

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Top Bar - File Navigation */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select defaultValue="1">
            <SelectTrigger className="h-9 w-[320px] border-border bg-background">
              <SelectValue placeholder="Select audio file" />
            </SelectTrigger>
            <SelectContent>
              {mockFiles.map((file) => (
                <SelectItem key={file.id} value={file.id}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{file.name}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-xs">{file.duration}</span>
                      {file.status === "approved" && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border-emerald-200">
                          Approved
                        </Badge>
                      )}
                      {file.status === "in_review" && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-200">
                          In Review
                        </Badge>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-normal text-muted-foreground">
            <Keyboard className="mr-1.5 h-3 w-3" />
            Space to play/pause
          </Badge>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Transcript List */}
        <div className="w-[400px] flex-shrink-0 border-r border-border bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Transcript Segments</h2>
              <p className="text-xs text-muted-foreground">{mockTranscriptSegments.length} segments</p>
            </div>
            {lowConfidenceCount > 0 && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <AlertCircle className="mr-1 h-3 w-3" />
                {lowConfidenceCount} needs review
              </Badge>
            )}
          </div>
          <div className="h-[calc(100%-53px)] overflow-y-auto">
            {mockTranscriptSegments.map((segment) => {
              const isActive = currentSegment?.id === segment.id
              const isSelected = selectedSegment === segment.id
              const isLowConfidence = segment.confidence < 0.8

              return (
                <div
                  key={segment.id}
                  id={`segment-${segment.id}`}
                  className={`group relative cursor-pointer border-b border-border px-4 py-3 transition-colors ${
                    isSelected
                      ? "bg-primary/5 border-l-2 border-l-primary"
                      : isActive
                      ? "bg-muted/50 border-l-2 border-l-primary/50"
                      : isLowConfidence
                      ? "bg-amber-50/50 hover:bg-amber-50"
                      : "hover:bg-muted/30"
                  }`}
                  onClick={() => jumpToSegment(segment)}
                >
                  {/* Time indicator line when active */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary animate-pulse" />
                  )}

                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium px-1.5 py-0 ${
                          segment.speaker === "Speaker A"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {segment.speaker}
                      </Badge>
                      {isLowConfidence && (
                        <AlertCircle className="h-3 w-3 text-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {formatTime(segment.startTime)}
                      </span>
                      <div className="h-3 w-px bg-border" />
                      <span
                        className={`text-[10px] font-medium ${
                          segment.confidence >= 0.9
                            ? "text-emerald-600"
                            : segment.confidence >= 0.8
                            ? "text-slate-500"
                            : "text-amber-600"
                        }`}
                      >
                        {Math.round(segment.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {segment.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Center Panel - Waveform & Editor */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Waveform Section */}
          <div className="border-b border-border bg-card px-6 py-4">
            {/* Waveform Visualization */}
            <div
              ref={waveformRef}
              className="relative mb-4 h-24 cursor-pointer rounded-lg bg-slate-50 overflow-hidden"
              onClick={handleWaveformClick}
            >
              {/* Segment regions */}
              {mockTranscriptSegments.map((segment) => {
                const startPercent = (segment.startTime / totalDuration) * 100
                const widthPercent = ((segment.endTime - segment.startTime) / totalDuration) * 100
                const isSelected = selectedSegment === segment.id
                const isLowConfidence = segment.confidence < 0.8

                return (
                  <div
                    key={segment.id}
                    className={`absolute top-0 bottom-0 border-r border-slate-200 transition-colors ${
                      isSelected
                        ? "bg-primary/10"
                        : isLowConfidence
                        ? "bg-amber-100/50"
                        : "bg-transparent hover:bg-slate-100/50"
                    }`}
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                )
              })}

              {/* Waveform bars */}
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {waveformData.map((height, i) => {
                  const barPosition = (i / waveformData.length) * 100
                  const isPast = barPosition < progress

                  return (
                    <div
                      key={i}
                      className={`w-[2px] rounded-full transition-colors duration-75 ${
                        isPast ? "bg-primary" : "bg-slate-300"
                      }`}
                      style={{ height: `${height * 80}%` }}
                    />
                  )
                })}
              </div>

              {/* Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
                style={{ left: `${progress}%` }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
              </div>

              {/* Current time tooltip */}
              <div
                className="absolute -top-6 transform -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-mono text-background"
                style={{ left: `${progress}%` }}
              >
                {formatTime(currentTime)}
              </div>
            </div>

            {/* Timeline markers */}
            <div className="relative mb-4 h-4 text-[10px] font-mono text-muted-foreground">
              {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
                <span
                  key={pos}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${pos * 100}%` }}
                >
                  {formatTime(pos * totalDuration)}
                </span>
              ))}
            </div>

            {/* Transport Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                >
                  <Rewind className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 5))}
                >
                  <FastForward className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 10))}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                {/* Playback speed */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Speed</span>
                  <Select
                    value={playbackRate.toString()}
                    onValueChange={(v) => setPlaybackRate(parseFloat(v))}
                  >
                    <SelectTrigger className="h-8 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2">2x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    className="w-20"
                    onValueChange={(v) => {
                      setVolume(v[0])
                      setIsMuted(false)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedSegment ? (
              <div className="mx-auto max-w-2xl space-y-6">
                {/* Original vs Edit Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Editing Segment #{selectedSegment}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${
                      mockTranscriptSegments.find((s) => s.id === selectedSegment)!.confidence >= 0.8
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {Math.round(
                      mockTranscriptSegments.find((s) => s.id === selectedSegment)!.confidence * 100
                    )}% confidence
                  </Badge>
                </div>

                {/* Original Text */}
                <div className="rounded-lg border border-border bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      ASR Output
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {mockTranscriptSegments.find((s) => s.id === selectedSegment)?.text}
                  </p>
                </div>

                {/* Editor */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Speaker
                      </label>
                      <Select
                        defaultValue={
                          mockTranscriptSegments.find((s) => s.id === selectedSegment)?.speaker
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Speaker A">Speaker A</SelectItem>
                          <SelectItem value="Speaker B">Speaker B</SelectItem>
                          <SelectItem value="Speaker C">Speaker C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-32">
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Time Range
                      </label>
                      <div className="flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm font-mono text-muted-foreground">
                        {formatTime(mockTranscriptSegments.find((s) => s.id === selectedSegment)!.startTime)} - {formatTime(mockTranscriptSegments.find((s) => s.id === selectedSegment)!.endTime)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Corrected Transcript
                    </label>
                    <Textarea
                      className="min-h-[120px] resize-none text-base leading-relaxed focus:ring-2 focus:ring-primary focus:border-primary"
                      defaultValue={
                        mockTranscriptSegments.find((s) => s.id === selectedSegment)?.text
                      }
                      placeholder="Enter corrected transcript..."
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <Button className="flex-1 gap-2">
                    <Check className="h-4 w-4" />
                    Approve as Training Data
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Edit3 className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Request Review
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Edit3 className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 text-sm font-medium text-foreground">No segment selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a transcript segment to review and edit
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - File Info & Actions */}
        <div className="w-[280px] flex-shrink-0 border-l border-border bg-background">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">File Summary</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">File</span>
                <span className="font-medium text-foreground truncate max-w-[160px]">
                  interview_sample_001.wav
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-mono text-foreground">12:34</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Segments</span>
                <span className="text-foreground">{mockTranscriptSegments.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Low Confidence</span>
                <span className="text-amber-600 font-medium">{lowConfidenceCount}</span>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Progress
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reviewed</span>
                  <span className="text-foreground">3 / 5</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-3/5 rounded-full bg-primary" />
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-2">
              <Button className="w-full justify-center gap-2">
                <Check className="h-4 w-4" />
                Approve File
              </Button>
              <Button variant="outline" className="w-full justify-center">
                Skip to Next File
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
