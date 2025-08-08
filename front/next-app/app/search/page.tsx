'use client'

import { useState } from 'react';

// ===== Google Maps API用の型定義 =====
type GoogleMapsShop = {
    name: string;
    address: string;
    business_hours: string;
    phone: string;
    rating: number;
    place_id: string;
    location: {
        lat: number;
        lng: number;
    };
    images: {
        thumbnail: string;
        full_image: string;
        width: number;
        height: number;
    }[];
}

export default function SearchPage() {
    // ===== React Hooks（状態管理） =====
    // searchQuery: 検索クエリ
    const [searchQuery, setSearchQuery] = useState('');
    // googleShops: Google Maps APIから取得した店舗データ
    const [googleShops, setGoogleShops] = useState<GoogleMapsShop[]>([]);
    // searchLoading: 検索中の状態
    const [searchLoading, setSearchLoading] = useState(false);
    // error: エラーが発生した場合のエラーメッセージを保存
    const [error, setError] = useState<string | null>(null);

    // ===== Google Maps APIから店舗を検索する関数 =====
    const searchNearbyShops = async () => {
        try {
            setSearchLoading(true);
            setError(null); // エラーをリセット
            
            // 大須商店街の飲食店を自動検索（パラメータ不要）
            const response = await fetch(`http://127.0.0.1:8086/stores/api/search-nearby/`);
            
            if (!response.ok) {
                throw new Error('大須商店街の飲食店検索に失敗しました');
            }
            
            const data = await response.json();
            setGoogleShops(data.shops || []);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : '大須商店街検索エラー');
            setGoogleShops([]); // エラー時は空配列にリセット
        } finally {
            setSearchLoading(false);
        }
    };

    // ===== 検索実行関数 =====
    const handleSearch = () => {
        if (searchQuery.trim()) {
            searchNearbyShops();
        }
    };

    // ===== Enterキーで検索実行 =====
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // ===== 店舗カードをクリックした時の処理 =====
    const handleShopClick = (shop: GoogleMapsShop) => {
        // 店舗詳細ページへの遷移（後で実装予定）
        console.log('店舗をクリック:', shop);
    };

    // ===== メインコンテンツ =====
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-4 py-6 space-y-6">

                {/* ===== 検索機能 ===== */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3">
                        {/* 虫眼鏡アイコン */}
                        <div className="text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        {/* 検索入力フィールド */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="お店を検索"
                            className="flex-1 text-sm border-none outline-none bg-transparent"
                        />
                        {/* 検索ボタン */}
                        <button
                            onClick={handleSearch}
                            disabled={searchLoading || !searchQuery.trim()}
                            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500 font-medium"
                        >
                            {searchLoading ? '検索中...' : '検索'}
                        </button>
                    </div>
                </div>

                {/* ===== エラー表示 ===== */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* ===== Google Maps APIの店舗データ ===== */}
                {googleShops.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">検索結果 ({googleShops.length}件)</h2>
                        <div className="space-y-3">
                            {googleShops.map((shop) => (
                                <div 
                                    key={shop.place_id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => handleShopClick(shop)}
                                >
                                    {/* 店舗情報 */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-base flex-1">{shop.name}</h3>
                                            <div className="text-yellow-500 text-sm font-medium ml-2">
                                                ★ {shop.rating}
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <span className="text-gray-400 mr-2">📍</span>
                                                <span>{shop.address}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-gray-400 mr-2">🕒</span>
                                                <span>{shop.business_hours}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-gray-400 mr-2">📞</span>
                                                <span>{shop.phone}</span>
                                            </div>
                                            {shop.images && shop.images.length > 0 && (
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <span className="text-gray-400 mr-2">📷</span>
                                                    <span>{shop.images.length}枚の画像</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== データが空の場合 ===== */}
                {googleShops.length === 0 && !searchLoading && !error && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-gray-500 text-center">
                            <div className="text-3xl mb-3">🔍</div>
                            <div className="text-sm">検索ボタンを押して大須商店街の飲食店を検索してください</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}