'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
    storeName: string;
}

export default function Header({ storeName }: HeaderProps): JSX.Element {
    const router = useRouter();

    return (
        <div className="flex items-center p-4">
        <button onClick={() => router.back()} className="text-xl mr-2">
            &lt;
        </button>
        <h1 className="text-lg font-semibold">{storeName}</h1>
        </div>
    );
}
