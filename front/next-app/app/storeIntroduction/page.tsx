type StoreIntroductionProps = {
    shopName: string;
    // top,interview,imgのcomponentを挿入
    thumbnailImage: string;
    // 店舗詳細
    access: string;
    tel: string;
    paymentMethod: string;
    coupon: string;
    reservation: string;
    businessHours: string;
    regularHoliday: string;
    genre: string;
    budget: string;
    url: string;
}

export default function StoreIntroduction({ shopName, thumbnailImage, access, tel, paymentMethod, coupon, reservation, businessHours, regularHoliday, genre, budget, url }: StoreIntroductionProps) {
    // データベースから取得する前の仮置き
    const placeholderImage = thumbnailImage || "/images/2588787.png";
    const placeholderAccess = access || "愛知県愛知市愛知町愛知番目1-1";
    const placeholderTel = tel || "090-1234-5678";
    const placeholderPaymentMethod = paymentMethod || "クレジットカード,現金";
    const placeholderCoupon = coupon || "あり";
    const placeholderReservation = reservation || "あり";
    const placeholderBusinessHours = businessHours || "10:00-20:00";
    const placeholderRegularHoliday = regularHoliday || "火曜日";
    const placeholderGenre = genre || "ラーメン";
    const placeholderBudget = budget || "1000円";
    return (
        <div>
            <div className="flex justify-start m-3 gap-5">
                <div><p>戻る</p></div>     {/*  最後にページが戻れるように編集 */}
                <h2 className="bg-red-500 w-50">{shopName}</h2>
            </div>
            {/* ここにtop,interview,imgのcomponentを挿入 */}
            <div className="w-full h-64 bg-gray-200">
                <img src={placeholderImage} alt="thumbnailImage" className="w-full h-full object-cover"/>
            </div>
            <div className="flex justify-start m-3 gap-4">
                <div className="flex flex-col">
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">アクセス</p>
                        <p className="text-sm text-black">{placeholderAccess}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">電話番号</p>
                        <p className="text-sm text-black">{placeholderTel}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">支払い方法</p>
                        <p className="text-sm text-black">{placeholderPaymentMethod}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">クーポン</p>
                        <p className="text-sm text-black">{placeholderCoupon}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">  
                        <p className="w-30">予約</p>
                        <p className="text-sm text-black">{placeholderReservation}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">営業時間</p>
                        <p className="text-sm text-black">{placeholderBusinessHours}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">定休日</p>
                        <p className="text-sm text-black">{placeholderRegularHoliday}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">ジャンル</p>
                        <p className="text-sm text-black">{placeholderGenre}</p>
                    </div>
                    <div className="flex justify-start m-3 gap-4">
                        <p className="w-30">予算</p>
                        <p className="text-sm text-black">{placeholderBudget}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}