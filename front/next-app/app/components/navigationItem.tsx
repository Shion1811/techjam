"use client";
import { useRouter } from "next/navigation";

type NavigationItemProps = {
    notice: string;
    home: string;
    setting: string;
    image: string;
}


export default function NavigationItem({ notice, home, setting, image }: NavigationItemProps) {
    const router = useRouter();

    const handleNoticeClick = () => {
        router.push("/top");  //実際は/noticeのようにお知らせページに移動するようにする
    }
    const handleHomeClick = () => {
        router.push("/top");  //実際は/homeのようにホームページに移動するようにする
    }
    const handleSettingClick = () => {
        router.push("/top");  //実際は/settingのように設定ページに移動するようにする
    }
    return (
        <div className="flex w-full justify-center bg-green h-18 rounded-t-lg fixed bottom-0 gap-13 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.25)]">
            <div
            onClick={handleNoticeClick}
            className="w-auto h-auto flex flex-col items-center justify-center my-auto"
            >
                <img src={image} alt="" className="w-11 h-11 rounded-full bg-white flex flex-col items-center justify-center" />
                <p className="text-white text-small">{notice}</p>
            </div>
            <div
            onClick={handleHomeClick}
            className="w-auto h-auto flex flex-col items-center justify-center my-auto"
            >
                <img src={image} alt="" className="w-11 h-11 rounded-full bg-white flex flex-col items-center justify-center" />
                <p className="text-small text-white">{home}</p>
            </div>
            <div
            onClick={handleSettingClick}
            className="w-auto h-auto flex flex-col items-center justify-center my-auto"
            >
                <img src={image} alt="" className="w-11 h-11 rounded-full bg-white flex flex-col items-center justify-center" />
                <p className="text-small text-white">{setting}</p>
            </div>
        </div>
    )
}