"use client";

import { UpdateMeetingCommand } from "@/academic/application/usecases/meeting/UpdateMeetingUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<UpdateMeetingCommand & { date: string }>;
  errors: FieldErrors<UpdateMeetingCommand & { date: string }>;
  loading?: boolean;
}

export const MeetingEditPresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Editar Reunión"
    description="Editar la reunión"
    breadcrumbs={[{ label: "Reuniones", href: "/reuniones" }, { label: "Editar" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Editar Reunión</CardTitle>
          <CardDescription>Modifique los campos necesarios.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" {...register("id", { valueAsNumber: true })} />
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Tema *</Label>
                <Input id="topic" {...register("topic", { required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" type="date" disabled {...register("date")} />
              </div>
            </div>
            {errors.topic && <div className="text-destructive text-sm">{errors.topic.message}</div>}
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
