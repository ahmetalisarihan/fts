'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle, SimpleThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from '@/components/ThemeProvider'
import { ClientOnly } from '@/components/ClientOnly'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  X, 
  Info, 
  AlertTriangle,
  CheckCircle2,
  XCircle 
} from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'

export default function DarkModeTestPage(): JSX.Element {
  const { theme, actualTheme } = useTheme()
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const themeInfo = {
    light: {
      icon: Sun,
      name: 'Açık Tema',
      description: 'Parlak ve temiz görünüm',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    },
    dark: {
      icon: Moon,
      name: 'Koyu Tema', 
      description: 'Göz dostu koyu görünüm',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    },
    system: {
      icon: Monitor,
      name: 'Sistem Teması',
      description: 'Sistem ayarlarını takip eder',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const currentThemeInfo = themeInfo[theme]
  const actualThemeInfo = themeInfo[actualTheme]
  const CurrentIcon = currentThemeInfo.icon
  const ActualIcon = actualThemeInfo.icon

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Breadcrumb items={[
        { name: 'Dark Mode Test', url: '/dark-mode-test' }
      ]} />

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            🌙 Dark Mode Test Sayfası
          </h1>
          <p className="text-lg text-muted-foreground">
            Dark mode implementasyonunu test etmek için oluşturulmuş demo sayfası
          </p>
        </header>

        {/* Theme Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Tema Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Seçili Tema</Label>
                <div className="flex items-center gap-2">
                  <CurrentIcon className="w-4 h-4" />
                  <span className="font-medium">{currentThemeInfo.name}</span>
                  <Badge className={currentThemeInfo.color}>
                    {currentThemeInfo.description}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Aktif Tema</Label>
                <div className="flex items-center gap-2">
                  <ActualIcon className="w-4 h-4" />
                  <span className="font-medium">{actualThemeInfo.name}</span>
                  <Badge className={actualThemeInfo.color}>
                    {actualTheme === 'dark' ? 'Koyu Mod Aktif' : 'Açık Mod Aktif'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tema Kontrolleri</CardTitle>
            <CardDescription>
              Farklı tema toggle bileşenlerini test edin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label>Gelişmiş Theme Toggle</Label>
                <ThemeToggle />
              </div>
              <div className="space-y-2">
                <Label>Basit Theme Toggle</Label>
                <SimpleThemeToggle />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UI Components Test */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Form Components */}
          <Card>
            <CardHeader>
              <CardTitle>Form Bileşenleri</CardTitle>
              <CardDescription>
                Dark mode'da form elementlerinin görünümü
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-input">Text Input</Label>
                <Input
                  id="test-input"
                  placeholder="Buraya yazı yazabilirsiniz..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="dark-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-textarea">Textarea</Label>
                <Textarea
                  id="test-textarea"
                  placeholder="Uzun metin yazabilirsiniz..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  className="dark-input"
                />
              </div>

              <div className="space-y-2">
                <Label>Select</Label>
                <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bir seçenek seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Seçenek 1</SelectItem>
                    <SelectItem value="option2">Seçenek 2</SelectItem>
                    <SelectItem value="option3">Seçenek 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Button Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Button Çeşitleri</CardTitle>
              <CardDescription>
                Farklı button variant'larının dark mode görünümü
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="default" disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Indicators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Durum Göstergeleri</CardTitle>
            <CardDescription>
              Farklı durum renklerinin dark mode'daki görünümü
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">Başarılı</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">Hata</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-yellow-700 dark:text-yellow-300">Uyarı</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-700 dark:text-blue-300">Bilgi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Renk Paleti</CardTitle>
            <CardDescription>
              Dark mode renk değişkenlerinin görünümü
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Background', class: 'bg-background border-border', text: 'text-foreground' },
                { name: 'Card', class: 'bg-card border-border', text: 'text-card-foreground' },
                { name: 'Primary', class: 'bg-primary', text: 'text-primary-foreground' },
                { name: 'Secondary', class: 'bg-secondary', text: 'text-secondary-foreground' },
                { name: 'Muted', class: 'bg-muted', text: 'text-muted-foreground' },
                { name: 'Accent', class: 'bg-accent', text: 'text-accent-foreground' },
              ].map((color, index) => (
                <div key={index} className="text-center">
                  <div className={`w-full h-16 rounded-lg border-2 ${color.class} flex items-center justify-center`}>
                    <span className={`text-xs font-medium ${color.text}`}>
                      {color.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{color.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Dark Mode Kontrol Listesi</CardTitle>
            <CardDescription>
              Implementasyon özellikleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Temel Özellikler</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    System theme detection
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Manual theme switching
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Theme persistence
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Smooth transitions
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">UI İyileştirmeleri</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Custom scrollbar styling
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Glass effect backgrounds
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Proper contrast ratios
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Meta theme-color support
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
