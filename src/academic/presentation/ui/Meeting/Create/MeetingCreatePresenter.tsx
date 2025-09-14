"use client";

import { CreateMeetingCommand } from "@/academic/application/usecases/meeting/CreateMeetingUseCase";
import { LayoutForm } from "@/components/layout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  onCancel: () => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateMeetingCommand>;
  errors: FieldErrors<CreateMeetingCommand>;
  loading?: boolean;
}

export const MeetingCreatePresenter = ({ onCancel, handleSubmit, register, errors, loading }: Props) => (
  <LayoutForm
    title="Nueva Reunión"
    description="Registrar una nueva reunión"
    breadcrumbs={[{ label: "Reuniones", href: "/reuniones" }, { label: "Nueva" }]}
    sidebar={null}
    main={
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registrar Reunión</CardTitle>
          <CardDescription>Complete los campos para registrar la reunión.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Tema *</Label>
                <Input id="topic" {...register("topic", { required: "Obligatorio" })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input id="date" type="date" {...register("date", { required: "Obligatorio" })} />
              </div>
            </div>
            {errors.topic && <div className="text-destructive text-sm">{errors.topic.message}</div>}
            {errors.date && <div className="text-destructive text-sm">{errors.date.message}</div>}
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
