"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  reports: BehaviorReport[];
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
            {loading && <Skeleton className="h-24 w-full col-span-full" />}
            {error && (
              <div className="text-destructive text-center col-span-full">{error}</div>
            )}
            {reports.map((report) => (
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

          {reports.length === 0 && !loading && !error && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron reportes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
