import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getBottlesFromQuantity,
  getQuantityInLiters,
  sumAllQuantities,
} from '@/entities/leaderboard';

import LeaderboardItem from './leaderboard-item';
import { getUsersLeaderboardLoader } from '../loaders';

export default async function Leaderboard() {
  const users = await getUsersLeaderboardLoader();

  const quantitiesSum = sumAllQuantities(users.map(({ quantity }) => quantity));
  const bottles = getBottlesFromQuantity(quantitiesSum);

  return (
    <Card className="w-full flex-1 overflow-y-scroll">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>
          You all have drunk {getQuantityInLiters(quantitiesSum)} liters of beer. That is{' '}
          {bottles} bottles!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-min">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(({ id, name, quantity }, index) => (
              <LeaderboardItem
                key={id}
                name={name}
                quantity={quantity}
                rank={index + 1}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
