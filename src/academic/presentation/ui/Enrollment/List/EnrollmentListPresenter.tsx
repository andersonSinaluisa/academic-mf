"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAdd: () => void;
}

export const EnrollmentListPresenter = ({ enrollments, loading, error, searchTerm, onSearchChange, onAdd }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Matrículas</CardTitle>
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Registrar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por curso" value={searchTerm} onChange={e=>onSearchChange(e.target.value)} className="max-w-sm" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {enrollments.map(e => (
            <Card key={e.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-sm font-medium">Estudiante: {e.studentId}</div>
                <div className="text-xs">Curso: {e.courseId}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {enrollments.length === 0 && !loading && !error && (
          <div className="text-center py-8 text-muted-foreground">No se encontraron matrículas</div>
        )}
      </CardContent>
    </Card>
  </div>
);
