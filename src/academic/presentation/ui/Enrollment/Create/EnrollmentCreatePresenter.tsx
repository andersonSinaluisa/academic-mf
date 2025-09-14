"use client";

import { CreateEnrollmentCommand } from "@/academic/application/usecases/enrollment/CreateEnrollmentUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateEnrollmentCommand>;
  errors: FieldErrors<CreateEnrollmentCommand>;
  loading?: boolean;
}

export const EnrollmentCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nueva Matrícula"
    description="Registrar matrícula de un estudiante"
    breadcrumbs={[{ label: "Matrículas", href: "/matriculas" }, { label: "Nueva Matrícula" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Matrícula</CardTitle>
          <CardDescription>Complete los campos para registrar una matrícula.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">ID Estudiante *</Label>
                <Input id="studentId" type="number" {...register("studentId", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseId">ID Curso *</Label>
                <Input id="courseId" {...register("courseId", { required: "Obligatorio" })} />
              </div>
            </div>
            {errors.courseId ? (
              <div className="text-destructive text-sm">{errors.courseId.message}</div>
            ) : null}
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
