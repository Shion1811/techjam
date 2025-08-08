'use client';
import React from 'react';
import Link from 'next/link';

export default function SettingPage() {
    return (
        <div className="min-h-screen bg-white p-4 text-black pt-20">
            {/* タイトル */}
            <h1 className="text-center text-2xl font-bold mb-4">その他</h1>

            {/* 設定項目リスト */}
            <ul className="space-y-4">
    <li className="flex items-center justify-between">
        <div className="flex items-center">
            <img src="/images/news.png" alt="お知らせ" className="w-6 h-6 ml-1 mr-5" />
            <Link href="/setting/profile" className="text-lg hover:text-blue-500 flex-1">
                お知らせ
            </Link>
        </div>
        <button className="text-2xl">
            {'>'}
        </button>
    </li>
    <hr />
    <li className="flex items-center justify-between">
        <div className="flex items-center">
            <img src="/images/coupon.png" alt="クーポン" className="w-6 h-6 ml-1 mr-5" />
            <Link href="/setting/profile" className="text-lg hover:text-blue-500 flex-1">
                クーポン
            </Link>
        </div>
        <button className="text-2xl">
            {'>'}
        </button>
    </li>
    <hr />
    <li className="flex items-center justify-between">
        <div className="flex items-center">
            <img src="/images/phone.png" alt="お問い合わせ" className="w-6 h-6 ml-1 mr-5" />
            <Link href="/setting/profile" className="text-lg hover:text-blue-500 flex-1">
                お問い合わせ
            </Link>
        </div>
        <button className="text-2xl">
            {'>'}
        </button>
    </li>
    <hr />
    <li className="flex items-center justify-between">
        <div className="flex items-center">
            <img src="/images/push.png" alt="ログアウト" className="w-6 h-6 ml-1 mr-5" />
            <Link href="/setting/profile" className="text-lg hover:text-blue-500 flex-1">
                ログアウト
            </Link>
        </div>
        <button className="text-2xl">
            {'>'}
        </button>
    </li>
    <hr />
</ul>
        </div>
    );
}
