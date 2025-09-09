"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

interface Props {
  acts: PromotionAct[];
  loading: boolean;
  error: string | null;
  courseId: string;
  yearId: string;
  onCourseChange: (t: string) => void;
  onYearChange: (t: string) => void;
  onSearch: () => void;
  onAddAct: () => void;
}

export const PromotionActListPresenter = ({ acts, loading, error, courseId, yearId, onCourseChange, onYearChange, onSearch, onAddAct }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Actas de Promoción</CardTitle>
          <Button onClick={onAddAct} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Nueva</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Input placeholder="ID Curso" value={courseId} onChange={e => onCourseChange(e.target.value)} className="max-w-xs" />
          <Input placeholder="ID Año" value={yearId} onChange={e => onYearChange(e.target.value)} className="max-w-xs" />
          <Button onClick={onSearch}>Buscar</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {acts.map(a => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">Curso: {a.courseId}</p>
                <p className="text-sm">Año: {a.academicYearId}</p>
                <p className="text-sm">Generado por: {a.generatedBy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {acts.length === 0 && !loading && !error && <div className="text-center py-8 text-muted-foreground">No se encontraron actas</div>}
      </CardContent>
    </Card>
  </div>
);
