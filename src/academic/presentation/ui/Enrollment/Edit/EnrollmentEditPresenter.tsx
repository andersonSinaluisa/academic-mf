"use client";

import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  loading?: boolean;
  formData: any;
}

export const EnrollmentEditPresenter = ({ onCancel, handleSubmit, register, errors, loading, formData }: Props) => (
  <LayoutForm
    title="Editar Matrícula"
    description="Actualiza los datos de la matrícula"
    breadcrumbs={[{ label: "Matrículas", href: "/matriculas" }, { label: "Editar" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Editar Matrícula</CardTitle>
          <CardDescription>Modifica el curso de la matrícula.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" {...register("id", { valueAsNumber: true })} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ID Estudiante</Label>
                <Input value={formData.studentId || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseId">ID Curso *</Label>
                <Input id="courseId" {...register("courseId", { required: "Obligatorio" })} />
              </div>
            </div>
              {(errors as any).courseId ? (
                <div className="text-destructive text-sm">{(errors as any).courseId.message}</div>
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
