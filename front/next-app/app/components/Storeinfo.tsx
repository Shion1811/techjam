    'use client';

    import { useState } from 'react';

    export default function StoreRegister() {
    return (
        <div className="min-h-screen bg-white p-4 text-black">
        {/* 戻るボタン */}
        <button className="text-2xl mb-4">{'‹'}</button>

        {/* ロゴ画像エリア */}
        <div className="w-48 h-16 bg-gray-300 mx-auto mb-6" />

        {/* タイトル */}
        <h1 className="text-center text-2xl font-bold mb-4">店舗登録</h1>

        {/* セクションタイトル */}
        <div className="bg-gray-400 text-white px-4 py-2 text-lg font-semibold mb-2">
            店舗情報
        </div>
        <p className="text-xs text-gray-500 mb-4">店舗情報を入力してください。</p>

        {/* フォーム */}
        <form className="space-y-4">
            {/* 店舗名 */}
            <div>
            <label className="block text-sm font-medium mb-1">
                店舗名
                <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
            </label>
            <input
                type="text"
                className="w-full border border-black rounded-lg p-2"
            />
            </div>
        
        <hr />

            {/* 郵便番号 */}
            <div>
            <label className="block text-sm font-medium mb-1">
                ご住所 
                <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
            </label>
            <div className="flex items-center space-x-2 mb-2">
                <input
                type="text"
                placeholder="000"
                className="w-16 border border-black rounded-lg p-2"
                />
                <span>-</span>
                <input
                type="text"
                placeholder="0000"
                className="w-20 border border-black rounded-lg p-2"
                />
                <button
                type="button"
                className="bg-gray-300 text-sm text-gray-700 px-2 py-1 rounded"
                >
                住所の自動入力
                </button>
            </div>
            </div>

            {/* 都道府県 */}
            <div>
            <select className="w-full border border-black rounded-lg p-2 text-gray-500">
                <option value="">選択してください。</option>
            </select>
            </div>

            {/* 市区町村 */}
            <input
            type="text"
            placeholder="名古屋市中村区"
            className="w-full border border-black rounded-lg p-2"
            />

            {/* 番地 */}
            <input
            type="text"
            placeholder="～～～ 1-1"
            className="w-full border border-black rounded-lg p-2"
            />

            {/* 建物等 */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    建物等 
                    <span className="text-gray-400 text-sm">任意</span>
                </label>
                <input
                    type="text"
                    placeholder="～～～マンション"
                    className="w-full border border-black rounded-lg p-2"
                />
                </div>
        <hr />
            {/* 電話番号 */}
            <div>
            <label className="block text-sm font-medium mb-1">
                店舗の電話番号 
                <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
            </label>
                <div className="flex space-x-2">
                    <input
                    type="text"
                    placeholder="000"
                    className="w-16 border border-black rounded-lg p-2"
                    />
                    <span>-</span>
                    <input
                    type="text"
                    placeholder="0000"
                    className="w-20 border border-black rounded-lg p-2"
                    />
                    <span>-</span>
                    <input
                    type="text"
                    placeholder="0000"
                    className="w-20 border border-black rounded-lg p-2"
                    />
                </div>
            </div>

        <hr />

            {/* 業態 */}
            <div>
            <label className="block text-sm font-medium mb-1">
                業態 
                <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
            </label>
            <select className="w-full border border-black rounded-lg p-2 text-gray-500">
                <option value="">選択してください。</option>
            </select>
            </div>

            {/* ボタン */}
            <div className="flex justify-between mt-6">
            <button
                type="button"
                className="bg-white-0 text-rose-400 font-bold border-4 border-rose-400 rounded-full px-12 py-2 text-sm">
                戻る
            </button>
            <button
                type="submit"
                className="bg-rose-400 text-white font-bold rounded-full px-12 py-2 text-sm">
                確認
            </button>
            </div>
        </form>
        </div>
    );
    }
