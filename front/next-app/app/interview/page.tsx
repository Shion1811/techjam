'use client';

import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import ArticleCard from '@/components/ArticleCard';

export default function InterviewPage(): JSX.Element {
    const articles = [
        {
        title: '題名（タイトル）',
        date: '2025/08',
        topic: '最新の話題：XXXX',
        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容。',
        },
        {
        title: '題名（タイトル）',
        date: '2025/08',
        topic: '最新の話題：XXXX',
        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容。',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
        <Header storeName="[店舗名]" />
        <Tabs active="インタビュー" />
        <div className="bg-gray-100 p-4 space-y-4">
            {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
            ))}
        </div>
        </div>
    );
}
