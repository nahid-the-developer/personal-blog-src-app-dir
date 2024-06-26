import React from 'react'
import axios from "axios";
import Card from "@/components/Card/Card";
import Pagination from "@/components/Pagination/Pagination";
import SearchOrder from "@/components/blogs/blog_list/SearchOrder";

export const metadata = {
    title: "Personal Blog | Blogs",
    description: "Generated by create next app",
};

const fetchData = async (params) => {

    const {page, search, ordering} = params

    try {
        const blogs = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?page=${page ?? 1}&search=${search ?? ''}&ordering=${ordering ?? ''}`);
        return blogs.data

    } catch (error) {
        console.log(error)
        return blogs = null
    }
};

export default async function Blogs({searchParams}) {
    const blogs = await fetchData(searchParams)

    return (
        <div>
            <h1 className="mt-10 text-[72px] md:text-[130px] lg:text-[180px] text-center font-bold border-y-2 border-black border-opacity-20 mb-7 dark:border-white">
                THE BLOG
            </h1>

            <div className={'px-8 lg:px-0'}>
                <section className={'my-12'}>
                    <div className="my-10 flex justify-between items-center flex-wrap md:flex-nowrap gap-4">
                        <h2 className={'font-bold text-2xl'}>All blog posts</h2>
                        <SearchOrder/>
                    </div>

                    {blogs?.results.length === 0 ? (
                        <h1 className="text-center">Not Found.</h1>
                    ) : (
                        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                            {blogs?.results?.map((blog, index) => (<Card key={index} blog={blog}/>))}
                        </div>
                    )}

                </section>
                <Pagination blogs={blogs}/>
            </div>
        </div>
    )
}
