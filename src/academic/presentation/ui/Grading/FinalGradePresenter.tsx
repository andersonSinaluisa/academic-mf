"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FinalGrade } from "@/academic/domain/entities/FinalGrade";

interface Props {
  grade?: FinalGrade;
  loading: boolean;
  error: string | null;
  onSearch: (studentId: number, subjectId: number, year: string) => void;
}

export function FinalGradePresenter({ grade, loading, error, onSearch }: Props) {
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [year, setYear] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calificación Final</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <Input placeholder="ID estudiante" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <Input placeholder="ID materia" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} />
          <Input placeholder="Año escolar" value={year} onChange={(e) => setYear(e.target.value)} />
          <Button onClick={() => onSearch(Number(studentId), Number(subjectId), year)} disabled={loading}>Consultar</Button>
        </div>
        {error && <div className="text-destructive mb-4">{error}</div>}
        {grade && (
          <pre className="bg-muted p-4 rounded text-sm overflow-auto">
            {JSON.stringify(grade, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

