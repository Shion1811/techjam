import Stamp from "../components/stamp";

export default function TopPage() {
    return (
        <div className="grid grid-cols-3 gap-4 w-100 h-70 mx-auto p-4 bg-beige">
            <Stamp stamp={false} stampImage="/images/2588787.png" />
            <Stamp stamp={true} stampImage="/images/2588787.png" />
            <Stamp stamp={false} stampImage="/images/2588787.png" />
            <Stamp stamp={false} stampImage="/images/2588787.png" />
        </div>
    )
}