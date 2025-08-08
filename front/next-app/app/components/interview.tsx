"use client";
import { useState } from "react";
import Image from "next/image";

type InterviewProps = {
    title: string;
    date: string;
    content: string;
    image?: string[];
}

export default function Interview({ title, date, content, image }: InterviewProps) {
    
    return (
        <div className="w-96 h-auto bg-white rounded-lg shadow-md mx-auto my-8 py-2">
            <h2 className="text-2xl font-bold bg-brown text-white h-10 flex column items-center rounded-t-lg px-2">{title}</h2>
            <p className="text-sm text-gray-500 bg-background px-2 h-6 flex column items-center">{date}</p>
            {/* {image && <Image src={image} alt="interviewImg" width={100} height={100} />} */}
            <div className="flex flex-col h-auto my-4">
                <div className="flex my-auto w-auto mx-4 overflow-x-auto gap-2 items-center">
                    {Array.isArray(image) && image.map((img, index) => (
                        <Image src={img} alt="interviewImg" width={100} height={100} key={index} 
                        className={`w-25 h-25 bg-amber-300 ${index === 0 ? "h-25" : "h-0"}`}
                        />
                    ))}
                </div>
                <div>
                    <p className="text-sm text-gray-500 mt-2 p-2">{content}</p>
                </div>
            </div>
        </div>
    )
}