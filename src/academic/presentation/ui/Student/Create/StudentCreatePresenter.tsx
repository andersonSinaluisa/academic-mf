import { CreateStudentCommand } from "@/academic/application/usecases/student/CreateStudentUseCase";
import { GuidelinesList } from "@/components/GuidelinesList";
import { LayoutForm } from "@/components/layout-form";
import { PreviewCard } from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface StudentCreatePresenterProps {
    onCancel: () => void;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    register: UseFormRegister<CreateStudentCommand>;
    errors: FieldErrors<CreateStudentCommand>;
    loading?: boolean;
    formData: CreateStudentCommand;
}

export const StudentCreatePresenter = ({
    onCancel,
    handleSubmit,
    register,
    errors,
    loading,
    formData,
}: StudentCreatePresenterProps) => {
    return (
        <LayoutForm
            title="Nuevo Estudiante"
            description="Completa los campos para registrar un nuevo estudiante."
            breadcrumbs={[
                { label: "Estudiantes", href: "/estudiantes" },
                { label: "Nuevo Estudiante" }
            ]}
            main={
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Registrar Estudiante</CardTitle>
                            <CardDescription>
                                Completa los campos para crear un nuevo estudiante. Asegúrate de que toda la información sea correcta antes de guardar.
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
                                        {errors.firstName && (
                                            <div className="text-destructive text-sm">{errors.firstName.message}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Apellido *</Label>
                                        <Input
                                            id="lastName"
                                            {...register("lastName", { required: "El apellido es obligatorio" })}
                                        />
                                        {errors.lastName && (
                                            <div className="text-destructive text-sm">{errors.lastName.message}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="uuidParallel">Paralelo *</Label>
                                        <Input
                                            id="uuidParallel"
                                            {...register("uuidParallel", { required: "El paralelo es obligatorio" })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            {...register("phone")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                                        <Input {...register("birthDate")} type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="uuidUser">UUID Usuario</Label>
                                        <Input
                                            id="uuidUser"
                                            {...register("uuidUser")}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Dirección</Label>
                                        <Input
                                            id="address"
                                            {...register("address")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="identification">Identificación</Label>
                                        <Input
                                            id="identification"
                                            {...register("identification")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nationality">Nacionalidad</Label>
                                        <Input
                                            id="nationality"
                                            {...register("nationality")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="uuidSection">UUID Sección</Label>
                                        <Input
                                            id="uuidSection"
                                            {...register("uuidCurrentSection")}
                                        />
                                        {errors.uuidCurrentSection && (
                                            <div className="text-destructive text-sm">{errors.uuidCurrentSection.message}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="uuidCurrentSchoolYear">UUID Periodo Lectivo</Label>
                                        <Input
                                            id="uuidCurrentSchoolYear"
                                            {...register("uuidCurrentSchoolYear")}
                                        />
                                        {errors.uuidCurrentSchoolYear && (
                                            <div className="text-destructive text-sm">{errors.uuidCurrentSchoolYear.message}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="uuidParallel">UUID Paralelo</Label>
                                        <Input
                                            id="uuidParallel"
                                            {...register("uuidParallel")}
                                        />
                                        {errors.uuidParallel && (
                                            <div className="text-destructive text-sm">{errors.uuidParallel.message}</div>
                                        )}
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
                        description="Vista previa del estudiante que estás registrando. Verifica que los datos sean correctos antes de guardar."
                        icon={<ShieldCheck className="h-5 w-5 text-primary-500" />}
                        headerText={`${formData.firstName} ${formData.lastName || "Nombre del estudiante"}`}
                        badgeText="Activo"
                        badgeClassName="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500"
                        fields={[
                            { label: "Paralelo", value: formData.uuidParallel, fallback: "Sin paralelo" },
                        ]}
                    />
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Guía de Mejores Prácticas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GuidelinesList
                                items={[
                                    { text: "Verifique que el nombre y apellido estén correctamente escritos" },
                                    { text: "Asegúrese de ingresar un paralelo válido" },
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

