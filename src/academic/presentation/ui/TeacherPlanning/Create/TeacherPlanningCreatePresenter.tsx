"use client";

import { CreateTeacherPlanningCommand } from "@/academic/application/usecases/teacher-planning/CreateTeacherPlanningUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateTeacherPlanningCommand>;
  errors: FieldErrors<CreateTeacherPlanningCommand>;
  loading?: boolean;
}

export const TeacherPlanningCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nueva Planificación"
    description="Registrar una planificación docente"
    breadcrumbs={[{ label: "Planificaciones", href: "/planificaciones-docentes" }, { label: "Nueva" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Planificación</CardTitle>
          <CardDescription>Complete los campos para registrar la planificación.</CardDescription>
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
                <Label htmlFor="subjectId">ID Asignatura *</Label>
                <Input id="subjectId" type="number" {...register("subjectId", { valueAsNumber: true, required: "Obligatorio" })} />
                {errors.subjectId && <div className="text-destructive text-sm">{errors.subjectId.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseId">ID Curso *</Label>
                <Input id="courseId" type="number" {...register("courseId", { valueAsNumber: true, required: "Obligatorio" })} />
                {errors.courseId && <div className="text-destructive text-sm">{errors.courseId.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolYearId">Año Lectivo *</Label>
                <Input id="schoolYearId" {...register("schoolYearId", { required: "Obligatorio" })} />
                {errors.schoolYearId && <div className="text-destructive text-sm">{errors.schoolYearId.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Tema *</Label>
                <Input id="topic" {...register("topic", { required: "Obligatorio" })} />
                {errors.topic && <div className="text-destructive text-sm">{errors.topic.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Input id="description" {...register("description", { required: "Obligatorio" })} />
                {errors.description && <div className="text-destructive text-sm">{errors.description.message}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="week">Semana *</Label>
                <Input id="week" type="number" {...register("week", { valueAsNumber: true, required: "Obligatorio" })} />
                {errors.week && <div className="text-destructive text-sm">{errors.week.message}</div>}
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
