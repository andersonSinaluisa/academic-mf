"use client";

import { UpdateBehaviorReportCommand } from "@/academic/application/usecases/behavior-report/UpdateBehaviorReportUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<UpdateBehaviorReportCommand & { studentId: number }>;
  errors: FieldErrors<UpdateBehaviorReportCommand & { studentId: number }>;
  loading?: boolean;
}

export const BehaviorReportEditPresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Editar Reporte de Conducta"
    description="Modificar un reporte de conducta"
    breadcrumbs={[{ label: "Reportes de Conducta", href: "/reportes-conducta" }, { label: "Editar Reporte" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Editar Reporte</CardTitle>
          <CardDescription>Actualiza la información del reporte.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" {...register("id", { valueAsNumber: true })} />
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">ID Estudiante</Label>
                <Input id="studentId" type="number" disabled {...register("studentId", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea id="description" {...register("description", { required: "Obligatorio" })} />
              </div>
            </div>
            {errors.description && <div className="text-destructive text-sm">{errors.description.message}</div>}
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">{loading ? "Guardando..." : "Guardar"}</Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    }
  />
);
