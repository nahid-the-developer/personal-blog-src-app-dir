'use client'
import React, {useCallback, useState} from 'react';
import {useRouter} from "next/navigation";

const SearchOrder = () => {
    const router = useRouter()
    const [orderingValue, setOrderingValue] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const orderHandler = useCallback(async (e) => {
        await setOrderingValue(e.target.value)
        await router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/blog?search=${searchValue}&ordering=${e.target.value}`)
    }, [router])

    const searchHandler = useCallback(async (e) => {
        await setSearchValue(e.target.value)
        await router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/blog?search=${e.target.value}&ordering=${orderingValue}`)
    }, [searchValue, router])

    return (
        <div className="max-w-[520px] w-full flex gap-2">
            <div className="relative mr-2">
                <select
                    onChange={orderHandler}
                    className="py-2 px-4 pr-8 appearance-none text-gray-600 rounded-lg border border-gray-200 bg-gray-200">
                    <option value="">Default</option>
                    <option value="created_at">Date Ascending</option>
                    <option value="-created_at">Date Descending</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4 absolute top-1/2 -translate-y-2 right-3 pointer-events-none"
                     viewBox="0 0 448 512">
                    <path
                        d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>
            </div>
            <input
                type="text"
                className="w-full h-[44px] text-gray-600 py-2 px-4 rounded-lg border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Search by title, description, keywords"
                value={searchValue}
                onChange={searchHandler}
            />
        </div>
    );
};

export default SearchOrder;
