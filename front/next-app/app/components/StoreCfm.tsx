'use client';

import { useRouter } from 'next/navigation';

export default function StoreRegisterConfirm() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white p-4 text-black">
        {/* 戻るボタン */}
        <button className="text-2xl mb-4" onClick={() => router.push('/Storeinfo')}>
            {'‹'}
        </button>

        {/* ロゴ画像エリア */}
        <div className="w-48 h-16 bg-gray-300 mx-auto mb-6" />

        {/* タイトル */}
        <h1 className="text-center text-2xl font-bold mb-4">店舗登録</h1>

        {/* 開業情報 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">開業情報</p>
            <p className="text-xs text-gray-500">開業済み</p>
        </div>

        {/* 名前 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">名前</p>
            <p>山田　太郎</p>
        </div>

        {/* 名前（カナ） */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">名前（カナ）</p>
            <p>ヤマダ　タロウ</p>
        </div>

        {/* メールアドレス */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">メールアドレス</p>
            <p className="font-medium">vanatan@gmail.com</p>
        </div>

        {/* 生年月日 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">生年月日</p>
            <p>2000年1月1日</p>
        </div>

        {/* ご連絡電話番号 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">ご連絡電話番号</p>
            <p>000-0000-0000</p>
        </div>

        {/* 立場 */}
        <div className="border-t border-black pt-2 mb-8">
            <p className="text-sm font-semibold">立場</p>
            <p>
            飲食店
            <br />
            経営者/オーナー
            </p>
        </div>

        {/* ボタン */}
        <div className="flex justify-between">
            <button
            className="w-28 bg-white border border-red-400 text-red-500 py-2 rounded-lg"
            onClick={() => router.back()}
            >
            戻る
            </button>
            <button
            className="w-28 bg-red-400 text-white py-2 rounded-lg"
            onClick={() => alert('送信しました')}
            >
            送信
            </button>
        </div>
        </div>
    );
    }

