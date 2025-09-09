"use client";

import { CreateAttendanceCommand } from "@/academic/application/usecases/attendance/CreateAttendanceUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, FieldErrors, UseFormRegister, Control } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateAttendanceCommand>;
  errors: FieldErrors<CreateAttendanceCommand>;
  loading?: boolean;
  control: Control<CreateAttendanceCommand>;
}

export const AttendanceCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading, control }: Props) => (
  <LayoutForm
    title="Nueva Asistencia"
    description="Registrar asistencia de un estudiante"
    breadcrumbs={[{ label: "Asistencias", href: "/asistencias" }, { label: "Nueva Asistencia" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Asistencia</CardTitle>
          <CardDescription>Complete los campos para registrar la asistencia.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">ID Estudiante *</Label>
                <Input id="studentId" type="number" {...register("studentId", { valueAsNumber: true, required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input id="date" type="date" {...register("date", { required: "Obligatorio" })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="status">Estado *</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PRESENT">Presente</SelectItem>
                        <SelectItem value="ABSENT">Ausente</SelectItem>
                        <SelectItem value="JUSTIFIED">Justificado</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            {errors.studentId && <div className="text-destructive text-sm">{errors.studentId.message}</div>}
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
