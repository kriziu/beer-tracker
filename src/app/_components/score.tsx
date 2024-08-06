import { getBottlesFromQuantity, getQuantityInLiters } from '@/entities/leaderboard';

type ScoreProps = Readonly<{
  quantity: number;
}>;

export default function Score({ quantity }: ScoreProps) {
  const bottlesCount = getBottlesFromQuantity(quantity);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">Your Score</h1>
      <p className="text-5xl font-extrabold">{getQuantityInLiters(quantity)}l</p>
      <p>({bottlesCount} bottles)</p>
    </div>
  );
}
