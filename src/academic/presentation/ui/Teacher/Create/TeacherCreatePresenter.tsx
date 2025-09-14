import { CreateTeacherCommand } from "@/academic/application/usecases/teacher/CreateTeacherUseCase"
import { GuidelinesList } from "@/components/GuidelinesList"
import { LayoutForm } from "@/components/layout-form"
import { PreviewCard } from "@/components/PreviewCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ShieldCheck, } from "lucide-react"
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"

export interface TeacherCreatePresenterProps {
    onCancel: () => void;
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    register: UseFormRegister<CreateTeacherCommand>
    errors: FieldErrors<CreateTeacherCommand>
    loading?: boolean
    control: Control<CreateTeacherCommand, CreateTeacherCommand>
    formData: CreateTeacherCommand
}

export const TeacherCreatePresenter = ({
    onCancel,
    handleSubmit,
    register,
    errors,
    loading,
    control,
    formData
}: TeacherCreatePresenterProps) => {

    return (
        <LayoutForm
            title="Nuevo Profesor"
            description="Completa los campos para registrar un nuevo profesor."
            breadcrumbs={[
                { label: "Profesores", href: "/docentes" },
                { label: "Nuevo Profesor" }
            ]}
            main={
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Registrar Profesor</CardTitle>
                            <CardDescription>
                                Completa los campos para crear un nuevo curso. Asegúrate de que toda la información sea correcta antes de guardar.
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
                                        {
                                            errors && <div className="text-destructive text-sm">{errors.firstName?.message}</div>
                                        }
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Apellido *</Label>
                                        <Input
                                            id="lastName"
                                            {...register("lastName", { required: "El apellido es obligatorio" })}
                                        />
                                        {
                                            errors && <div className="text-destructive text-sm">{errors.lastName?.message}</div>
                                        }
                                        
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="identification">Identificación *</Label>
                                        <Input
                                            id="identification"
                                            {...register("identification", { required: "La identificación es obligatoria" })}
                                        />
                                        {errors && <div className="text-destructive text-sm">{errors.identification?.message}</div>
                                        }
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input id="phone" {...register("phone")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                                        <Input
                                            id="birthDate"
                                            type="date"
                                            {...register("birthDate", { required: "La fecha de nacimiento es obligatoria" })}
                                        />
                                        {errors && <div className="text-destructive text-sm">{errors.birthDate?.message}</div>
                                        }
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Género *</Label>
                                        <Controller
                                            control={control}
                                            name="gender"
                                            render={({ field }) => (
                                                <Select
                                                    name={field.name}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar género" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Masculino">Masculino</SelectItem>
                                                        <SelectItem value="Femenino">Femenino</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors && <div className="text-destructive text-sm">
                                            {errors.gender?.message}
                                        </div>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Dirección</Label>
                                    <Input id="address" {...register("address")} />
                                    {errors && <div className="text-destructive text-sm">{errors.address?.message}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nationality">Nacionalidad</Label>
                                    <Input id="nationality" {...register("nationality")} />
                                    {errors && <div className="text-destructive text-sm">{errors.address?.message}</div>}
                                </div>


                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" 
                                    disabled={loading} 
                                    className="flex-1">
                                        {loading ? "Guardando..." : "Guardar"}
                                    </Button>
                                    <Button
                                        type="button" variant="outline"
                                        onClick={onCancel} className="flex-1 bg-transparent">
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
                        description="Vista previa del profesor que estás registrando. Verifica que los datos sean correctos antes de guardar."
                        icon={<ShieldCheck className="h-5 w-5 text-primary-500" />}
                        headerText={`${formData.firstName} ${formData.lastName || "Nombre del profesor"}`}
                        badgeText="Activo"
                        badgeClassName="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500"
                        fields={[
                            { label: "Identificación", value: formData.identification, fallback: "Sin identificación" },
                            { label: "Teléfono", value: formData.phone, fallback: "No registrado" },
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
                                    { text: "Asegúrese de ingresar una identificación válida" },
                                    { text: "Incluya información de contacto actualizada" },
                                    { text: "No deje campos obligatorios vacíos", variant: "danger", icon: <AlertCircle className="h-4 w-4 text-destructive" /> }
                                ]}
                            />
                        </CardContent>
                    </Card>
                </>
            }

        />
    )
}
