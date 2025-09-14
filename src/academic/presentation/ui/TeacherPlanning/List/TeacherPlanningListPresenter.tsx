"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ClipboardX } from "lucide-react";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface Props {
  plannings: Page<TeacherPlanning>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (t: string) => void;
  onAddPlanning: () => void;
}

export const TeacherPlanningListPresenter = ({ plannings, loading, error, searchTerm, onSearchChange, onAddPlanning }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Planificaciones</CardTitle>
          <Button onClick={onAddPlanning} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Nueva</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por tema"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton role="status" className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {plannings.content.map(p => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">{p.topic}</p>
                <p className="text-sm">Curso: {p.courseId}</p>
                <p className="text-sm">Semana: {p.week}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {plannings.content.length === 0 && !loading && !error && (
          <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
            <ClipboardX className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">
              {searchTerm
                ? `No encontramos resultados para "${searchTerm}".`
                : "No hay planificaciones registradas aún."}
            </p>
            {!searchTerm && <Button onClick={onAddPlanning}>Nueva</Button>}
          </div>
        )}

        <Pagination className="col-span-full justify-center">
          <PaginationPrevious className="bg-background" />
          {plannings.totalPage > 1 &&
            Array.from({ length: plannings.totalPage }).map((_, index) => (
              <PaginationLink
                key={`page-${index + 1}`}
                href={`/planificaciones-docentes?page=${index + 1}${searchTerm ? `&filter=${searchTerm}` : ""}`}
                isActive={index === plannings.page}
                className="bg-background"
              >
                {index + 1}
              </PaginationLink>
            ))}
          <PaginationNext className="bg-background" />
        </Pagination>
        <div className="col-span-full text-center text-sm text-muted-foreground">
          Página {plannings.page} de {plannings.totalPage} - Total de planificaciones: {plannings.total}
        </div>
      </CardContent>
    </Card>
  </div>
);
