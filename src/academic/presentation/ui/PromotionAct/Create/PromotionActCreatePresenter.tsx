"use client";

import { CreatePromotionActCommand } from "@/academic/application/usecases/promotion-act/CreatePromotionActUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreatePromotionActCommand>;
  errors: FieldErrors<CreatePromotionActCommand>;
  loading?: boolean;
}

export const PromotionActCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nueva Acta de Promoción"
    description="Generar una nueva acta de promoción"
    breadcrumbs={[{ label: "Actas de Promoción", href: "/actas-promocion" }, { label: "Nueva" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Generar Acta</CardTitle>
          <CardDescription>Complete los campos para generar el acta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseId">ID Curso *</Label>
                <Input id="courseId" {...register("courseId", { required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicYearId">ID Año Académico *</Label>
                <Input id="academicYearId" {...register("academicYearId", { required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="generatedBy">Generado Por (ID Usuario) *</Label>
                <Input id="generatedBy" type="number" {...register("generatedBy", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
            </div>
            {errors.courseId && <div className="text-destructive text-sm">{errors.courseId.message}</div>}
            {errors.academicYearId && <div className="text-destructive text-sm">{errors.academicYearId.message}</div>}
            {errors.generatedBy && <div className="text-destructive text-sm">{errors.generatedBy.message}</div>}
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">{loading ? "Generando..." : "Generar"}</Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    }
  />
);
