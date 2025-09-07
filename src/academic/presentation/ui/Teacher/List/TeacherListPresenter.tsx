"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Phone } from "lucide-react"
import { Teacher } from "@/academic/domain/entities/Teacher"

interface TeacherListPresenterProps {
    teachers: Teacher[]
    loading: boolean
    error: string | null
    searchTerm: string
    onSearchChange: (term: string) => void
    onAddTeacher: () => void
}

export function TeacherListPresenter({
    teachers,
    loading,
    error,
    searchTerm,
    onSearchChange,
    onAddTeacher,
}: TeacherListPresenterProps) {
    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-8">
                    <div className="text-muted-foreground">Cargando docentes...</div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-8">
                    <div className="text-destructive">Error: {error}</div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">Docentes</CardTitle>
                        <Button onClick={onAddTeacher} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Agregar Docente
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-6">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar docentes..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {teachers.map((teacher) => (
                            <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={teacher.image || "/placeholder.svg"}
                                                alt={`${teacher.firstName} ${teacher.lastName}`}
                                            />
                                            <AvatarFallback>
                                                {teacher.firstName[0]}
                                                {teacher.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm truncate">
                                                {teacher.firstName} {teacher.lastName}
                                            </h3>

                                            <div className="space-y-1 text-xs text-muted-foreground mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Phone className="h-3 w-3" />
                                                    <span>{teacher.phone}</span>
                                                </div>
                                                <p>ID: {teacher.identification}</p>
                                                <p>Dirección: {teacher.address}</p>
                                            </div>

                                            <div className="flex gap-1 mt-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {teacher.gender}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    {teacher.nationality}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {teachers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">No se encontraron docentes</div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
