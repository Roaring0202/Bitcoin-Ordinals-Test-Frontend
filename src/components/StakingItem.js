export default function StakingItem({ data }) {
    return (
        <div className="h-12">
            { data.id
                ? `${data.id.slice(0, 10)}...${data.id.slice(-5)}`
                : data.id}
        </div>
    );
}
