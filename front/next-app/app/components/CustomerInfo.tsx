// components/Customerinfo.tsx
'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
export default function StoreInfo() {
    const router = useRouter();

    return (
    <div className="min-h-screen bg-white p-4 text-black">
        {/* 戻るボタン */}
        <button className="text-2xl mb-4" onClick={() => router.back()}>{'‹'}</button>


      {/* 店舗画像の枠 */}
        <div className="flex justify-center mb-4">
            <Link href="/top/pages">
                <img src="/images/techjam-logo.png" alt="LOGO" className="w-12 h-12"/>
            </Link>
        </div>
      {/* タイトル */}
        <h1 className="text-xl font-bold text-center mb-8">店舗登録</h1>

        {/* お客様情報の枠 */}
        <h2 className="py-2 pl-2 text-lg text-white font-semibold mb-4 bg-gray-400">お客様情報</h2>

        <p className="text-xs mt-2 py-2">お客様情報の情報を入力してください。</p>

    <hr />

        <div className="flex items-center mb-2 py-2">
            <p className="text-sm mr-2">名前</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>
        <input 
            type = "text"
            placeholder = "山田 太郎"
            className = "w-full p-2 border border-gray-300 rounded mb-4"></input>

        <div className="flex items-center mb-2">
            <p className="text-sm mr-2">名前（カナ）</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>
        <input 
            type = "text"
            placeholder = "ヤマダ タロウ"
            className = "w-full p-2 border border-gray-300 rounded mb-4"></input>

    <hr />

        {/*　 メールアドレスの枠 */}

        <div className="flex items-center mb-2 py-2">
            <p className="text-sm mr-2">メールアドレス</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>
        <input 
            type = "text"
            placeholder = "vantan@gmail.com"
            className = "w-full p-2 border border-gray-300 rounded mb-4"></input>

    <hr />

        <div className="flex items-center mb-2 py-2">
            <p className="text-sm mr-2">生年月日</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>
        <input 
            type = "text"
            placeholder = "2000年1月1日の場合 ※20000101"
            className = "w-full p-2 border border-gray-300 rounded mb-4"></input>

    <hr />

        <div className="flex items-center mb-2 py-2">
            <p className="text-sm mr-2">電話番号</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>

        <input
            type = "text"
            placeholder = "08012345678"
            className = "w-full p-2 border border-gray-300 rounded mb-2"></input>

        <p className="text-xs mb-2">※お客様の電話番号推奨。</p>

    <hr />
        <div className="flex items-center mb-2 py-2">
            <p className="text-sm mr-2">立場</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>

        <p className="text-xs mb-2">該当する立場を一件以上選択してください。</p>
        <p className="text-sm mr-2 mt-4">飲食店</p>

        <div className="item-center mb-2 py-2">
      {/* チェックボックス2つを横並び */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex items-center space-x-2 bg-sky-100 border border-gray-300 px-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>経営者/オーナー</span>
                </label>
                <label className="flex items-center space-x-2 bg-sky-100 border border-gray-300 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>店長</span>
                </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex items-center space-x-2 bg-sky-100 border border-gray-300 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>シェフ/料理人</span>
                </label>
                <label className="flex items-center space-x-2 bg-sky-100 border border-gray-300 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>スタッフ</span>
                </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex items-center space-x-2 bg-sky-100 border border-gray-300 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>仕入れ責任者</span>
                </label>
                <label className="flex items-center space-x-2 bg-sky-100 border border-gray-300 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>開業検討中</span>
                </label>
            </div >
            <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="items-center space-x-2 bg-sky-100 border border-gray-300 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>その他</span>
                </label>
            </div>
            </div>

        <hr />

        <div className="flex items-center mb-2 py-2">
            <p className="text-sm mr-2">個人情報の取り扱い</p>
            <span className="text-white bg-rose-400 text-xs px-2 py-0.5 rounded-full">必須</span>
        </div>

        <p className="text-xs">店舗登録には、個人情報の取り扱いに同意いただく必要がございます。</p>
        <p className="text-xs mb-2">以下の条件に同意の上、次のへお進みください。</p>

        <p className="text-sm font-semibold mb-2 text-blue-400">個人情報の取り扱いについて</p>
        
            <div className="p-2 border border-gray-300 rounded mb-2 bg-sky-100">
                <label className="items-center space-x-2 px-2 py-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>その他</span>
                </label>
            </div>

        <div className="flex justify-between mt-6">{/*text-center grid grid-cols-2 gap-2 mt-6*/}
            <button className="bg-white-0 text-rose-400 font-bold border-4 border-rose-400 rounded-full px-12 py-2 text-sm"
            onClick={() => router.back()}
            >
            戻る
            </button>
            <button className="bg-rose-400 text-white font-bold rounded-full px-12 py-2 text-sm"
            onClick={() => router.push('/StoreInfo')}
            >
            次へ
            </button>
        </div>
        

        </div>
    )};