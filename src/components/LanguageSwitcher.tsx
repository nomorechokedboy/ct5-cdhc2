'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher  () {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setCurrentLocale] = useState('en')
  
  useEffect(() => {
    // Lấy locale từ URL hoặc localStorage
    const currentLocale = pathname.split('/')[1] || 'en'
    setCurrentLocale(currentLocale)
  }, [pathname])
  
  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale)
    // Redirect đến URL với locale mới
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`)
    router.push(newPath)
  }
  
  return (
    <select 
      value={locale}
      onChange={(e) => handleLocaleChange(e.target.value)}
      className="px-3 py-2 border rounded-md"
    >
      <option value="en">English</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  )
}
