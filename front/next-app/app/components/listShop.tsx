'use client'

import { useState, useEffect } from 'react';

// ===== 新しいAPI用の型定義 =====
// APIから取得する店舗データの型を定義
type Shop = {
    id: number;        // 店舗のID（データベースの主キー）
    name: string;      // 店舗名
    address: string;   // 店舗の住所
    business_hours: string; // 営業時間
    phone: string;     // 電話番号
}

// ===== 登録済み店舗表示コンポーネント =====
export default function ListShop() {
    // ===== React Hooks（状態管理） =====
    // shops: APIから取得した店舗データを保存する配列
    const [shops, setShops] = useState<Shop[]>([]);
    // loading: データ取得中かどうかを管理（true=取得中, false=完了）
    const [loading, setLoading] = useState(true);
    // error: エラーが発生した場合のエラーメッセージを保存
    const [error, setError] = useState<string | null>(null);

    // ===== useEffect（副作用） =====
    // コンポーネントが最初に表示された時に1回だけ実行される
    useEffect(() => {
        fetchShops(); // 店舗データを取得する関数を呼び出し
    }, []); // 空の配列を渡すことで、初回のみ実行される

    // ===== APIからデータを取得する関数 =====
    const fetchShops = async () => {
        try {
            // Django APIのエンドポイントにGETリクエストを送信
            // http://127.0.0.1:8086/stores/api/shops/ は店舗一覧を取得するAPI
            const response = await fetch('http://127.0.0.1:8086/stores/api/shops/');
            
            // レスポンスが正常でない場合（404, 500エラーなど）
            if (!response.ok) {
                throw new Error('店舗データの取得に失敗しました');
            }
            
            // レスポンスをJSON形式に変換
            const data = await response.json();
            // 取得したデータをshopsの状態に保存
            setShops(data);
            
        } catch (err) {
            // エラーが発生した場合の処理
            setError(err instanceof Error ? err.message : 'エラーが発生しました');
        } finally {
            // 成功・失敗に関わらず、ローディング状態をfalseにする
            setLoading(false);
        }
    };

    // ===== 店舗カードをクリックした時の処理 =====
    const handleShopClick = (shop: Shop) => {
        // 店舗詳細ページへの遷移（後で実装予定）
        console.log('店舗をクリック:', shop);
    };

    // ===== ローディング中の表示 =====
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">読み込み中...</div>
            </div>
        );
    }

    // ===== メインコンテンツ =====
    return (
        <div className="space-y-6">
            {/* ===== ページタイトル ===== */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">登録済み店舗一覧</h1>
                <p className="text-gray-600">データベースに登録されている店舗を表示します</p>
            </div>

            {/* ===== エラー表示 ===== */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* ===== 登録済み店舗データ ===== */}
            {shops.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold mb-4">店舗一覧 ({shops.length}件)</h2>
                    <div className="space-y-4">
                        {shops.map((shop) => (
                            <div 
                                key={shop.id}
                                className="flex w-95 h-39 bg-white rounded-lg shadow-md justify-center items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => handleShopClick(shop)}
                            >
                                <div className="w-30 h-35 bg-gray-200 rounded">
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        画像なし
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-bold">{shop.name}</div>
                                    <div className="text-sm text-black">{shop.address}</div>
                                    <div className="text-sm text-black">{shop.business_hours}</div>
                                    <div className="text-sm text-black">{shop.phone}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ===== データが空の場合 ===== */}
            {shops.length === 0 && (
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500 text-center">
                        <div className="text-2xl mb-2">🏪</div>
                        <div>登録済みの店舗がありません</div>
                    </div>
                </div>
            )}
        </div>
    );
}