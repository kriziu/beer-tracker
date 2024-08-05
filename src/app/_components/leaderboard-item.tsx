import { User } from 'lucide-react';

import { TableRow, TableCell } from '@/components/ui/table';
import { getQuantityInLiters, getRankClassName } from '@/entities/leaderboard';
import { cn } from '@/lib/utils';

type LeaderboardItemProps = Readonly<{
  name: string;
  quantity: number;
  rank: number;
}>;

export default function LeaderboardItem({ name, quantity, rank }: LeaderboardItemProps) {
  return (
    <TableRow>
      <TableCell className="flex items-center">
        <RankIndicator rank={rank} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="size-5" />
          <p>{name}</p>
        </div>
      </TableCell>
      <TableCell className="text-right">{getQuantityInLiters(quantity)}l</TableCell>
    </TableRow>
  );
}

function RankIndicator({ rank }: { rank: number }) {
  return (
    <div className="grid place-items-center w-full">
      <div
        className={cn(
          'size-6 rounded-full grid place-items-center',
          getRankClassName(rank),
        )}
      >
        {rank}
      </div>
    </div>
  );
}
