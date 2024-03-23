import React from 'react'
import axios from 'axios'
import {formattedDateTime} from '@/utils/formattedDateTime'

const fetchData = async ({id}) => {
    try {
        const blog = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${id}`);
        return blog.data

    } catch (error) {
        console.log(error)
        let blog
        return blog = null
    }
};

export default async function SingleBlog({params}) {
    const blog = await fetchData(params)

    return (
        <div className="min-h-[60vh]">
            {!blog ? (
                <h1 className="text-center my-32">Not Found.</h1>
            ) : (
                <div className={'grid grid-cols-1 md:grid-cols-5 gap-8 my-[30px] px-8'}>
                    <div className={'col-span-1 md:col-span-5'}>
                        <div>
                            <h3 className={'text-sm font-bold text-purple-600'}> {formattedDateTime(blog.created_at)} </h3>
                            <h1 className={'text-2xl md:text-4xl leading-8 font-bold my-8'}>
                                {blog.title}
                            </h1>

                            <div className={'h-[226px] md:h-[426px] w-full overflow-hidden mb-8'}>
                                <img
                                    src={blog.image}
                                    className="object-cover h-full w-full"
                                    alt="photo"
                                />
                            </div>

                            <div dangerouslySetInnerHTML={{__html: blog.description}}
                                 className={'no-tailwindcss-base'}>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
