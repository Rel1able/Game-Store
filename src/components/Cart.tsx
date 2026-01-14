export default function Cart({ count, games, price }) {
    return (
        <div>
            <div>
                <div>{count} Games</div>
                <button>Clear</button>
            </div>
            <ul>
                {games.map((game) => (
                    <li>{game.name}</li>
                ))}
            </ul>
            <div>Total: {price}&euro;</div>
        </div>
    )
}