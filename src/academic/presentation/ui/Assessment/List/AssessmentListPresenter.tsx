"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  assessments: Assessment[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (t: string) => void;
  onAddAssessment: () => void;
}

export const AssessmentListPresenter = ({ assessments, loading, error, searchTerm, onSearchChange, onAddAssessment }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Evaluaciones</CardTitle>
          <Button onClick={onAddAssessment} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nueva
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por estudiante" value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="max-w-sm" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {assessments.map(a => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">Estudiante: {a.studentId}</p>
                <p className="text-sm text-muted-foreground">Asignatura: {a.subjectId}</p>
                <p className="text-sm">Calificación: {a.score}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {assessments.length === 0 && !loading && !error && <div className="text-center py-8 text-muted-foreground">No se encontraron evaluaciones</div>}
      </CardContent>
    </Card>
  </div>
);
