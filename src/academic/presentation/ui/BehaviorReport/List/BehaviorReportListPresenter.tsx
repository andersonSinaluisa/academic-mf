"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, UserX } from "lucide-react";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface Props {
  reports: Page<BehaviorReport>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddReport: () => void;
}

export function BehaviorReportListPresenter({
  reports,
  loading,
  error,
  searchTerm,
  onSearchChange,
  onAddReport,
}: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Reportes de Conducta</CardTitle>
            <Button onClick={onAddReport} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Agregar Reporte
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar reportes..."
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
            {reports.content.map(report => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="font-semibold text-sm">Estudiante: {report.studentId}</p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                    {report.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {reports.content.length === 0 && !loading && !error && (
            <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
              <UserX className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">
                {searchTerm
                  ? `No encontramos resultados para "${searchTerm}".`
                  : "No hay reportes registrados aún."}
              </p>
              {!searchTerm && <Button onClick={onAddReport}>Registrar reporte</Button>}
            </div>
          )}

          <Pagination className="col-span-full justify-center">
            <PaginationPrevious className="bg-background" />
            {reports.total > 1 && Array.from({ length: reports.totalPage }).map((_, index) => (
              <PaginationLink
                key={`page-${index + 1}`}
                href={`/reportes-conducta?page=${index + 1}${searchTerm ? `&filter=${searchTerm}` : ""}`}
                isActive={index === reports.page}
                className="bg-background"
              >
                {index + 1}
              </PaginationLink>
            ))}
            <PaginationNext className="bg-background" />
          </Pagination>
          <div className="col-span-full text-center text-sm text-muted-foreground">
            Página {reports.page} de {reports.totalPage} - Total de reportes: {reports.total}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
