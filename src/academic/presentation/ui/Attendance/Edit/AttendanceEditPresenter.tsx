"use client";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, Control, FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  loading?: boolean;
  control: Control<any>;
  formData: any;
}

export const AttendanceEditPresenter = ({ onCancel, handleSubmit, register, errors, loading, control, formData }: Props) => (
  <LayoutForm
    title="Editar Asistencia"
    description="Actualiza el estado de la asistencia"
    breadcrumbs={[{ label: "Asistencias", href: "/asistencias" }, { label: "Editar" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Editar Asistencia</CardTitle>
          <CardDescription>Modifica el estado de la asistencia.</CardDescription>
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
                <Label>Fecha</Label>
                <Input value={formData.date || ""} disabled />
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
            { (errors as any).status ? (
              <div className="text-destructive text-sm">{(errors as any).status.message}</div>
            ) : null }
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
