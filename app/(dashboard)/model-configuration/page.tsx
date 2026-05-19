"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Play, Brain, Clock, Cpu, Database, BookOpen, Sparkles, ArrowRight, CheckCircle } from "lucide-react"

const baseModels = [
  { id: "qwen3-asr-1.7b", name: "Qwen3-ASR-1.7B", params: "1.7B", recommended: true },
  { id: "qwen3-asr-0.5b", name: "Qwen3-ASR-0.5B", params: "0.5B", recommended: false },
]

const vocabularySets = [
  { id: "political", name: "정치/정부 용어", nameEn: "Political / Government", terms: 89, selected: true },
  { id: "procurement", name: "조달/입찰 용어", nameEn: "Procurement", terms: 67, selected: true },
  { id: "region", name: "지역명", nameEn: "Regions", terms: 45, selected: false },
]

const datasets = [
  { id: "kail-labeled", name: "KAIL Labeled Package (Jan 2024)", files: 12, hours: 3.5, selected: true },
  { id: "approved-jan", name: "Approved Corrections (Jan 2024)", files: 8, hours: 2.1, selected: true },
]

const feedbackDatasets = [
  { id: "feedback-jan", name: "Feedback Queue (Jan 2024)", files: 24, hours: 4.2, selected: false },
]

export default function ModelConfigurationPage() {
  const [selectedModel, setSelectedModel] = useState("qwen3-asr-1.7b")
  const [clientDomain, setClientDomain] = useState("political-broadcast")
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)

  const handleStartTraining = () => {
    setIsTraining(true)
    setTrainingProgress(0)
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + 2
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Model Adaptation</h1>
        <p className="text-muted-foreground">
          도메인 적응 모델을 구성하고 학습을 시작하세요
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Base ASR Model */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Base ASR Model
            </CardTitle>
            <CardDescription>기반 ASR 모델을 선택하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {baseModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center gap-2">
                      {model.name}
                      <Badge variant="outline" className="ml-2">
                        {model.params}
                      </Badge>
                      {model.recommended && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">Recommended</Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="rounded-lg border border-border p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Selected Model</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">Ready</Badge>
              </div>
              <p className="mt-2 font-semibold text-foreground">
                {baseModels.find((m) => m.id === selectedModel)?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Parameters: {baseModels.find((m) => m.id === selectedModel)?.params}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Client Domain */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-chart-4" />
              Client Domain
            </CardTitle>
            <CardDescription>클라이언트 도메인을 선택하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={clientDomain} onValueChange={setClientDomain}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="political-broadcast">정치/방송 (Political Broadcast)</SelectItem>
                <SelectItem value="call-center">콜센터 (Call Center)</SelectItem>
                <SelectItem value="legal">법률/계약 (Legal)</SelectItem>
                <SelectItem value="medical">의료 (Medical)</SelectItem>
                <SelectItem value="custom">커스텀 (Custom)</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-lg border border-border p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground">Domain Profile</p>
              <p className="mt-1 font-semibold text-foreground">정치/방송</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Optimized for political broadcasts, government proceedings, and public sector communications
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Labeled Sample Dataset */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-success" />
              Labeled Sample Dataset
            </CardTitle>
            <CardDescription>학습에 사용할 라벨링된 전사 데이터</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox defaultChecked={dataset.selected} />
                  <div>
                    <p className="font-medium text-foreground">{dataset.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {dataset.files} files / {dataset.hours} hours
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vocabulary Set */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-chart-2" />
              Vocabulary Set
            </CardTitle>
            <CardDescription>학습에 사용할 도메인 용어 세트</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {vocabularySets.map((set) => (
              <div
                key={set.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox defaultChecked={set.selected} />
                  <div>
                    <p className="font-medium text-foreground">{set.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {set.terms} terms
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feedback Dataset */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-chart-5" />
              Feedback Dataset
            </CardTitle>
            <CardDescription>피드백 큐에서 수집된 교정 데이터 (선택)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedbackDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox defaultChecked={dataset.selected} />
                  <div>
                    <p className="font-medium text-foreground">{dataset.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {dataset.files} corrections / {dataset.hours} hours
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Include user corrections to improve future model performance
            </p>
          </CardContent>
        </Card>

        {/* Start Adaptation */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-warning" />
              Start Adaptation
            </CardTitle>
            <CardDescription>모델 적응 학습 시작</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isTraining ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} className="h-2" />
                <div className="rounded-lg border border-border p-4 bg-muted/30">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 animate-pulse text-primary" />
                    <span>Estimated time remaining: ~{Math.ceil((100 - trainingProgress) / 10)} min</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {trainingProgress < 30
                      ? "Loading vocabulary and preparing data..."
                      : trainingProgress < 70
                      ? "Training model on domain data..."
                      : "Validating and optimizing model..."}
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-6 text-center bg-muted/30">
                <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium text-foreground">Ready to Adapt</p>
                <p className="text-xs text-muted-foreground">
                  Configure settings above and start adaptation
                </p>
              </div>
            )}
            <Button
              className="w-full gap-2"
              onClick={handleStartTraining}
              disabled={isTraining}
            >
              {isTraining ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Adaptation in Progress...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Adaptation
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Summary */}
      <Card className="border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Base Model</p>
                <p className="font-medium text-foreground">Qwen3-ASR-1.7B</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Domain</p>
                <p className="font-medium text-foreground">정치/방송</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Training Data</p>
                <p className="font-medium text-foreground">20 files / 5.6 hours</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vocabulary</p>
                <p className="font-medium text-foreground">156 terms</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
