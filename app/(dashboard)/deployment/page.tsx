"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Server,
  Shield,
  Clock,
  CheckCircle,
  ArrowUpCircle,
  RotateCcw,
  Copy,
  Lock,
  Activity,
  AlertCircle,
} from "lucide-react"

const deploymentInfo = {
  status: "running",
  mode: "On-Premise",
  endpoint: "https://asr.internal.yourcompany.local/v1/transcribe",
  version: "v1.2.0",
  lastTrained: "2024-01-15 14:30",
  lastDeployed: "2024-01-15 15:00",
  uptime: "99.97%",
  requestsToday: "12,847",
  avgLatency: "245ms",
}

const deploymentHistory = [
  {
    version: "v1.2.0",
    deployedAt: "2024-01-15 15:00",
    deployedBy: "김영수",
    status: "current",
    notes: "Added political/government vocabulary",
  },
  {
    version: "v1.1.0",
    deployedAt: "2024-01-08 10:30",
    deployedBy: "이미영",
    status: "previous",
    notes: "Initial domain adaptation",
  },
  {
    version: "v1.0.0",
    deployedAt: "2024-01-01 09:00",
    deployedBy: "박지훈",
    status: "previous",
    notes: "Base model deployment",
  },
]

export default function DeploymentPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(deploymentInfo.endpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Deployment</h1>
          <p className="text-muted-foreground">
            ASR 모델 엔드포인트를 관리하고 배포하세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Roll Back
          </Button>
          <Button className="gap-2">
            <ArrowUpCircle className="h-4 w-4" />
            Deploy New Version
          </Button>
        </div>
      </div>

      {/* Security Banner */}
      <Card className="border-success/30 bg-success/5 shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <Shield className="h-5 w-5 text-success shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Secure On-Premise Deployment</p>
            <p className="text-sm text-muted-foreground">
              No client audio leaves your secure environment. All processing happens within your internal network.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Activity className="h-5 w-5 text-success" />
              </div>
              <Badge className="bg-success/10 text-success border-success/20">Running</Badge>
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{deploymentInfo.uptime}</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Server className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{deploymentInfo.requestsToday}</p>
            <p className="text-sm text-muted-foreground">Requests Today</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <Clock className="h-5 w-5 text-chart-2" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{deploymentInfo.avgLatency}</p>
            <p className="text-sm text-muted-foreground">Avg Latency</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <Lock className="h-5 w-5 text-chart-4" />
              </div>
              <Badge variant="outline">{deploymentInfo.mode}</Badge>
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{deploymentInfo.version}</p>
            <p className="text-sm text-muted-foreground">Current Version</p>
          </CardContent>
        </Card>
      </div>

      {/* Private Internal API Endpoint */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Private Internal API Endpoint
          </CardTitle>
          <CardDescription>내부 네트워크 전용 ASR API 엔드포인트</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg bg-muted/50 border border-border p-3 font-mono text-sm text-foreground">
              {deploymentInfo.endpoint}
            </div>
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {copied ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">Model Version</p>
              <p className="mt-1 font-semibold text-foreground">{deploymentInfo.version}</p>
            </div>
            <div className="rounded-lg border border-border p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">Last Trained</p>
              <p className="mt-1 font-semibold text-foreground">{deploymentInfo.lastTrained}</p>
            </div>
            <div className="rounded-lg border border-border p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">Last Deployed</p>
              <p className="mt-1 font-semibold text-foreground">{deploymentInfo.lastDeployed}</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 border border-border p-4">
            <p className="text-sm font-medium text-foreground">Example Request</p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-background border border-border p-3 text-xs text-muted-foreground font-mono">
{`curl -X POST ${deploymentInfo.endpoint} \\
  -H "Authorization: Bearer <INTERNAL_API_KEY>" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio=@recording.wav" \\
  -F "language=ko"`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Version History</CardTitle>
              <CardDescription>배포 버전 히스토리 및 롤백 옵션</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deploymentHistory.map((deployment) => (
              <div
                key={deployment.version}
                className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                  deployment.status === "current"
                    ? "border-primary/30 bg-primary/5"
                    : "border-border hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      deployment.status === "current"
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}
                  >
                    {deployment.status === "current" ? (
                      <Rocket className="h-5 w-5 text-primary" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{deployment.version}</p>
                      {deployment.status === "current" && (
                        <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{deployment.notes}</p>
                    <p className="text-xs text-muted-foreground">
                      Deployed by {deployment.deployedBy} on {deployment.deployedAt}
                    </p>
                  </div>
                </div>
                {deployment.status !== "current" && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Roll Back
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Security Information</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>All API calls are restricted to your internal network</li>
                <li>Audio data is processed locally and never transmitted externally</li>
                <li>API keys are managed through your internal key management system</li>
                <li>All model weights and configurations are stored on-premise</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
