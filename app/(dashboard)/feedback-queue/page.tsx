"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Check,
  X,
  Eye,
  Plus,
  ArrowLeftRight,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const mockFeedbackItems = [
  {
    id: "1",
    fileName: "call_center_001.wav",
    segment: "0:28 - 0:45",
    originalText: "저희가 하도업 업체로 등록을 하려고 하는데, 공동수습 자격 요건이 어떻게 되나요?",
    correctedText: "저희가 하도급 업체로 등록을 하려고 하는데, 공동수급 자격 요건이 어떻게 되나요?",
    reviewer: "김영수",
    correctionCount: 2,
    status: "pending",
    createdAt: "2024-01-15 14:30",
  },
  {
    id: "2",
    fileName: "support_inquiry_002.wav",
    segment: "1:12 - 1:28",
    originalText: "수익계약 진행 시 필요한 서류가 어떻게 되는지 알려주세요.",
    correctedText: "수의계약 진행 시 필요한 서류가 어떻게 되는지 알려주세요.",
    reviewer: "이미영",
    correctionCount: 1,
    status: "approved",
    createdAt: "2024-01-15 13:45",
  },
  {
    id: "3",
    fileName: "procurement_call_003.mp3",
    segment: "2:05 - 2:22",
    originalText: "나라장타에서 입찰 공고를 확인하셨나요?",
    correctedText: "나라장터에서 입찰 공고를 확인하셨나요?",
    reviewer: "박지훈",
    correctionCount: 1,
    status: "pending",
    createdAt: "2024-01-15 12:20",
  },
  {
    id: "4",
    fileName: "bidding_inquiry_004.wav",
    segment: "0:45 - 1:02",
    originalText: "적격심사를 통과하면 낙찰 결정이 되는 건가요?",
    correctedText: "적격심사를 통과하면 낙찰 결정이 되는 건가요?",
    reviewer: "김영수",
    correctionCount: 0,
    status: "approved",
    createdAt: "2024-01-15 11:00",
  },
  {
    id: "5",
    fileName: "vendor_call_006.mp3",
    segment: "3:15 - 3:35",
    originalText: "조달청 등록 절차에 대해서 상세히 안내해 드리겠습니다.",
    correctedText: "조달청 등록 절차에 대해서 상세히 안내해 드리겠습니다.",
    reviewer: "이미영",
    correctionCount: 0,
    status: "in-training",
    createdAt: "2024-01-14 16:30",
  },
]

const stats = [
  { label: "Pending Review", value: 2, icon: Clock, color: "text-warning" },
  { label: "Approved", value: 2, icon: CheckCircle, color: "text-success" },
  { label: "In Training Set", value: 1, icon: Plus, color: "text-primary" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return <Badge className="bg-success/20 text-success border-success/30">Approved</Badge>
    case "pending":
      return <Badge className="bg-warning/20 text-warning border-warning/30">Pending Review</Badge>
    case "in-training":
      return <Badge className="bg-primary/20 text-primary border-primary/30">In Training Set</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function DiffView({ original, corrected }: { original: string; corrected: string }) {
  // Simple diff highlighting - in real app would use proper diff library
  const highlightDiff = (orig: string, corr: string) => {
    const origWords = orig.split("")
    const corrWords = corr.split("")
    const result: { char: string; type: "same" | "removed" | "added" }[] = []

    let i = 0,
      j = 0
    while (i < origWords.length || j < corrWords.length) {
      if (origWords[i] === corrWords[j]) {
        result.push({ char: origWords[i], type: "same" })
        i++
        j++
      } else if (origWords[i] !== corrWords[j]) {
        if (origWords[i]) {
          result.push({ char: origWords[i], type: "removed" })
          i++
        }
        if (corrWords[j]) {
          result.push({ char: corrWords[j], type: "added" })
          j++
        }
      }
    }
    return result
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">Original ASR Output</p>
        <p className="text-sm text-foreground bg-destructive/10 p-3 rounded-lg border border-destructive/20">
          {original}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">Corrected Transcript</p>
        <p className="text-sm text-foreground bg-success/10 p-3 rounded-lg border border-success/20">
          {corrected}
        </p>
      </div>
    </div>
  )
}

export default function FeedbackQueuePage() {
  const [selectedItem, setSelectedItem] = useState<(typeof mockFeedbackItems)[0] | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Feedback Queue</h1>
        <p className="text-muted-foreground">
          교정된 전사 내용을 검토하고 재학습 데이터셋에 추가하세요
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  stat.color === "text-warning" ? "bg-warning/10" :
                  stat.color === "text-success" ? "bg-success/10" : "bg-primary/10"
                }`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback Table */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Review Queue</CardTitle>
          <CardDescription>원본과 교정된 전사 내용을 비교하고 검토하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">File / Segment</TableHead>
                <TableHead className="text-muted-foreground">Reviewer</TableHead>
                <TableHead className="text-muted-foreground">Corrections</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="w-[150px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedbackItems.map((item) => (
                <TableRow key={item.id} className="border-border">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{item.fileName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.segment}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                        <User className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{item.reviewer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.correctionCount > 0 ? (
                      <Badge variant="outline" className="gap-1">
                        <AlertCircle className="h-3 w-3 text-warning" />
                        {item.correctionCount} changes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-success">
                        <CheckCircle className="h-3 w-3" />
                        No changes
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Compare Transcripts</DialogTitle>
                            <DialogDescription>
                              {item.fileName} • {item.segment}
                            </DialogDescription>
                          </DialogHeader>
                          <DiffView
                            original={item.originalText}
                            corrected={item.correctedText}
                          />
                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline">
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                            <Button variant="secondary">
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Add to Training Set
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {item.status === "pending" && (
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
