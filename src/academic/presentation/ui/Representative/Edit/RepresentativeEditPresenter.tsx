import { UpdateRepresentativeCommand } from "@/academic/application/usecases/representative/UpdateRepresentativeUseCase";
import { GuidelinesList } from "@/components/GuidelinesList";
import { LayoutForm } from "@/components/layout-form";
import { PreviewCard } from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

interface RepresentativeEditPresenterProps {
    onCancel: () => void;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    register: UseFormRegister<UpdateRepresentativeCommand>;
    loading?: boolean;
    formData: UpdateRepresentativeCommand;
}

export const RepresentativeEditPresenter = ({
    onCancel,
    handleSubmit,
    register,
    loading,
    formData,
}: RepresentativeEditPresenterProps) => {
    return (
        <LayoutForm
            title="Editar Representante"
            description="Actualiza los datos del representante."
            breadcrumbs={[
                { label: "Representantes", href: "/representantes" },
                { label: "Editar Representante" }
            ]}
            main={
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Editar Representante</CardTitle>
                            <CardDescription>
                                Modifica los campos necesarios y guarda los cambios.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Nombre *</Label>
                                        <Input
                                            id="firstName"
                                            {...register("firstName", { required: "El nombre es obligatorio" })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Apellido *</Label>
                                        <Input
                                            id="lastName"
                                            {...register("lastName", { required: "El apellido es obligatorio" })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="identification">Identificación</Label>
                                        <Input id="identification" {...register("identification")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input id="phone" {...register("phone")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                                        <Input id="birthDate" type="date" {...register("birthDate")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Género</Label>
                                        <Input id="gender" {...register("gender")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nacionality">Nacionalidad</Label>
                                        <Input id="nacionality" {...register("nacionality")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Dirección</Label>
                                        <Input id="address" {...register("address")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="uuidUser">UUID Usuario</Label>
                                        <Input id="uuidUser" {...register("uuidUser")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Imagen (URL)</Label>
                                        <Input id="image" {...register("image")} />
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" disabled={loading} className="flex-1">
                                        {loading ? "Guardando..." : "Guardar"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onCancel}
                                        className="flex-1 bg-transparent"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            }
            sidebar={
                <>
                    <PreviewCard
                        title="Vista Previa"
                        description="Revisa los datos del representante antes de guardar."
                        icon={<ShieldCheck className="h-5 w-5 text-primary-500" />}
                        headerText={`${formData.firstName} ${formData.lastName || "Nombre del representante"}`}
                        badgeText="Activo"
                        badgeClassName="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500"
                        fields={[
                            { label: "Teléfono", value: formData.phone, fallback: "Sin teléfono" },
                            { label: "Identificación", value: formData.identification, fallback: "Sin identificación" },
                            { label: "Nacionalidad", value: formData.nacionality, fallback: "Sin nacionalidad" },
                        ]}
                    />
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Guía de Mejores Prácticas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GuidelinesList
                                items={[
                                    { text: "Verifique que los datos sean correctos" },
                                    { text: "No deje campos obligatorios vacíos", variant: "danger", icon: <AlertCircle className="h-4 w-4 text-destructive" /> },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </>
            }
        />
    );
};

