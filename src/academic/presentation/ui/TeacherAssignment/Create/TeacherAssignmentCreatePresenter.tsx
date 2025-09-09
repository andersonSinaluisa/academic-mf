"use client";

import { CreateTeacherAssignmentCommand } from "@/academic/application/usecases/teacher-assignment/CreateTeacherAssignmentUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateTeacherAssignmentCommand>;
  errors: FieldErrors<CreateTeacherAssignmentCommand>;
  loading?: boolean;
}

export const TeacherAssignmentCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nueva Asignación Docente"
    description="Registrar asignación de un docente"
    breadcrumbs={[{ label: "Asignaciones Docentes", href: "/asignaciones-docentes" }, { label: "Nueva" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Asignación</CardTitle>
          <CardDescription>Complete los campos para registrar la asignación.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacherId">ID Docente *</Label>
                <Input id="teacherId" type="number" {...register("teacherId", { valueAsNumber: true, required: "Obligatorio" })} />
                {errors.teacherId && <div className="text-destructive text-sm">{errors.teacherId.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseId">ID Curso *</Label>
                <Input id="courseId" type="number" {...register("courseId", { valueAsNumber: true, required: "Obligatorio" })} />
                {errors.courseId && <div className="text-destructive text-sm">{errors.courseId.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjectId">ID Asignatura *</Label>
                <Input id="subjectId" type="number" {...register("subjectId", { valueAsNumber: true, required: "Obligatorio" })} />
                {errors.subjectId && <div className="text-destructive text-sm">{errors.subjectId.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolYearId">Año Lectivo *</Label>
                <Input id="schoolYearId" {...register("schoolYearId", { required: "Obligatorio" })} />
                {errors.schoolYearId && <div className="text-destructive text-sm">{errors.schoolYearId.message}</div>}
              </div>
            </div>
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
