"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, UserX } from "lucide-react";
import { Student } from "@/academic/domain/entities/Student";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface StudentListPresenterProps {
    students: Page<Student>;
    loading: boolean;
    error: string | null;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onAddStudent: () => void;
}

export function StudentListPresenter({
    students,
    loading,
    error,
    searchTerm,
    onSearchChange,
    onAddStudent,
}: StudentListPresenterProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">Estudiantes</CardTitle>
                        <Button onClick={onAddStudent} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Agregar Estudiante
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-6">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar estudiantes..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {loading && <Skeleton role="status" className="h-24 w-full col-span-full" />}
                        {error && (
                            <div className="text-destructive text-center col-span-full">{error}</div>
                        )}
                        {students.content.map((student) => (
                            <Card key={student.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src="/placeholder.svg"
                                                alt={`${student.firstName} ${student.lastName}`}
                                            />
                                            <AvatarFallback>
                                                {student.firstName}
                                                {student.lastName}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm truncate">
                                                {student.firstName} {student.lastName}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Paralelo: {student.uuidParallel}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {students.content.length === 0 && !loading && !error && (
                        <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
                            <UserX className="h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-medium">
                                {searchTerm
                                    ? `No encontramos resultados para "${searchTerm}".`
                                    : "No hay estudiantes registrados aún."}
                            </p>
                            {!searchTerm && (
                                <Button onClick={onAddStudent}>
                                    Registrar estudiante
                                </Button>
                            )}
                        </div>
                    )}

                    <Pagination className="col-span-full justify-center">
                        <PaginationPrevious className="bg-background" />
                        {students.total > 1 && Array.from({ length: students.totalPage }).map((_, index) => (
                            <PaginationLink
                                key={`page-${index + 1}`}
                                href={`/estudiantes?page=${index + 1}${searchTerm ? `&filter=${searchTerm}` : ""}`}
                                isActive={index === students.page}
                                className="bg-background"
                            >
                                {index + 1}
                            </PaginationLink>
                        ))}
                        <PaginationNext className="bg-background" />
                    </Pagination>
                    <div className="col-span-full text-center text-sm text-muted-foreground">
                        Página {students.page} de {students.totalPage} - Total de estudiantes: {students.total}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

