// app/api/search/route.ts
import { NextResponse } from 'next/server';

// ここのデータはDjangoのデータベースを入れる,店舗名も検索できるように
const data = [
  { id: 1, name: 'ラーメン' },
  { id: 2, name: 'そば' },
  { id: 3, name: 'うどん' },
  { id: 4, name: 'カレー' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').toLowerCase();

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}