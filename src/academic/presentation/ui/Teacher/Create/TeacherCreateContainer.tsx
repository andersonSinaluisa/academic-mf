import { CreateTeacherCommand, CreateTeacherUseCase } from "@/academic/application/usecases/teacher/CreateTeacherUseCase"
import { useForm } from "react-hook-form"
import { TeacherCreatePresenter } from "./TeacherCreatePresenter"
import { useInjection } from "inversify-react"
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router"


export const TeacherCreateContainer = () => {


    const createTeacherUsecase = useInjection<CreateTeacherUseCase>(TEACHER_SYMBOLS.CREATE_USE_CASE)

    const { register, handleSubmit,watch,control, formState: { errors, isSubmitting } } = useForm<CreateTeacherCommand>({
        defaultValues:{
            firstName: "",
            lastName: "",
            identification: "",
            phone: "",
            birthDate: "",
            gender: "Masculino",
            address: "",
            nationality: ""
        }
    })
    const formData = watch()

    

    const onSubmit = async(data: CreateTeacherCommand) => {
        const result = await createTeacherUsecase.execute(data);
        result.ifRight((teacher) => {
            if (!teacher) return;
            toast({
                title: "Profesor creado",
                description: `El profesor ${teacher.firstName} ${teacher.lastName} ha sido creado con éxito.`,
                duration: 5000,
            })
            onCancel()
        }).ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al crear el profesor: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive"
            })
        });
    }
    const navigation = useNavigate()

    const onCancel = () => {
        navigation('/docentes')
    }

    
    return (
        <TeacherCreatePresenter
            onCancel={onCancel}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            loading={isSubmitting}
            control={control}
            formData={formData}
            
        />
    )

}