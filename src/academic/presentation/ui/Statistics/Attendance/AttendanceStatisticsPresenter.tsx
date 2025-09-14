"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AttendanceStatistics } from "@/academic/domain/entities/Statistics";

interface Props {
  stats?: AttendanceStatistics;
  loading: boolean;
  error: string | null;
  onSearch: (courseId: string, academicYearId: string) => void;
}

export function AttendanceStatisticsPresenter({ stats, loading, error, onSearch }: Props) {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas de Asistencia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input placeholder="Curso" value={course} onChange={(e) => setCourse(e.target.value)} />
          <Input placeholder="Año académico" value={year} onChange={(e) => setYear(e.target.value)} />
          <Button onClick={() => onSearch(course, year)} disabled={loading}>Consultar</Button>
        </div>
        {error && <div className="text-destructive mb-4">{error}</div>}
        {stats && (
          <pre className="bg-muted p-4 rounded text-sm overflow-auto">
            {JSON.stringify(stats, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

