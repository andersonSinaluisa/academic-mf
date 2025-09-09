"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AcademicHistory } from "@/academic/domain/entities/AcademicHistory";

interface Props {
  history?: AcademicHistory;
  loading: boolean;
  error: string | null;
  onSearch: (studentId: number) => void;
}

export function AcademicHistoryViewPresenter({ history, loading, error, onSearch }: Props) {
  const [studentId, setStudentId] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial Académico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="ID de estudiante"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Button onClick={() => onSearch(Number(studentId))} disabled={loading}>
            Consultar
          </Button>
        </div>
        {error && <div className="text-destructive mb-4">{error}</div>}
        {history && (
          <pre className="bg-muted p-4 rounded text-sm overflow-auto">
            {JSON.stringify(history, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

