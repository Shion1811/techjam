'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StorePf() {

    return (
        <div className="min-h-screen bg-white p-4 text-black">
        {/* 戻るボタン */}
        <button className="text-2xl mb-4" onClick={() => window.history.back()}>
            {'‹'}
        </button>

        {/* ロゴ画像エリア */}
        <div className="flex justify-center mb-4">
            <Link href="/top/pages">
                <img src="/images/techjam-logo.png" alt="LOGO" className="w-12 h-12"/>
            </Link>
        </div>

        {/* タイトル */}
        <h1 className="text-center text-2xl font-bold mb-4">店舗登録</h1>

        <h2 className="text-center text-lg font-semibold mb-6">店舗登録が完了しました。</h2>
        <p className="text-center text-sm text-gray-500 mb-8">店舗登録をしていただきありがとうございます。</p>

        <hr />

        <p className="text-center text-sm text-gray-500 mb-8">※マップへの表示にお時間がかかる場合がございます。</p>
        <div className="flex justify-center mb-8">    
            <button className="bg-white-0 text-rose-400 font-bold border-4 border-rose-400 rounded-full px-12 py-2 text-sm">
            TOP
            </button>
        </div>
        </div>
    );
}