import { useForm } from "react-hook-form"
import { TeacherEditPresenter } from "./TeacherEditPresenter"
import { UpdateTeacherCommand, UpdateTeacherUseCase } from "@/academic/application/usecases/teacher/UpdateTeacherUseCase"
import { useInjection } from "inversify-react"
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher"
import { useNavigate, useParams } from "react-router"
import { GetTeacherCommand, GetTeacherUseCase } from "@/academic/application/usecases/teacher/GetTeacherUseCase"
import { useCallback, useEffect } from "react"
import { toast } from "@/hooks/use-toast"


export const TeacherEditContainer = () => {


    const {id} = useParams()

    const updateUseCase = useInjection<UpdateTeacherUseCase>(TEACHER_SYMBOLS.UPDATE_USE_CASE)
    const getUseCase = useInjection<GetTeacherUseCase>(TEACHER_SYMBOLS.GET_USE_CASE)
    const { control, handleSubmit, register,
        watch,
        setValue,
        formState: { errors, isSubmitting } } = useForm<UpdateTeacherCommand>({
        defaultValues: {
            id: 0,
            firstName: "",
            lastName: "",
            identification: "",
            phone: "",
            birthDate: "",
        }
        })

    const formData = watch()

    
    const fetchTeacher = useCallback(async() => {
        if(!id) {
            toast({
                title: "Error",
                description: "ID de profesor no proporcionado",
                duration: 5000,
                variant: "destructive"
            })
            return
        }
        const res = await getUseCase.execute(
            new GetTeacherCommand(Number(id))
        )
        res.ifRight((teacher) => {

            if (!teacher) return
            setValue("id", teacher.id)
            setValue("firstName", teacher.firstName)
            setValue("lastName", teacher.lastName)
            setValue("phone", teacher.phone || "")
            setValue("birthDate", teacher.birthDate || "")
            setValue("uuidUser", teacher.uuidUser || "")
            setValue("address", teacher.address || "")
            setValue("identification", teacher.identification || "")
            setValue("nationality", teacher.nationality || "")
            setValue("gender", teacher.gender || "")
            setValue("image", teacher.image || "")
        }).ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al obtener el profesor: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive"
            })
        })
    }, [getUseCase, id])

    useEffect(() => {
        fetchTeacher()
    }, [fetchTeacher])





    const onSubmit = async(data: UpdateTeacherCommand) => {
        const res = await updateUseCase.execute(data)
        res.ifRight((teacher) => {
            console.log("Submitting data:", teacher);

            toast({
                title: "Éxito",
                description: "Profesor actualizado correctamente "+ (teacher ? teacher.firstName + " " + teacher.lastName : ""),
                duration: 5000,
            })
            handleCancel()
        }).ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al actualizar el profesor: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive"
            })
        })
    }
    const navigate = useNavigate()
    const handleCancel = () => {
        // Lógica para manejar la cancelación, como redirigir a otra página
        navigate("/docentes")
    }

    return (
        <TeacherEditPresenter
            onCancel={handleCancel}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            loading={isSubmitting}
            control={control}
            formData={formData}
        />
    )
}