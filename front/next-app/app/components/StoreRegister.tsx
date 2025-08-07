// components/StoreRegister.tsx
'use client';

import { useState } from 'react';

export default function StoreRegister() {
    const [status, setStatus] = useState<'open' | 'closed'>('open');

    return (
    <div className="min-h-screen bg-white p-4 text-black">
      {/* 戻るボタン */}
        <button className="text-2xl mb-4">{'‹'}</button>

      {/* 店舗画像の枠 */}
        <div className="w-48 h-16 bg-gray-300 mx-auto mb-6" />

      {/* タイトル */}
        <h1 className="text-xl font-bold text-center mb-8">店舗登録</h1>

      {/* 開業情報 */}
        <div className="mb-6 px-4">
        <div className="flex items-center mb-2">
            <p className="text-sm mr-2">開業情報</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>

        {/* ラジオボタン */}
        <div className="flex gap-4 mb-4">
            <label className={`flex items-center border px-4 py-2 rounded-full cursor-pointer ${status === 'open' ? 'border-rose-500' : 'border-gray-300'}`}>
            <input
                type="radio"
                name="status"
                checked={status === 'open'}
                onChange={() => setStatus('open')}
                className="accent-rose-500 mr-2"
            />
            開業済み
            </label>

            <label className={`flex items-center border px-4 py-2 rounded-full cursor-pointer ${status === 'closed' ? 'border-rose-500' : 'border-gray-300'}`}>
            <input
                type="radio"
                name="status"
                checked={status === 'closed'}
                onChange={() => setStatus('closed')}
                className="accent-rose-500 mr-2"
            />
            未開業
            </label>
        </div>

        <hr />
        <p className="text-xs mt-2">つづいて、お客様情報の入力へお進みください。</p>
        </div>

      {/* 次へボタン */}
        <div className="text-center">
        <button className="bg-rose-400 text-white rounded-full px-12 py-2 text-sm">
            次へ
        </button>
        </div>
    </div>
    );
}

