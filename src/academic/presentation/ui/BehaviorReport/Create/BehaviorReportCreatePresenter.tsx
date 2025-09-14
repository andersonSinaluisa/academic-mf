"use client";

import { CreateBehaviorReportCommand } from "@/academic/application/usecases/behavior-report/CreateBehaviorReportUseCase";
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
  register: UseFormRegister<CreateBehaviorReportCommand>;
  errors: FieldErrors<CreateBehaviorReportCommand>;
  loading?: boolean;
}

export const BehaviorReportCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nuevo Reporte de Conducta"
    description="Registrar un nuevo reporte de conducta"
    breadcrumbs={[{ label: "Reportes de Conducta", href: "/reportes-conducta" }, { label: "Nuevo Reporte" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Reporte</CardTitle>
          <CardDescription>Complete los campos para registrar el reporte.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">ID Estudiante *</Label>
                <Input id="studentId" type="number" {...register("studentId", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea id="description" {...register("description", { required: "Obligatorio" })} />
              </div>
            </div>
            {errors.studentId && <div className="text-destructive text-sm">{errors.studentId.message}</div>}
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
