import { ReactNode } from "react"
import { Check } from "lucide-react"

type GuidelineItem = {
    icon?: ReactNode
    text: string
    variant?: "default" | "danger"
}

interface GuidelinesListProps {
    items: GuidelineItem[]
}

export const GuidelinesList = ({ items }: GuidelinesListProps) => {
    return (
        <ul className="space-y-3 text-sm">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                    {item.icon ? (
                        <div className="mr-2 mt-0.5">{item.icon}</div>
                    ) : (
                        <Check
                            className={`h-4 w-4 mr-2 mt-0.5 ${item.variant === "danger"
                                    ? "text-destructive"
                                    : "text-primary"
                                }`}
                        />
                    )}
                    <span>{item.text}</span>
                </li>
            ))}
        </ul>
    )
}
