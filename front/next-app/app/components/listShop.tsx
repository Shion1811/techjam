'use client'

type ListShopProps = {
    shopName: string;
    address : string;
    businessHours : string;
    tel : string;
    url : string; //ここに店舗詳細のurlを入れる
    image : string;
}

export default function ListShop({ shopName, address, businessHours, tel, url, image }: ListShopProps) {
    const handleClick = () => {
        window.open(url, 'url');
    }
    return (
        <div className="flex w-95 h-39 bg-white rounded-lg shadow-md  justify-center items-center gap-4 cursor-pointer" onClick={handleClick}>
            <div className="w-30 h-35 ">
                <img src={image} alt="thumbnailImage" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
                <div className="text-sm font-bold">{shopName}</div>
                <div className="text-sm text-black">{address}</div>
                <div className="text-sm text-black">{businessHours}</div>
                <div className="text-sm text-black">{tel}</div>
            </div>
        </div>
    )
}