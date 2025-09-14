import { CreateStudentCommand, CreateStudentUseCase } from "@/academic/application/usecases/student/CreateStudentUseCase";
import { useForm } from "react-hook-form";
import { StudentCreatePresenter } from "./StudentCreatePresenter";
import { useInjection } from "inversify-react";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";
import { toast } from "@/hooks/use-toast";

export const StudentCreateContainer = () => {
    const createStudentUsecase = useInjection<CreateStudentUseCase>(STUDENT_SYMBOLS.CREATE_USE_CASE);

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CreateStudentCommand>({
        defaultValues: {
            firstName: "",
            lastName: "",
            uuidParallel: "",
        }
    });

    const formData = watch();

    const onSubmit = async (data: CreateStudentCommand) => {
        const result = await createStudentUsecase.execute(data);
        result.ifRight((student) => {
            if (!student) return;
            toast({
                title: "Estudiante creado",
                description: `El estudiante ${student.firstName} ${student.lastName} ha sido creado con éxito.`,
                duration: 5000,
            });
            onCancel();
        }).ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al crear el estudiante: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive"
            });
        });
    };

    const onCancel = () => {
        // Implement navigation or state reset logic here
    };

    return (
        <StudentCreatePresenter
            onCancel={onCancel}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            loading={isSubmitting}
            formData={formData}
        />
    );
};

