// app/admin/create-post/page.tsx
'use client'

import { useState } from 'react'

interface Ad {
  title: string;
  description: string;
  image: File | null;
  imageUrl?: string;
  buttonText: string;
  buttonLink: string;
  publish: string;
  expire: string;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  country: string;
  persianDate: {
    day: string;
    month: string;
    year: string;
  };
  gregorianDate: string;
  time: string;
  persianMonth: string;
  gregorianMonth: string;
  type: string;
  city: string;
  author: string;
  coverImage: File | null;
  coverImageUrl?: string;
  metaDescription: string;
  categories: string[];
  tags: string[];
  ad1: Ad;
  ad2: Ad;
  content: string;
}

const COUNTRIES = [
  'امریکا', 'کانادا', 'آلمان', 'کویت', 'امارات', 'اسرائیل',
  'سوئد', 'ترکیه', 'استرالیا', 'فرانسه', 'جهانی', 'ایران'
]

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
]

const GREGORIAN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const TYPES = ['gahshomar', 'gahnameh', 'daneshnameh', 'jahannameh', 'shahrnameh']

const CITIES = [
  'آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'البرز', 'ایلام',
  'بوشهر', 'تهران', 'چهارمحال و بختیاری', 'خراسان جنوبی', 'خراسان رضوی',
  'خراسان شمالی', 'خوزستان', 'زنجان', 'سمنان', 'سیستان و بلوچستان', 'فارس',
  'قزوین', 'قم', 'کردستان', 'کرمان', 'کرمانشاه', 'کهگیلویه و بویراحمد',
  'گلستان', 'گیلان', 'لرستان', 'مازندران', 'مرکزی', 'هرمزگان', 'همدان', 'یزد'
]

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

const CATEGORIES = [
  'ملی', 'جهانی', 'آیینی', 'فرهنگی', 'هنری', 'علمی', 'بزرگداشت',
  'سلامت', 'زیست بومی', 'تاریخی', 'معاصر', 'اقتصادی', 'ورزشی',
  'فناوری', 'جشن', 'تعطیل'
]

export default function CreatePost() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    country: '',
    persianDate: {
      day: '',
      month: '',
      year: ''
    },
    gregorianDate: '',
    time: '',
    persianMonth: '',
    gregorianMonth: '',
    type: '',
    city: '',
    author: '',
    coverImage: null,
    coverImageUrl: '',
    metaDescription: '',
    categories: [],
    tags: [],
    ad1: {
      title: '',
      description: '',
      image: null,
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
      publish: '',
      expire: ''
    },
    ad2: {
      title: '',
      description: '',  
      image: null,
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
      publish: '',
      expire: ''
    },
    content: ''
  })
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const data = new FormData()
      
      // اضافه کردن داده‌های جیسون
      const jsonData = {
        ...formData,
        coverImage: undefined,
        ad1: { ...formData.ad1, image: undefined },
        ad2: { ...formData.ad2, image: undefined }
      }
      data.append('data', JSON.stringify(jsonData))
      
      // اضافه کردن فایل‌ها
      if (formData.coverImage) data.append('coverImage', formData.coverImage)
      if (formData.ad1.image) data.append('ad1Image', formData.ad1.image)
      if (formData.ad2.image) data.append('ad2Image', formData.ad2.image)

      const response = await fetch('/api/save-post', {
        method: 'POST',
        body: data
      })

      if (response.ok) {
        setStatus('ذخیره شد!')
        // Reset form
      } else {
        setStatus('خطا در ذخیره')
      }
    } catch (error) {
      console.error(error)
      setStatus('خطا در ارتباط')
    }
  }

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleAdChange = (adNumber: 'ad1' | 'ad2', field: keyof Ad, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [adNumber]: {
        ...prev[adNumber],
        [field]: value
      }
    }))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto dark:text-black">
      <h1 className="text-2xl font-bold mb-6 text-white">ایجاد پست جدید</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* بخش عمومی */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-4">اطلاعات عمومی</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">عنوان:</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">نامک (slug):</label>
              <input
                type="text"
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">کشور:</label>
              <select
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">انتخاب کنید</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">نوع:</label>
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">انتخاب کنید</option>
                {TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">شهر:</label>
              <select
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                className="border p-2 w-full rounded"
              >
                <option value="">انتخاب کنید</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">نویسنده:</label>
              <select
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">انتخاب کنید</option>
                {AUTHORS.map(author => (
                  <option key={author.name} value={author.name}>{author.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* تاریخ شمسی */}
          <div>
            <label className="block mb-2 font-medium">تاریخ شمسی:</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="روز"
                value={formData.persianDate.day}
                onChange={e => setFormData({
                  ...formData,
                  persianDate: {...formData.persianDate, day: e.target.value}
                })}
                className="border p-2 rounded"
                min="1"
                max="31"
              />
              <select
                value={formData.persianMonth}
                onChange={e => setFormData({...formData, persianMonth: e.target.value})}
                className="border p-2 rounded"
              >
                <option value="">ماه</option>
                {PERSIAN_MONTHS.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="سال"
                value={formData.persianDate.year}
                onChange={e => setFormData({
                  ...formData,
                  persianDate: {...formData.persianDate, year: e.target.value}
                })}
                className="border p-2 rounded"
                min="1300"
              />
            </div>
          </div>

          {/* تاریخ میلادی */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">تاریخ میلادی:</label>
              <input
                type="date"
                value={formData.gregorianDate}
                onChange={e => setFormData({...formData, gregorianDate: e.target.value})}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">ساعت:</label>
              <input
                type="time"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          {/* ماه میلادی */}
          <div>
            <label className="block mb-2 font-medium">ماه میلادی:</label>
            <select
              value={formData.gregorianMonth}
              onChange={e => setFormData({...formData, gregorianMonth: e.target.value})}
              className="border p-2 w-full rounded"
            >
              <option value="">انتخاب کنید</option>
              {GREGORIAN_MONTHS.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          {/* تصویر کاور */}
          <div>
            <label className="block mb-2 font-medium">تصویر کاور:</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({...formData, coverImage: e.target.files[0]})
                }
              }}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* توضیحات */}
          <div>
            <label className="block mb-2 font-medium">توضیحات:</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="border p-2 w-full rounded h-24"
              placeholder="توضیحات پست..."
            />
          </div>

          {/* متا توضیحات */}
          <div>
            <label className="block mb-2 font-medium">متا توضیحات:</label>
            <textarea
              value={formData.metaDescription}
              onChange={e => setFormData({...formData, metaDescription: e.target.value})}
              className="border p-2 w-full rounded h-20"
            />
          </div>

          {/* دسته‌بندی‌ها */}
          <div>
            <label className="block mb-2 font-medium">دسته‌بندی‌ها:</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* تگ‌ها */}
          <div>
            <label className="block mb-2 font-medium">تگ‌ها:</label>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              placeholder="تگ جدید را وارد کرده و Enter بزنید"
              className="border p-2 w-full rounded"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      tags: prev.tags.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* بخش تبلیغات */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-4">تبلیغات</h2>
          
          {/* تبلیغ ۱ */}
          <div className="border p-4 rounded space-y-3">
            <h3 className="font-medium">تبلیغ ۱</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="عنوان"
                value={formData.ad1.title}
                onChange={e => handleAdChange('ad1', 'title', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="متن دکمه"
                value={formData.ad1.buttonText}
                onChange={e => handleAdChange('ad1', 'buttonText', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="url"
                placeholder="لینک دکمه"
                value={formData.ad1.buttonLink}
                onChange={e => handleAdChange('ad1', 'buttonLink', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => e.target.files && handleAdChange('ad1', 'image', e.target.files[0])}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="تاریخ شروع"
                value={formData.ad1.publish}
                onChange={e => handleAdChange('ad1', 'publish', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="تاریخ پایان"
                value={formData.ad1.expire}
                onChange={e => handleAdChange('ad1', 'expire', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <textarea
              placeholder="توضیحات"
              value={formData.ad1.description}
              onChange={e => handleAdChange('ad1', 'description', e.target.value)}
              className="border p-2 w-full rounded h-20"
            />
          </div>

          {/* تبلیغ ۲ */}
          <div className="border p-4 rounded space-y-3">
            <h3 className="font-medium">تبلیغ ۲</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="عنوان"
                value={formData.ad2.title}
                onChange={e => handleAdChange('ad2', 'title', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="متن دکمه"
                value={formData.ad2.buttonText}
                onChange={e => handleAdChange('ad2', 'buttonText', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="url"
                placeholder="لینک دکمه"
                value={formData.ad2.buttonLink}
                onChange={e => handleAdChange('ad2', 'buttonLink', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => e.target.files && handleAdChange('ad2', 'image', e.target.files[0])}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="تاریخ شروع"
                value={formData.ad2.publish}
                onChange={e => handleAdChange('ad2', 'publish', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="تاریخ پایان"
                value={formData.ad2.expire}
                onChange={e => handleAdChange('ad2', 'expire', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <textarea
              placeholder="توضیحات"
              value={formData.ad2.description}
              onChange={e => handleAdChange('ad2', 'description', e.target.value)}
              className="border p-2 w-full rounded h-20"
            />
          </div>
        </div>

        {/* محتوا */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">محتوا</h2>
          <textarea
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            className="border p-2 w-full rounded h-96 font-mono"
            placeholder="محتوای MDX را اینجا وارد کنید..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            ذخیره
          </button>
        </div>

        {status && (
          <div className={`mt-4 p-4 rounded ${
            status.includes('خطا') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {status}
          </div>
        )}
      </form>
    </div>
  )
}