"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReportCard } from "@/academic/domain/entities/ReportCard";

interface Props {
  report?: ReportCard;
  loading: boolean;
  error: string | null;
  onSearch: (studentId: number, academicYearId: string) => void;
}

export function ReportCardViewPresenter({ report, loading, error, onSearch }: Props) {
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boleta de Calificaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input
            placeholder="ID de estudiante"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Input
            placeholder="Año académico"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <Button onClick={() => onSearch(Number(studentId), year)} disabled={loading}>
            Consultar
          </Button>
        </div>
        {error && <div className="text-destructive mb-4">{error}</div>}
        {report && (
          <pre className="bg-muted p-4 rounded text-sm overflow-auto">
            {JSON.stringify(report, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

