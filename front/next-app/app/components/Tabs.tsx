'use client';

interface TabsProps {
  active: string;
}

export default function Tabs({ active }: TabsProps): JSX.Element {
    const tabs = ['トップ', 'インタビュー', '写真'];

    return (
        <div className="flex justify-center space-x-2 mb-4">
        {tabs.map((tab) => (
            <button
            key={tab}
            className={`px-4 py-1 rounded-full text-sm ${
                active === tab
                ? 'bg-gray-500 text-white'
                : 'bg-[#d7d6aa] text-black'
            }`}
            >
            {tab}
            </button>
        ))}
        </div>
    );
}
