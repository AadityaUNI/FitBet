import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils" // comes with shadcn starter; otherwise make a simple cn helper
import type { LucideIcon } from "lucide-react"

type Variant = "green" | "orange" | "indigo" | "violet"

const styles: Record<Variant, { bg: string; text: string; ring: string; icon: string }> = {
  green:  { bg: "bg-green-50",  text: "text-green-700",  ring: "ring-green-200",  icon: "text-green-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200", icon: "text-orange-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200", icon: "text-indigo-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200", icon: "text-violet-600" },
}

export function StatCard({
  icon: Icon,
  value,
  label,
  variant = "green",
  className,
}: {
  icon: LucideIcon
  value: string | number
  label: string
  variant?: Variant
  className?: string
}) {
  const s = styles[variant]
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 ring-1 transition-shadow hover:shadow-md",
        s.bg, s.ring, "p-2", className
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-6">
          <div className={cn(
            "grid h-10 w-10 place-items-center rounded-xl bg-white/70",
            "ring-1 ring-black/5 backdrop-blur-sm", s.icon
          )}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="ml-auto text-right">
            <div className={cn("text-4xl font-semibold leading-none tracking-tight", s.text)}>
              {value}
            </div>
            <div className={cn("mt-2 text-sm font-medium", s.text)}>{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}