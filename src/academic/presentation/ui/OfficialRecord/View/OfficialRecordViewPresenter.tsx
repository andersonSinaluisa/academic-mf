"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OfficialRecord } from "@/academic/domain/entities/OfficialRecord";

interface Props {
  record?: OfficialRecord;
  loading: boolean;
  error: string | null;
  onSearch: (studentId: number) => void;
}

export function OfficialRecordViewPresenter({ record, loading, error, onSearch }: Props) {
  const [studentId, setStudentId] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro Oficial</CardTitle>
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
        {record && (
          <pre className="bg-muted p-4 rounded text-sm overflow-auto">
            {JSON.stringify(record, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

