'use client'

import { useState, useEffect } from 'react';

// ===== 変更前のprops型定義（コメントアウト） =====
// type ListShopProps = {
//     shopName: string;
//     address : string;
//     businessHours : string;
//     tel : string;
//     url : string; //ここに店舗詳細のurlを入れる
//     image : string;
// }

// ===== 新しいAPI用の型定義 =====
// APIから取得する店舗データの型を定義
type Shop = {
    id: number;        // 店舗のID（データベースの主キー）
    name: string;      // 店舗名
    address: string;   // 店舗の住所
}

// ===== 変更前のコンポーネント（コメントアウト） =====
// export default function ListShop({ shopName, address, businessHours, tel, url, image }: ListShopProps) {
//     const handleClick = () => {
//         window.open(url, 'url');
//     }
//     return (
//         <div className="flex w-95 h-39 bg-white rounded-lg shadow-md  justify-center items-center gap-4 cursor-pointer" onClick={handleClick}>
//             <div className="w-30 h-35 ">
//                 <img src={image} alt="thumbnailImage" className="w-full h-full object-cover" />
//             </div>
//             <div className="flex flex-col">
//                 <div className="text-sm font-bold">{shopName}</div>
//                 <div className="text-sm text-black">{address}</div>
//                 <div className="text-sm text-black">{businessHours}</div>
//                 <div className="text-sm text-black">{tel}</div>
//             </div>
//         </div>
//     )
// }

// ===== 新しいAPI連携コンポーネント =====
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

    // ===== エラーが発生した場合の表示 =====
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">エラー: {error}</div>
            </div>
        );
    }

    // ===== 店舗データが空の場合の表示 =====
    if (shops.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">店舗が登録されていません</div>
            </div>
        );
    }

    // ===== 店舗一覧の表示 =====
    return (
        <div className="space-y-4">
            {/* map関数でshops配列の各要素を店舗カードに変換 */}
            {shops.map((shop) => (
                <div 
                    key={shop.id} // Reactのkey属性（各要素を識別するため）
                    className="flex w-95 h-39 bg-white rounded-lg shadow-md justify-center items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleShopClick(shop)} // クリック時に店舗データを渡す
                >
                    {/* 画像エリア（現在はプレースホルダー） */}
                    <div className="w-30 h-35 bg-gray-200 rounded">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            画像なし
                        </div>
                    </div>
                    
                    {/* 店舗情報エリア */}
                    <div className="flex flex-col">
                        {/* APIから取得した店舗名を表示 */}
                        <div className="text-sm font-bold">{shop.name}</div>
                        {/* APIから取得した住所を表示 */}
                        <div className="text-sm text-black">{shop.address}</div>
                        {/* 現在は未実装の項目 */}
                        <div className="text-sm text-gray-500">営業時間: 未設定</div>
                        <div className="text-sm text-gray-500">電話: 未設定</div>
                    </div>
                </div>
            ))}
        </div>
    );
}