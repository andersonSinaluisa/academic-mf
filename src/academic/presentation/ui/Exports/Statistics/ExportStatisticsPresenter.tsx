"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  loading: boolean;
  error: string | null;
  onExport: (courseId: string, academicYearId: string, format: string) => void;
}

export function ExportStatisticsPresenter({ loading, error, onExport }: Props) {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [format, setFormat] = useState("pdf");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar Estadísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input placeholder="Curso" value={course} onChange={(e) => setCourse(e.target.value)} />
          <Input placeholder="Año académico" value={year} onChange={(e) => setYear(e.target.value)} />
          <Input placeholder="Formato" value={format} onChange={(e) => setFormat(e.target.value)} />
          <Button onClick={() => onExport(course, year, format)} disabled={loading}>Exportar</Button>
        </div>
        {error && <div className="text-destructive">{error}</div>}
      </CardContent>
    </Card>
  );
}

