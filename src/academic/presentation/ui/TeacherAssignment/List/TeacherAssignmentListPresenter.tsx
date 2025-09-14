"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  assignments: TeacherAssignment[];
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
          {loading && <Skeleton className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {assignments.map(a => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">Docente: {a.teacherId}</p>
                <p className="text-sm">Curso: {a.courseId}</p>
                <p className="text-sm">Asignatura: {a.subjectId}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {assignments.length === 0 && !loading && !error && <div className="text-center py-8 text-muted-foreground">No se encontraron asignaciones</div>}
      </CardContent>
    </Card>
  </div>
);
