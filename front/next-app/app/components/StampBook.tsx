// components/StampBook.tsx

const stamps = Array(12).fill({
    shopName: '店舗名',
    date: '2025/08/05',
});

export default function StampBook() {
    return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      {/* ヘッダー画像 */}
        <div className="w-48 h-16 bg-gray-300 mb-6" />

      {/* タイトル */}
        <h1 className="text-2xl font-bold mb-6">スタンプ帳</h1>

      {/* スタンプグリッド */}
        <div className="grid grid-cols-3 gap-4">
        {stamps.map((stamp, index) => (
            <div
            key={index}
            className="bg-gray-500 rounded-xl w-24 h-32 flex flex-col items-center justify-center text-center text-sm text-black p-2"
            >
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2" />
            <div>{stamp.shopName}</div>
            <div className="text-xs">{stamp.date}</div>
            </div>
        ))}
        </div>
    </div>
    );
}
