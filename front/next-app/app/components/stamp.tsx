type StampProps = {
    stamp: boolean;
    stampImage: string;
}

export default function Stamp({ stamp, stampImage }: StampProps) {
    return (
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
            {stamp ? (
                <img src={stampImage} alt="stamp" className="w-16 h-16 object-cover rounded-full" />
            ) : (
                <div className="w-16 h-16 bg-red-500 rounded-full" />
            )}
        </div>
    )
}