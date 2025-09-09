"use client";

import { CreateAssessmentCommand } from "@/academic/application/usecases/assessment/CreateAssessmentUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateAssessmentCommand>;
  errors: FieldErrors<CreateAssessmentCommand>;
  loading?: boolean;
}

export const AssessmentCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nueva Evaluación"
    description="Registrar una evaluación"
    breadcrumbs={[{ label: "Evaluaciones", href: "/evaluaciones" }, { label: "Nueva" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Evaluación</CardTitle>
          <CardDescription>Complete los campos para registrar la evaluación.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">ID Estudiante *</Label>
                <Input id="studentId" type="number" {...register("studentId", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjectId">ID Asignatura *</Label>
                <Input id="subjectId" type="number" {...register("subjectId", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="score">Calificación *</Label>
                <Input id="score" type="number" step="0.01" {...register("score", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
            </div>
            {errors.studentId && <div className="text-destructive text-sm">{errors.studentId.message}</div>}
            {errors.subjectId && <div className="text-destructive text-sm">{errors.subjectId.message}</div>}
            {errors.score && <div className="text-destructive text-sm">{errors.score.message}</div>}
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
