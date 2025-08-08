'use client';
import React from 'react';
import Link from 'next/link';

export default function Interview() {
    
    return (
        <div className="min-h-screen bg-white p-4 text-black">
            {/* 戻るボタン */}
            <button className='text-2xl mb-4' onClick={() => window.history.back()}>
                {'<'}
            </button>
            <div className="max-w-md mx-auto px-4 pt-6 pb-24 bg-white min-h-screen relative">
                <h1 className="text-xl font-bold text-center mb-6">店舗名</h1>
            </div>

            <nav className="flex justify-center gap-8 py-4 bg-gray-100">
                <Link href='/' className='text-2xl text-gray-600 hover:text-gray-900'>TOP</Link>
                <Link href='/interview' className='text-2xl text-gray-600 hover:text-gray-900'>インタビュー</Link>
                <Link href='/photo' className='text-2xl text-gray-600 hover:text-gray-900'>写真</Link>
            </nav>


            <div>
                <h3 className='bg-'>インタビュー記事</h3>
                <div>
                    <p>最新の話題：XXXX</p>
                    <h2>題名（タイトル）</h2>
                    <p>内容</p>
                </div>
            </div>
        </div>
    )
}