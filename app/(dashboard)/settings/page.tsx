"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Building,
  Bell,
  Shield,
  Key,
  Globe,
  HardDrive,
  Users,
  Mail,
  Lock,
} from "lucide-react"

const teamMembers = [
  { name: "김영수", email: "kim.youngsoo@company.com", role: "Admin", status: "active" },
  { name: "이미영", email: "lee.miyoung@company.com", role: "Reviewer", status: "active" },
  { name: "박지훈", email: "park.jihun@company.com", role: "Reviewer", status: "active" },
  { name: "최수진", email: "choi.sujin@company.com", role: "Viewer", status: "pending" },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          시스템 설정 및 팀 관리
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Organization Settings */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Organization
            </CardTitle>
            <CardDescription>조직 정보 및 기본 설정</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Organization Name</label>
              <Input className="mt-1.5" defaultValue="한국조달서비스" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Industry</label>
              <Select defaultValue="government">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government / Public Sector</SelectItem>
                  <SelectItem value="finance">Finance / Banking</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail / E-commerce</SelectItem>
                  <SelectItem value="telecom">Telecommunications</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Primary Language</label>
              <Select defaultValue="ko">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ko">한국어 (Korean)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              Security
            </CardTitle>
            <CardDescription>보안 및 접근 제어 설정</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">모든 사용자에게 2FA 필수</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Session Timeout</p>
                <p className="text-sm text-muted-foreground">비활성 시 자동 로그아웃</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Audit Logging</p>
                <p className="text-sm text-muted-foreground">모든 활동 기록</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Data Encryption</p>
                <p className="text-sm text-muted-foreground">저장 데이터 암호화</p>
              </div>
              <Badge className="bg-success/20 text-success">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Notifications
            </CardTitle>
            <CardDescription>알림 설정 관리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Training Complete</p>
                <p className="text-sm text-muted-foreground">모델 학습 완료 시 알림</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Review Required</p>
                <p className="text-sm text-muted-foreground">새로운 검토 요청 알림</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Deployment Status</p>
                <p className="text-sm text-muted-foreground">배포 상태 변경 알림</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">주간 요약 리포트</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="h-5 w-5 text-accent" />
              API Keys
            </CardTitle>
            <CardDescription>ASR API 접근 키 관리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Production Key</p>
                  <p className="text-sm text-muted-foreground font-mono">kail_prod_****...7f3a</p>
                </div>
                <Badge className="bg-success/20 text-success">Active</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Created: 2024-01-01</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Development Key</p>
                  <p className="text-sm text-muted-foreground font-mono">kail_dev_****...2b1c</p>
                </div>
                <Badge className="bg-success/20 text-success">Active</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Created: 2024-01-01</p>
            </div>
            <Button variant="outline" className="w-full">
              <Key className="mr-2 h-4 w-4" />
              Generate New Key
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Members
              </CardTitle>
              <CardDescription>팀원 관리 및 권한 설정</CardDescription>
            </div>
            <Button>
              <User className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{member.name}</p>
                      {member.status === "pending" && (
                        <Badge variant="outline" className="text-warning">Pending</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue={member.role.toLowerCase()}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm">
                    Remove
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
