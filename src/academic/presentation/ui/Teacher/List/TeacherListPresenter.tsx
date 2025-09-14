"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Phone, UserX, Pencil } from "lucide-react"
import { Teacher } from "@/academic/domain/entities/Teacher"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Page } from "@/lib/utils"

interface TeacherListPresenterProps {
    teachers: Page<Teacher>
    loading: boolean
    error: string | null
    searchTerm: string
    onSearchChange: (term: string) => void
    onAddTeacher: () => void
    onEditTeacher: (id: string) => void
}

export function TeacherListPresenter({
    teachers,
    loading,
    error,
    searchTerm,
    onSearchChange,
    onAddTeacher,
    onEditTeacher
}: Readonly<TeacherListPresenterProps>) {
   

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
                        {
                            loading &&
                            <Skeleton role="status" className="h-24 w-full col-span-full" />
                            
                        }
                        {
                            error &&
                            <div className="text-destructive text-center col-span-full">{error}</div>
                            
                        }
                        {teachers.content.map((teacher) => (
                            <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                       
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={teacher.image || "/placeholder.svg"}
                                                alt={`${teacher.firstName} ${teacher.lastName}`}
                                            />
                                            <AvatarFallback>
                                                {teacher.firstName}
                                                {teacher.lastName}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-semibold text-sm truncate">
                                                {teacher.firstName} {teacher.lastName}
                                            </h3>
                                            <Button
                                                onClick={() => onEditTeacher(teacher.id.toString())}
                                                variant="ghost"
                                                    title="editar"
                                                className="p-0 rounded-full hover:bg-transparent"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            </div>

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
                        {teachers.content.length === 0 && !loading && (
                            <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
                                <UserX className="h-12 w-12 text-muted-foreground" />
                                <p className="text-lg font-medium">
                                    {searchTerm
                                        ? `No encontramos resultados para "${searchTerm}".`
                                        : "No hay docentes registrados aún."}
                                </p>
                                {!searchTerm && (
                                    <Button onClick={onAddTeacher}>
                                        Registrar docente
                                    </Button>
                                )}
                            </div>
                        )}
                        
                        <Pagination className="col-span-full justify-center">
                            <PaginationPrevious className="bg-background" />
                            {teachers.total > 1 && Array.from({ 
                                length: teachers.totalPage }).map((_, index) => (
                                <PaginationLink
                                    key={`page-${index + 1}`}
                                    href={`/docentes?page=${index + 1}`}
                                    isActive={index === teachers.page}
                                    className="bg-background"
                                >
                                
                                    {index + 1}
                                </PaginationLink>
                            ))}
                            
                            <PaginationNext className="bg-background" />
                        </Pagination>
                        <div className="col-span-full text-center text-sm text-muted-foreground">
                            Página {teachers.page} de {teachers.totalPage} - Total de docentes: {teachers.total}
                        </div>
                    </div>

                   
                </CardContent>
            </Card>
        </div>
    )
}
