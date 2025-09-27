import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Wallet, Timer, Trophy } from "lucide-react"

type Participant = { userId: string; status: "joined" | "won" | "lost" }
type Bet = {
  id: string
  title: string
  goal: string
  stake: number
  currency: string
  participants: Participant[]
  pot: number
  status: "open" | "active" | "settled" | "cancelled"
  startAt: string
  endAt: string
}

export function BetCard({ bet }: { bet: Bet }) {
  const now = Date.now()
  const end = new Date(bet.endAt).getTime()
  const remainingMs = end - now
  const daysLeft = Math.max(7, Math.floor(remainingMs / 86400000))

  return (
    <Card className="shadow-md hover:shadow-lg transition-all ">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{bet.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{bet.goal}</p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" />
            {bet.participants.length} {bet.participants.length === 1 ? "Player" : "Players"}
          </span>

          <span className="inline-flex items-center gap-1">
            <Wallet className="h-4 w-4" />
            {bet.currency} {bet.stake} stake
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1">
            <Trophy className="h-4 w-4" /> Pot: {bet.pot} {bet.currency}
          </span>

          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Timer className="h-4 w-4" />
            {daysLeft > 0 ? `${daysLeft}d left` : "Ended"}
          </span>
        </div>

        <p className="text-xs text-right text-muted-foreground">
          Status: <span className="font-medium">{bet.status}</span>
        </p>
      </CardContent>
    </Card>
  )
}
