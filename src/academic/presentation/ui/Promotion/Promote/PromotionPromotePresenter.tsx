"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Promotion } from "@/academic/domain/entities/Promotion";

interface Props {
  promotion?: Promotion;
  loading: boolean;
  error: string | null;
  onPromote: (studentId: number, academicYearId: string) => void;
}

export function PromotionPromotePresenter({ promotion, loading, error, onPromote }: Props) {
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promoción de Estudiante</CardTitle>
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
          <Button onClick={() => onPromote(Number(studentId), year)} disabled={loading}>
            Promocionar
          </Button>
        </div>
        {error && <div className="text-destructive mb-4">{error}</div>}
        {promotion && (
          <pre className="bg-muted p-4 rounded text-sm overflow-auto">
            {JSON.stringify(promotion, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

