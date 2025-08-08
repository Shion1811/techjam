'use client'

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// ===== 店舗詳細データの型定義 =====
type ShopDetails = {
    name: string;
    address: string;
    phone: string;
    business_hours: string;
    regular_holiday: string;
    genre: string;
    payment_methods: string[];
    rating: number;
    website: string;
    images: {
        thumbnail: string;
        full_image: string;
        width: number;
        height: number;
    }[];
    price_level: number;
}

export default function StoreIntroduction() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [shopDetails, setShopDetails] = useState<ShopDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [placeId, setPlaceId] = useState<string | null>(null);

    // ===== URLパラメータを取得 =====
    useEffect(() => {
        console.log('=== URLパラメータ取得開始 ===');
        console.log('searchParams:', searchParams);
        console.log('searchParams.toString():', searchParams?.toString());
        
        // 複数の方法でplace_idを取得
        let id = null;
        
        if (searchParams) {
            id = searchParams.get('place_id');
            console.log('searchParams.get("place_id"):', id);
        }
        
        // フォールバック: window.locationから取得
        if (!id && typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            id = urlParams.get('place_id');
            console.log('window.location.search:', window.location.search);
            console.log('fallback placeId:', id);
        }
        
        // さらにフォールバック: router.queryから取得
        if (!id && typeof window !== 'undefined') {
            const pathname = window.location.pathname;
            const search = window.location.search;
            console.log('pathname:', pathname);
            console.log('search:', search);
            
            // URLから直接place_idを抽出
            const match = search.match(/place_id=([^&]+)/);
            if (match) {
                id = match[1];
                console.log('URL regex match placeId:', id);
            }
        }
        
        console.log('最終的なplaceId:', id);
        setPlaceId(id);
        
    }, [searchParams]);

    // ===== 店舗詳細情報を取得 =====
    useEffect(() => {
        console.log('placeId useEffect実行:', placeId);
        
        if (placeId) {
            console.log('placeIdが見つかりました:', placeId);
            fetchShopDetails();
        } else if (placeId === null) {
            // まだ初期化中
            console.log('placeId初期化中...');
        } else {
            console.log('placeIdがありません');
            setError('店舗IDが指定されていません');
            setLoading(false);
        }
    }, [placeId]);

    const fetchShopDetails = useCallback(async () => {
        try {
            setLoading(true);
            console.log('店舗詳細を取得中:', placeId);
            
            const response = await fetch(`http://127.0.0.1:8086/stores/api/shop-details/${placeId}/`);
            
            console.log('APIレスポンス:', response.status, response.ok);
            
            if (!response.ok) {
                throw new Error('店舗詳細の取得に失敗しました');
            }
            
            const data = await response.json();
            console.log('取得したデータ:', data);
            setShopDetails(data);
            
        } catch (err) {
            console.error('エラーが発生:', err);
            setError(err instanceof Error ? err.message : 'エラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, [placeId]);

    // ===== 戻るボタンの処理 =====
    const handleBack = () => {
        window.history.back();
    };

    // ===== 画像切り替え =====
    const nextImage = () => {
        if (shopDetails && shopDetails.images.length > 0) {
            setCurrentImageIndex((prev) => 
                prev === shopDetails.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (shopDetails && shopDetails.images.length > 0) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? shopDetails.images.length - 1 : prev - 1
            );
        }
    };

    // ===== ローディング中の表示 =====
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-lg mb-2">読み込み中...</div>
                    <div className="text-sm text-gray-600">店舗ID: {placeId || 'なし'}</div>
                </div>
            </div>
        );
    }

    // ===== エラー時の表示 =====
    if (error || !shopDetails) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-lg text-red-600 mb-4">エラーが発生しました</div>
                    <div className="text-sm text-gray-600 mb-4">{error}</div>
                    <div className="text-sm text-gray-500 mb-4">店舗ID: {placeId || 'なし'}</div>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        戻る
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ===== ヘッダー ===== */}
            <div className="bg-white shadow-sm">
                <div className="flex items-center p-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-blue-500 hover:text-blue-600 mr-4"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        戻る
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">{shopDetails.name}</h1>
                </div>
            </div>

            {/* ===== 画像スライダー ===== */}
            {shopDetails.images.length > 0 ? (
                <div className="relative w-full h-64 bg-gray-200">
                    <img 
                        src={shopDetails.images[currentImageIndex].full_image} 
                        alt={`${shopDetails.name} ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                    
                    {/* 画像切り替えボタン */}
                    {shopDetails.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            
                            {/* 画像インジケーター */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                {shopDetails.images.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${
                                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400">画像なし</div>
                </div>
            )}

            {/* ===== 店舗詳細情報 ===== */}
            <div className="p-4 space-y-4 justify-center">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">店舗詳細</h2>
                    
                    <div className="space-y-3">
                        {/* 住所 */}
                        <div className="flex items-start py-2 border-b border-gray-300">
                            <div className="w-3/10 text-sm font-medium text-gray-600">住所</div>
                            <div className="w-7/10 text-sm text-gray-800">{shopDetails.address}</div>
                        </div>

                        {/* 電話番号 */}
                        <div className="flex items-start py-2 border-b border-gray-300">
                            <div className="w-3/10 text-sm font-medium text-gray-600">電話番号</div>
                            <div className="w-7/10 text-sm text-gray-800">{shopDetails.phone}</div>
                        </div>

                        {/* 営業時間 */}
                        <div className="flex items-start py-2 border-b border-gray-300">
                            <div className="w-3/10 text-sm font-medium text-gray-600">営業時間</div>
                            <div className="w-7/10 text-sm text-gray-800">
                                {shopDetails.business_hours.split(' | ').map((day, index) => (
                                    <div key={index} className="py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 定休日 */}
                        <div className="flex items-start py-2 border-b border-gray-300">
                            <div className="w-3/10 text-sm font-medium text-gray-600">定休日</div>
                            <div className="w-7/10 text-sm text-gray-800">{shopDetails.regular_holiday}</div>
                        </div>

                        {/* ジャンル */}
                        <div className="flex items-start py-2 border-b border-gray-300">
                            <div className="w-3/10 text-sm font-medium text-gray-600">ジャンル</div>
                            <div className="w-7/10 text-sm text-gray-800">{shopDetails.genre}</div>
                        </div>

                        {/* 決済手段 */}
                        <div className="flex items-start py-2 border-b border-gray-300">
                            <div className="w-3/10 text-sm font-medium text-gray-600">決済手段</div>
                            <div className="w-7/10 text-sm text-gray-800">
                                {shopDetails.payment_methods.map((method, index) => (
                                    <div key={index} className="py-1">
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 評価 */}
                        {/* {shopDetails.rating > 0 && (
                            <div className="flex items-start py-2">
                                <div className="w-3/10 text-sm font-medium text-gray-600">評価</div>
                                <div className="w-7/10 text-sm text-gray-800">{shopDetails.rating}/5.0</div>
                            </div>
                        )} */}

                        {/* ウェブサイト */}
                        {/* {shopDetails.website && (
                            <div className="flex items-start py-2">
                                <div className="w-3/10 text-sm font-medium text-gray-600">ウェブサイト</div>
                                <div className="w-7/10 text-sm text-gray-800">
                                    <a 
                                        href={shopDetails.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        {shopDetails.website}
                                    </a>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}