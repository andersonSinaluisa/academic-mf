"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, FileX } from "lucide-react";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface Props {
  acts: Page<PromotionAct>;
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
          {loading && <Skeleton role="status" className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {acts.content.map(a => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">Curso: {a.courseId}</p>
                <p className="text-sm">Año: {a.academicYearId}</p>
                <p className="text-sm">Generado por: {a.generatedBy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {acts.content.length === 0 && !loading && !error && (
          <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
            <FileX className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No se encontraron actas</p>
            {!courseId || !yearId ? null : <Button onClick={onAddAct}>Nueva</Button>}
          </div>
        )}

        <Pagination className="col-span-full justify-center">
          <PaginationPrevious className="bg-background" />
          {acts.totalPage > 1 &&
            Array.from({ length: acts.totalPage }).map((_, index) => (
              <PaginationLink
                key={`page-${index + 1}`}
                href={`/actas-promocion?page=${index + 1}&courseId=${courseId}&yearId=${yearId}`}
                isActive={index === acts.page}
                className="bg-background"
              >
                {index + 1}
              </PaginationLink>
            ))}
          <PaginationNext className="bg-background" />
        </Pagination>
        <div className="col-span-full text-center text-sm text-muted-foreground">
          Página {acts.page} de {acts.totalPage} - Total de actas: {acts.total}
        </div>
      </CardContent>
    </Card>
  </div>
);
