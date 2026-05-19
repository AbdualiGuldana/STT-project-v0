"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Upload, X, Search, Building2, User, MapPin, Scale, Package, Hash } from "lucide-react"

const categories = [
  { id: "org", name: "Organization Names", nameKo: "조직명", icon: Building2, color: "bg-primary/10 text-primary" },
  { id: "person", name: "People Names", nameKo: "인명", icon: User, color: "bg-chart-2/10 text-chart-2" },
  { id: "region", name: "District / Region Names", nameKo: "지역명", icon: MapPin, color: "bg-chart-3/10 text-chart-3" },
  { id: "legal", name: "Policy / Legal Terms", nameKo: "정책/법률 용어", icon: Scale, color: "bg-chart-4/10 text-chart-4" },
  { id: "product", name: "Product / Service Names", nameKo: "제품/서비스명", icon: Package, color: "bg-chart-5/10 text-chart-5" },
  { id: "acronym", name: "Acronyms", nameKo: "약어", icon: Hash, color: "bg-success/10 text-success" },
]

const mockVocabulary = [
  // Political / Government terms
  { id: "1", term: "더불어민주당", category: "org", addedBy: "김영수", addedAt: "2024-01-15" },
  { id: "2", term: "국민의힘", category: "org", addedBy: "김영수", addedAt: "2024-01-15" },
  { id: "3", term: "국정감사", category: "legal", addedBy: "이미영", addedAt: "2024-01-14" },
  { id: "4", term: "공직선거법", category: "legal", addedBy: "이미영", addedAt: "2024-01-14" },
  { id: "5", term: "법제사법위원회", category: "org", addedBy: "박지훈", addedAt: "2024-01-13" },
  // Procurement terms
  { id: "6", term: "조달청", category: "org", addedBy: "김영수", addedAt: "2024-01-13" },
  { id: "7", term: "나라장터", category: "product", addedBy: "이미영", addedAt: "2024-01-12" },
  { id: "8", term: "입찰", category: "legal", addedBy: "박지훈", addedAt: "2024-01-12" },
  { id: "9", term: "수의계약", category: "legal", addedBy: "김영수", addedAt: "2024-01-11" },
  // Additional terms
  { id: "10", term: "G2B", category: "acronym", addedBy: "이미영", addedAt: "2024-01-11" },
  { id: "11", term: "RFP", category: "acronym", addedBy: "박지훈", addedAt: "2024-01-10" },
  { id: "12", term: "PQ심사", category: "legal", addedBy: "김영수", addedAt: "2024-01-10" },
  { id: "13", term: "적격심사", category: "legal", addedBy: "이미영", addedAt: "2024-01-09" },
  { id: "14", term: "용산구", category: "region", addedBy: "박지훈", addedAt: "2024-01-09" },
  { id: "15", term: "세종시", category: "region", addedBy: "김영수", addedAt: "2024-01-08" },
]

function getCategoryInfo(categoryId: string) {
  return categories.find((c) => c.id === categoryId) || categories[0]
}

export default function DomainVocabularyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [newTerm, setNewTerm] = useState("")
  const [newCategory, setNewCategory] = useState("")

  const filteredVocabulary = mockVocabulary.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const vocabularyByCategory = categories.map((cat) => ({
    ...cat,
    count: mockVocabulary.filter((v) => v.category === cat.id).length,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Domain Vocabulary</h1>
          <p className="text-muted-foreground">
            도메인 특화 용어를 추가하여 ASR 정확도를 향상시키세요
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import CSV
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {vocabularyByCategory.map((cat) => (
          <Card
            key={cat.id}
            className={`border bg-card shadow-sm cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === cat.id ? "ring-2 ring-primary border-primary" : "border-border"
            }`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cat.color}`}>
                  <cat.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{cat.count}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{cat.nameKo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add New Term */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Add New Term</CardTitle>
            <CardDescription>새로운 도메인 용어를 추가하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Term</label>
              <Input
                className="mt-1.5"
                placeholder="용어를 입력하세요"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4 text-muted-foreground" />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full gap-2" disabled={!newTerm || !newCategory}>
              <Plus className="h-4 w-4" />
              Add Term
            </Button>
          </CardContent>
        </Card>

        {/* Vocabulary List */}
        <Card className="border-border bg-card shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Vocabulary List</CardTitle>
                <CardDescription>
                  {filteredVocabulary.length} of {mockVocabulary.length} terms
                  {selectedCategory !== "all" && (
                    <span className="ml-1">
                      in {categories.find(c => c.id === selectedCategory)?.nameKo}
                    </span>
                  )}
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 w-[200px]"
                  placeholder="Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filteredVocabulary.map((item) => {
                const category = getCategoryInfo(item.category)
                return (
                  <Badge
                    key={item.id}
                    variant="outline"
                    className={`group cursor-pointer px-3 py-1.5 text-sm transition-all hover:shadow-sm ${category.color} border-transparent bg-opacity-100`}
                  >
                    <span>{item.term}</span>
                    <button className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3 hover:text-destructive" />
                    </button>
                  </Badge>
                )
              })}
            </div>
            {filteredVocabulary.length === 0 && (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                No terms found
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Example Terms by Domain */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Example Vocabulary</CardTitle>
          <CardDescription>도메인별 용어 예시</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Political / Government</h3>
              <div className="flex flex-wrap gap-2">
                {["더불어민주당", "국민의힘", "국정감사", "공직선거법", "법제사법위원회"].map((term) => (
                  <Badge key={term} variant="outline" className="bg-muted/50">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Procurement</h3>
              <div className="flex flex-wrap gap-2">
                {["조달청", "나라장터", "입찰", "수의계약", "하도급"].map((term) => (
                  <Badge key={term} variant="outline" className="bg-muted/50">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Additions</CardTitle>
          <CardDescription>최근 추가된 용어들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockVocabulary.slice(0, 5).map((item) => {
              const category = getCategoryInfo(item.category)
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${category.color}`}
                    >
                      <category.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.term}</p>
                      <p className="text-xs text-muted-foreground">{category.nameKo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{item.addedBy}</p>
                    <p className="text-xs text-muted-foreground">{item.addedAt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
