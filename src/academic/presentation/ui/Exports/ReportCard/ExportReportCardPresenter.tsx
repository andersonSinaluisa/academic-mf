"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  loading: boolean;
  error: string | null;
  onExport: (studentId: number, academicYearId: string, format: string) => void;
}

export function ExportReportCardPresenter({ loading, error, onExport }: Props) {
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");
  const [format, setFormat] = useState("pdf");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar Boleta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input placeholder="ID estudiante" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <Input placeholder="Año académico" value={year} onChange={(e) => setYear(e.target.value)} />
          <Input placeholder="Formato" value={format} onChange={(e) => setFormat(e.target.value)} />
          <Button onClick={() => onExport(Number(studentId), year, format)} disabled={loading}>
            Exportar
          </Button>
        </div>
        {error && <div className="text-destructive">{error}</div>}
      </CardContent>
    </Card>
  );
}

