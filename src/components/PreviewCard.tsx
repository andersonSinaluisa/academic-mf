import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PreviewField {
    label: string
    value?: string
    fallback?: string
}

interface PreviewCardProps {
    title: string
    description?: string
    icon?: ReactNode
    headerText: string
    badgeText?: string
    badgeClassName?: string
    fields?: PreviewField[]
}

export const PreviewCard = ({
    title,
    description,
    icon,
    headerText,
    badgeText,
    badgeClassName,
    fields = []
}: PreviewCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Header section */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {icon}
                            <h3 className="font-medium">{headerText}</h3>
                        </div>
                        {badgeText && (
                            <Badge className={badgeClassName}>{badgeText}</Badge>
                        )}
                    </div>

                    {/* Fields */}
                    {fields.map((field, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-xs text-muted-foreground">{field.label}</p>
                            <p className="text-sm font-medium">
                                {field.value || field.fallback || "—"}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
