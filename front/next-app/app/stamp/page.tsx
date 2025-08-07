import Stamp from "@/components/stamp";

export default function StampPage() {
    return (
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto p-4 bg-beige">
            <Stamp stamp={false} stampImage="/images/2588787.png" />
            <Stamp stamp={true} stampImage="/images/2588787.png" />
            <Stamp stamp={false} stampImage="/images/2588787.png" />
            <Stamp stamp={false} stampImage="/images/2588787.png" />
        </div>
    )
}