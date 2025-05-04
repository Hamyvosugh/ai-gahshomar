// app/api/save-post/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const jsonData = JSON.parse(formData.get('data') as string)
    
    // مپ برای تبدیل نام فارسی کشورها به انگلیسی
    const COUNTRY_MAP: { [key: string]: string } = {
      'امریکا': 'usa',
      'کانادا': 'canada',
      'آلمان': 'germany',
      'کویت': 'kuwait',
      'امارات': 'uae',
      'اسرائیل': 'israel',
      'سوئد': 'sweden',
      'ترکیه': 'turkey',
      'استرالیا': 'australia',
      'فرانسه': 'france',
      'جهانی': 'global',
      'ایران': 'iran'
    }

    // استخراج داده‌ها
    const {
      title = '',
      slug = '',
      description = '',
      country = 'ایران',
      persianDate = { day: '', month: '', year: '' },
      gregorianDate = '',
      time = '',
      persianMonth = '',
      gregorianMonth = '',
      type = '',
      city = '',
      author = '',
      coverImageUrl = '',
      metaDescription = '',
      categories = [],
      tags = [],
      ad1 = {
        title: '',
        description: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
        publish: '',
        expire: ''
      },
      ad2 = {
        title: '',
        description: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
        publish: '',
        expire: ''
      },
      content = ''
    } = jsonData

    // تبدیل نام کشور به انگلیسی
    const englishCountry = COUNTRY_MAP[country] || 'default'

    // اگر slug خالی بود، یکی با حروف انگلیسی بسازیم
    const finalSlug = slug || title.toLowerCase()
      .replace(/[\u0600-\u06FF]/g, '') // حذف حروف فارسی
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '') || `post-${Date.now()}`

    // پیدا کردن اطلاعات نویسنده
    const AUTHORS = [
      {
        name: 'علی احمدی',
        title: 'نویسنده ارشد',
        image: 'https://example.com/author1.jpg'
      },
      {
        name: 'مریم رضایی',
        title: 'پژوهشگر',
        image: 'https://example.com/author2.jpg'
      }
    ]
    
    const authorInfo = AUTHORS.find(a => a.name === author)

    // ذخیره تصاویر
    const coverImage = formData.get('coverImage') as File | null
    const ad1Image = formData.get('ad1Image') as File | null
    const ad2Image = formData.get('ad2Image') as File | null

    // استخراج شماره ماه از تاریخ میلادی
    let monthNumber = '01' // پیش‌فرض
    
    if (gregorianDate) {
      const [year, month] = gregorianDate.split('-')
      monthNumber = month.padStart(2, '0')
    } else if (gregorianMonth) {
      // تبدیل نام ماه به شماره
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      const monthIndex = months.indexOf(gregorianMonth)
      if (monthIndex !== -1) {
        monthNumber = (monthIndex + 1).toString().padStart(2, '0')
      }
    }
    
    // ساخت مسیر برای ذخیره فایل
    const contentDir = path.join(process.cwd(), 'content', 'posts', englishCountry, monthNumber)
    const imagesDir = path.join(process.cwd(), 'content', 'images', englishCountry, monthNumber)
    
    await fs.mkdir(contentDir, { recursive: true })
    await fs.mkdir(imagesDir, { recursive: true })

    // ذخیره تصاویر و گرفتن مسیرها
    let coverImagePath = coverImageUrl
    if (coverImage) {
      const coverBuffer = Buffer.from(await coverImage.arrayBuffer())
      const coverExt = coverImage.name.split('.').pop()
      const coverFileName = `${finalSlug}-cover.${coverExt}`
      await fs.writeFile(path.join(imagesDir, coverFileName), coverBuffer)
      coverImagePath = `/images/${englishCountry}/${monthNumber}/${coverFileName}`
    }

    let ad1ImagePath = ad1.imageUrl
    if (ad1Image) {
      const ad1Buffer = Buffer.from(await ad1Image.arrayBuffer())
      const ad1Ext = ad1Image.name.split('.').pop()
      const ad1FileName = `${finalSlug}-ad1.${ad1Ext}`
      await fs.writeFile(path.join(imagesDir, ad1FileName), ad1Buffer)
      ad1ImagePath = `/images/${englishCountry}/${monthNumber}/${ad1FileName}`
    }

    let ad2ImagePath = ad2.imageUrl
    if (ad2Image) {
      const ad2Buffer = Buffer.from(await ad2Image.arrayBuffer())
      const ad2Ext = ad2Image.name.split('.').pop()
      const ad2FileName = `${finalSlug}-ad2.${ad2Ext}`
      await fs.writeFile(path.join(imagesDir, ad2FileName), ad2Buffer)
      ad2ImagePath = `/images/${englishCountry}/${monthNumber}/${ad2FileName}`
    }

    // محتوای MDX
    const mdxContent = `---
title: ${title}
slug: ${finalSlug}
description: ${description}
country: ${country}
persianDate: ${persianDate.year}/${persianDate.month}/${persianDate.day}
gregorianDate: ${gregorianDate}
time: ${time}
persianMonth: ${persianMonth}
gregorianMonth: ${gregorianMonth}
type: ${type}
city: ${city}
author:
  name: ${authorInfo?.name || ''}
  title: ${authorInfo?.title || ''}
  image: ${authorInfo?.image || ''}
coverImage: ${coverImagePath}
metaDescription: ${metaDescription}
categories: ${categories.join(', ')}
tags: ${tags.join(', ')}
ad1:
  title: ${ad1.title}
  description: ${ad1.description}
  image: ${ad1ImagePath}
  buttonText: ${ad1.buttonText}
  buttonLink: ${ad1.buttonLink}
  publish: ${ad1.publish}
  expire: ${ad1.expire}
ad2:
  title: ${ad2.title}
  description: ${ad2.description}
  image: ${ad2ImagePath}
  buttonText: ${ad2.buttonText}
  buttonLink: ${ad2.buttonLink}
  publish: ${ad2.publish}
  expire: ${ad2.expire}
---

${content}
`

    // ذخیره فایل MDX
    const filename = `${finalSlug}.mdx`
    await fs.writeFile(path.join(contentDir, filename), mdxContent)

    // آپدیت فایل search-index.json
    const searchIndexPath = path.join(process.cwd(), 'content', 'search-index.json')
    let searchIndex = []
    
    try {
      const existingData = await fs.readFile(searchIndexPath, 'utf-8')
      searchIndex = JSON.parse(existingData)
    } catch {
      // فایل وجود ندارد یا خالی است
    }
    
    // اضافه کردن همه موارد به جز تبلیغات به ایندکس
    searchIndex.push({
      title,
      slug: finalSlug,
      description,
      country,
      persianDate: `${persianDate.year}/${persianDate.month}/${persianDate.day}`,
      gregorianDate,
      time,
      persianMonth,
      gregorianMonth,
      type,
      city,
      coverImage: coverImagePath,
      metaDescription,
      categories,
      tags,
      path: `/posts/${englishCountry}/${monthNumber}/${filename}`
    })
    
    await fs.writeFile(searchIndexPath, JSON.stringify(searchIndex, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      path: `/posts/${englishCountry}/${monthNumber}/${filename}`,
      savedIn: `content/posts/${englishCountry}/${monthNumber}/${filename}`
    })
  } catch (error) {
    console.error('Error saving post:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}