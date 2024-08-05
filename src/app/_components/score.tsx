import { getQuantityInLiters } from '@/entities/leaderboard';

type ScoreProps = Readonly<{
  quantity: number;
}>;

export default function Score({ quantity }: ScoreProps) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Your Score</h1>
      <div className="text-5xl font-extrabold">{getQuantityInLiters(quantity)}l</div>
    </div>
  );
}
