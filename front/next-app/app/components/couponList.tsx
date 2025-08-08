'use client';
import Link from 'next/link';
import React from 'react';

type CouponStatus = 'available' | 'notYet' | 'expired';

interface Coupon {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    image: string;
    status: CouponStatus;
}

const getStatusLabel = (status: CouponStatus) => {
    switch (status) {
        case 'available':
            return '利用可';
        case 'notYet':
            return '利用期間前';
        case 'expired':
            return '利用不可';
    }
};

const getStatusStyle = (status: CouponStatus) => {
    switch (status) {
        case 'available':
            return 'bg-[#6b4c3b] text-white';
        case 'notYet':
            return 'border border-[#6b4c3b] text-[#6b4c3b] bg-white';
        case 'expired':
            return 'bg-gray-400 text-white';
    }
};

const CouponList = () => {
    const coupons: Coupon[] = [
        // ...既存のクーポン配列...
        {
            id: 1,
            title: 'ダウンロード特典クーポン',
            startDate: '2025年08月05日10:00',
            endDate: '2025年09月06日00:00',
            image: '/img/coupon-1.png',
            status: 'available',
        },
        {
            id: 1,
            title: 'ダウンロード特典クーポン',
            startDate: '2025年08月05日10:00',
            endDate: '2025年09月06日00:00',
            image: '/img/coupon-1.png',
            status: 'available',
        },
        {
            id: 1,
            title: 'ダウンロード特典クーポン',
            startDate: '2025年08月05日10:00',
            endDate: '2025年09月06日00:00',
            image: '/img/coupon-1.png',
            status: 'available',
        },
        {
        id: 2,
        title: '夏の割引クーポン',
        startDate: '2025年08月10日10:00',
        endDate: '2025年09月01日00:00',
        image: '/img/coupon-1.png',
        status: 'notYet',
    },
    {
        id: 3,
        title: 'お友達紹介クーポン',
        startDate: '2025年07月01日10:00',
        endDate: '2025年08月01日00:00',
        image: '/img/coupon-1.png',
        status: 'expired',
    },
    ];

    return (
        <div className="min-h-screen bg-white p-4 text-black">
            {/* 戻るボタン */}
            <button className='text-2xl mb-4' onClick={() => window.history.back()}>
                {'<'}
            </button>
            <div className="max-w-md mx-auto px-4 pt-6 pb-24 bg-white min-h-screen relative">
                <h1 className="text-xl font-bold text-center mb-6">クーポン一覧</h1>
                {coupons.map((coupon) => (
                    <div key={coupon.id} className="border-b pb-4 mb-4 flex items-start">
                        <img
                            src={coupon.image}
                            alt={coupon.title}
                            className="w-20 h-20 object-cover mr-4"
                        />
                        <div className="flex-1">
                            <h2 className="font-semibold text-sm mb-1">{coupon.title}</h2>
                            <p className="text-xs text-gray-600">
                                ご利用開始日: {coupon.startDate}
                            </p>
                            <p className="text-xs text-gray-600">
                                ご利用終了日: {coupon.endDate}
                            </p>
                            <button
                                className={`mt-2 px-4 py-1 text-sm rounded-full ${getStatusStyle(
                                    coupon.status
                                )}`}
                                disabled={coupon.status !== 'available'}
                            >
                                {getStatusLabel(coupon.status)}
                            </button>
                        </div>
                    </div>
                ))}
                {/* Bottom Navigation */}
                <footer className="fixed bottom-0 left-0 right-0 bg-[#8a9a5b] text-white flex justify-around items-center h-16">
                    <Link href="#" className="flex flex-col items-center text-xs">
                        <span><img src='/img/home.png' alt="お知らせ" className="w-5 h-6 mb-1"/></span>
                        お知らせ
                    </Link>
                    <Link href="#" className="flex flex-col items-center text-xs">
                        <span><img src='/img/home.png' alt="ホーム" className="w-5 h-6 mb-1"/></span>
                        ホーム
                    </Link>
                    <Link href="#" className="flex flex-col items-center text-xs">
                        <span><img src='/img/setting.png' alt="設定" className="w-5 h-6 mb-1"/></span>
                        設定
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default CouponList;