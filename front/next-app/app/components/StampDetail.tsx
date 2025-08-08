// components/StampDetail.tsx

export default function StampDetail() {
    return (
    <div className="min-h-screen bg-white p-4 text-black">
      {/* 戻るボタン */}
        <button className="text-2xl mb-4">{'‹'}</button>

      {/* 店舗画像（ダミー） */}
        <div className="w-60 h-60 bg-gray-300 rounded-full mx-auto mb-4" />

      {/* 店舗名と日付 */}
        <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">店舗名</h2>
        <p className="text-sm">2025/08/05</p>
        </div>

      {/* 詳細情報 */}
        <div className="space-y-4 text-sm">
        <div>
            <p className="text-gray-600">営業時間</p>
            <p>10:00~20:00</p>
            <hr />
        </div>

        <div>
            <p className="text-gray-600">定休日</p>
            <p>年中無休</p>
            <hr />
        </div>

        <div>
            <p className="text-gray-600">TEL</p>
            <p>000-000-0000</p>
            <hr />
        </div>

        <div>
            <p className="text-gray-600">住所</p>
            <p>〒000-0000 愛知県 名古屋市大須 ...</p>
            <hr />
        </div>
        </div>

      {/* マップボタン */}
        <div className="mt-6 text-center">
        <button className="bg-rose-400 text-white rounded-full px-8 py-2 text-sm">
            マップを見る
        </button>
        </div>
    </div>
    );
}
