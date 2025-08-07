type InterviewProps = {
    title: string;
    date: string;
    content: string;
}

export default function Interview({ title, date, content }: InterviewProps) {
    return (
        <div className="w-96 h-45 bg-white rounded-lg shadow-md mx-auto my-4">
            <h2 className="text-2xl font-bold bg-brown text-white h-10 flex column items-center rounded-t-lg px-2">{title}</h2>
            <p className="text-sm text-gray-500 bg-background px-2 h-6 flex column items-center">{date}</p>
            <p className="text-sm text-gray-500 mt-2 p-2">{content}</p>
        </div>
    )
}