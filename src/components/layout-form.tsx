import { ReactNode } from "react"
import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

interface BreadcrumbProps {
    label: string
    href?: string
}

interface LayoutFormProps {
    title: string
    description?: string
    breadcrumbs?: BreadcrumbProps[]
    main: ReactNode
    sidebar: ReactNode
    onBack?: () => void
    actions?: ReactNode
}

export const LayoutForm = ({
    title,
    description,
    breadcrumbs = [],
    main,
    sidebar,
    onBack,
    actions
}: LayoutFormProps) => {
    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                {breadcrumbs.map((crumb, idx) => (
                    <div key={idx} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mx-1" />
                        {crumb.href ? (
                            <Link to={crumb.href} className="hover:text-foreground transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-foreground font-medium">{crumb.label}</span>
                        )}
                    </div>
                ))}
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {onBack && (
                        <Button variant="outline" onClick={onBack}>
                            Volver
                        </Button>
                    )}
                    {actions}
                </div>
            </div>

            {/* Main + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">{main}</div>
                <div className="space-y-6">{sidebar}</div>
            </div>
        </div>
    )
}
