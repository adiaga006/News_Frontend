'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SimpleDetailsNewCard from './items/SimpleDetailsNewCard'
import { base_api_url } from '../../config/config'

const SearchNews = () => {

    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const searchValue = useSearchParams()
    const value = searchValue.get('value')

    const get_news = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`${base_api_url}/api/search/news?value=${value}`)
            const { news } = await res.json()
            setNews(news)
        } catch (error) {
            setError('Lỗi khi tìm kiếm tin tức.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (value) {
            get_news()
        }
    }, [value])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && news && news.length > 0 ? (
                news.map((item, i) => (
                    <SimpleDetailsNewCard key={i} news={item} type="details-news" height={200} />
                ))
            ) : (
                !loading && !error && <p>No results found for "{value}"</p>
            )}
        </div>
    )
}

const SearchPage = () => {
    return (
        <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
            <SearchNews />
        </Suspense>
    )
}

export default SearchPage;
