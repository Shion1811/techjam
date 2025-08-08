'use client'

import { useState, useEffect } from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

// ===== 店舗データの型定義 =====
type Shop = {
    id: number;
    name: string;
    address: string;
    business_hours: string;
    phone: string;
}

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

export default function TopPage() {
    // ===== React Hooks（状態管理） =====
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState<GoogleMapsShop[]>([]);
    const [randomShops, setRandomShops] = useState<Shop[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ===== 初期表示時にランダム店舗を取得 =====
    useEffect(() => {
        fetchRandomShops();
    }, []);

    // ===== 大須商店街の飲食店をランダムで取得 =====
    const fetchRandomShops = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8086/stores/api/shops/');
            
            if (!response.ok) {
                throw new Error('店舗データの取得に失敗しました');
            }
            
            const data = await response.json();
            // ランダムに並び替え（最大10件表示）
            const shuffled = data.sort(() => 0.5 - Math.random());
            setRandomShops(shuffled.slice(0, 10));
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    // ===== Google Maps APIから店舗を検索する関数 =====
    const searchNearbyShops = async () => {
        setSearchLoading(true);
        setError(null);
        
        try {
            // 検索クエリをURLパラメータとして送信
            const searchParams = new URLSearchParams();
            if (searchQuery.trim()) {
                searchParams.append('q', searchQuery.trim());
            }
            
            const response = await fetch(`http://127.0.0.1:8086/stores/api/search-nearby/?${searchParams.toString()}`);
            
            if (!response.ok) {
                throw new Error('大須商店街の飲食店検索に失敗しました');
            }
            
            const data = await response.json();
            setSearchResults(data.shops || []);
            setIsSearchMode(true);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : '大須商店街検索エラー');
            setSearchResults([]);
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

    // ===== 検索をリセット =====
    const handleResetSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearchMode(false);
        setError(null);
    };

    // ===== 店舗カードをクリックした時の処理 =====
    const handleShopClick = (shop: Shop | GoogleMapsShop) => {
        console.log('店舗をクリック:', shop);
    };

    // ===== ローディング中の表示 =====
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-4 py-6 space-y-6">
                {/* ===== ページタイトル ===== */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">大須商店街</h1>
                    <p className="text-gray-600">お気に入りのお店を見つけよう</p>
                </div>

                {/* ===== 検索機能 ===== */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div 
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => {
                            // 検索ボックス全体をクリックした時にフォーカスを当てる
                            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                            if (input) {
                                input.focus();
                            }
                        }}
                    >
                        {/* 虫眼鏡アイコン */}
                        <div className="text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        {/* 検索入力フィールド - クリック可能なエリア */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={() => {
                                    // フォーカス時に検索ボックスが空でない場合は検索実行
                                    if (searchQuery.trim()) {
                                        handleSearch();
                                    }
                                }}
                                placeholder="店舗名・ジャンル"
                                className="w-full text-sm border-none outline-none bg-transparent cursor-text"
                            />
                        </div>
                        {/* 検索ボタン */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // 親要素のクリックイベントを防ぐ
                                handleSearch();
                            }}
                            disabled={searchLoading || !searchQuery.trim()}
                            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500 font-medium"
                        >
                            {searchLoading ? '検索中...' : '検索'}
                        </button>
                        {/* リセットボタン（検索モード時のみ表示） */}
                        {isSearchMode && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // 親要素のクリックイベントを防ぐ
                                    handleResetSearch();
                                }}
                                className="px-3 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                リセット
                            </button>
                        )}
                    </div>
                    {/* 検索例のヘルプテキスト */}
                    {/* <div className="mt-3 text-xs text-gray-500">
                        <span className="font-medium">検索例:</span> 中華、ラーメン、寿司、パスタ、カフェ、焼肉、居酒屋
                    </div> */}
                </div>

                {/* ===== エラー表示 ===== */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* ===== 検索結果表示 ===== */}
                {isSearchMode && searchResults.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">検索結果 ({searchResults.length}件)</h2>
                        <div className="space-y-3">
                            {searchResults.map((shop) => (
                                <div 
                                    key={shop.place_id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => handleShopClick(shop)}
                                >
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-base flex-1">{shop.name}</h3>
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== ランダム店舗表示（検索モードでない場合） ===== */}
                {!isSearchMode && randomShops.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">おすすめのお店 ({randomShops.length}件)</h2>
                        <div className="space-y-4">
                            {randomShops.map((shop) => (
                                <div 
                                    key={shop.id}
                                    className="flex w-full bg-white rounded-lg shadow-md justify-center items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow p-4"
                                    onClick={() => handleShopClick(shop)}
                                >
                                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                                        <div className="text-gray-400 text-xs">画像なし</div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="text-sm font-bold">{shop.name}</div>
                                        <div className="text-sm text-gray-600">{shop.address}</div>
                                        <div className="text-sm text-gray-600">{shop.business_hours}</div>
                                        <div className="text-sm text-gray-600">{shop.phone}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== データが空の場合 ===== */}
                {((isSearchMode && searchResults.length === 0 && !searchLoading) || 
                  (!isSearchMode && randomShops.length === 0)) && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-gray-500 text-center">
                            <div className="text-3xl mb-3">🏪</div>
                            <div className="text-sm">
                                {isSearchMode ? '検索結果が見つかりませんでした' : '店舗データがありません'}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
