"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, UserX } from "lucide-react";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface Props {
  assignments: Page<TeacherAssignment>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (t: string) => void;
  onAddAssignment: () => void;
}

export const TeacherAssignmentListPresenter = ({ assignments, loading, error, searchTerm, onSearchChange, onAddAssignment }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Asignaciones Docentes</CardTitle>
          <Button onClick={onAddAssignment} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Nueva</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por docente" value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="max-w-sm" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton role="status" className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {assignments.content.map(a => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">Docente: {a.teacherId}</p>
                <p className="text-sm">Curso: {a.courseId}</p>
                <p className="text-sm">Asignatura: {a.subjectId}</p>
              </CardContent>
            </Card>
          ))}
          <Pagination className="col-span-full justify-center">
            <PaginationPrevious className="bg-background" />
            {assignments.total > 1 && Array.from({ length: assignments.totalPage }).map((_, index) => (
              <PaginationLink
                key={`page-${index + 1}`}
                href={`/asignaciones-docentes?page=${index + 1}`}
                isActive={index === assignments.page}
                className="bg-background"
              >
                {index + 1}
              </PaginationLink>
            ))}
            <PaginationNext className="bg-background" />
          </Pagination>
          <div className="col-span-full text-center text-sm text-muted-foreground">
            Página {assignments.page} de {assignments.totalPage} - Total de asignaciones: {assignments.total}
          </div>
        </div>
        {assignments.content.length === 0 && !loading && !error && (
          <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
            <UserX className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">
              {searchTerm
                ? `No encontramos resultados para "${searchTerm}".`
                : "No hay asignaciones registradas aún."}
            </p>
            {!searchTerm && <Button onClick={onAddAssignment}>Registrar asignación</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);
