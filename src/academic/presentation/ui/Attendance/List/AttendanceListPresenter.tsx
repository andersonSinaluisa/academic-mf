"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, UserX } from "lucide-react";
import { Attendance } from "@/academic/domain/entities/Attendance";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface Props {
  attendances: Page<Attendance>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAdd: () => void;
}

export const AttendanceListPresenter = ({ attendances, loading, error, searchTerm, onSearchChange, onAdd }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Asistencias</CardTitle>
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Registrar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID de estudiante"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton role="status" className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {attendances.content.map(a => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-sm font-medium">Estudiante: {a.studentId}</div>
                <div className="text-xs text-muted-foreground">Fecha: {a.date}</div>
                <div className="text-xs">Estado: {a.status}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {attendances.content.length === 0 && !loading && !error && (
          <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
            <UserX className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">
              {searchTerm
                ? `No encontramos resultados para "${searchTerm}".`
                : "No hay asistencias registradas aún."}
            </p>
            {!searchTerm && <Button onClick={onAdd}>Registrar</Button>}
          </div>
        )}

        <Pagination className="col-span-full justify-center">
          <PaginationPrevious className="bg-background" />
          {attendances.total > 1 && Array.from({ length: attendances.totalPage }).map((_, index) => (
            <PaginationLink
              key={`page-${index + 1}`}
              href={`/asistencias?page=${index + 1}${searchTerm ? `&filter=${searchTerm}` : ""}`}
              isActive={index === attendances.page}
              className="bg-background"
            >
              {index + 1}
            </PaginationLink>
          ))}
          <PaginationNext className="bg-background" />
        </Pagination>
        <div className="col-span-full text-center text-sm text-muted-foreground">
          Página {attendances.page} de {attendances.totalPage} - Total de asistencias: {attendances.total}
        </div>
      </CardContent>
    </Card>
  </div>
);
