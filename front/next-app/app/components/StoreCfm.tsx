'use client';

import { useRouter } from 'next/navigation';
import Link from'next/link';

export default function StoreRegisterConfirm() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white p-4 text-black">
        {/* 戻るボタン */}
        <button className="text-2xl mb-4" onClick={() => router.back()}>
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

        {/* 開業情報 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">開業情報</p>
            <p className="text-xs text-gray-500">開業済み</p>
        </div>

        {/* 名前 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">名前</p>
            <p className="text-xs text-gray-500">山田　太郎</p>
        </div>

        {/* 名前（カナ） */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">名前（カナ）</p>
            <p className="text-xs text-gray-500">ヤマダ　タロウ</p>
        </div>

        {/* メールアドレス */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">メールアドレス</p>
            <p className="text-xs text-gray-500">vanatan@gmail.com</p>
        </div>

        {/* 生年月日 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">生年月日</p>
            <p className="text-xs text-gray-500">2000年1月1日</p>
        </div>

        {/* ご連絡電話番号 */}
        <div className="border-t border-black pt-2 mb-4">
            <p className="text-sm font-semibold">ご連絡電話番号</p>
            <p className="text-xs text-gray-500">000-0000-0000</p>
        </div>

        {/* 立場 */}
        <div className="border-t border-black pt-2 mb-8">
            <p className="text-sm font-semibold">立場</p>
            <p className="text-xs text-gray-500">
            飲食店
            <br />
            経営者/オーナー
            </p>
        </div>

        {/* ボタン */}
            <div className="flex justify-between mt-6">
            <button
                type="button"
                onClick={() => router.back()}
                className="bg-white-0 text-rose-400 font-bold border-4 border-rose-400 rounded-full px-12 py-2 text-sm">
                戻る
            </button>
            <button
                type="submit"
                onClick={() => router.push('/StorePf')}
                className="bg-rose-400 text-white font-bold rounded-full px-12 py-2 text-sm">
                送信
            </button>
            </div>
        </div>
    );
}
