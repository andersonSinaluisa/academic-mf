"use client";

import { UpdateAssessmentCommand } from "@/academic/application/usecases/assessment/UpdateAssessmentUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<UpdateAssessmentCommand & { studentId: number; subjectId: number }>;
  errors: FieldErrors<UpdateAssessmentCommand>;
  loading?: boolean;
}

export const AssessmentEditPresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Editar Evaluación"
    description="Editar la evaluación seleccionada"
    breadcrumbs={[{ label: "Evaluaciones", href: "/evaluaciones" }, { label: "Editar" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Editar Evaluación</CardTitle>
          <CardDescription>Modifique los campos necesarios.</CardDescription>
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
                <Label htmlFor="subjectId">ID Asignatura</Label>
                <Input id="subjectId" type="number" disabled {...register("subjectId", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="score">Calificación *</Label>
                <Input id="score" type="number" step="0.01" {...register("score", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
            </div>
            {errors.score && <div className="text-destructive text-sm">{errors.score.message}</div>}
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">{loading ? "Actualizando..." : "Actualizar"}</Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    }
  />
);
