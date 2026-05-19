"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Upload,
  Package,
  FileText,
  BookOpen,
  Settings2,
  MessageSquare,
  Rocket,
  Settings,
  Mic2,
  Shield,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Upload Sample", href: "/upload-sample", icon: Upload },
  { name: "KAIL Labeling", href: "/kail-labeling", icon: Package },
  { name: "Transcript Review", href: "/transcript-review", icon: FileText },
  { name: "Domain Vocabulary", href: "/domain-vocabulary", icon: BookOpen },
  { name: "Model Adaptation", href: "/model-configuration", icon: Settings2 },
  { name: "Feedback Queue", href: "/feedback-queue", icon: MessageSquare },
  { name: "Deployment", href: "/deployment", icon: Rocket },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Mic2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">KAIL</span>
          <span className="text-xs text-muted-foreground">Domain Speech Studio</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <p className="text-xs font-medium text-sidebar-foreground">On-Premise Deployment</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            All data remains in your secure environment
          </p>
        </div>
      </div>
    </aside>
  )
}
