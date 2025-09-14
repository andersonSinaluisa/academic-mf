import { useForm } from "react-hook-form";
import { StudentEditPresenter } from "./StudentEditPresenter";
import { UpdateStudentCommand, UpdateStudentUseCase } from "@/academic/application/usecases/student/UpdateStudentUseCase";
import { useInjection } from "inversify-react";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";
import { useParams } from "react-router";
import { GetStudentCommand, GetStudentUseCase } from "@/academic/application/usecases/student/GetStudentUseCase";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const StudentEditContainer = () => {
    const { id } = useParams();

    const updateUseCase = useInjection<UpdateStudentUseCase>(STUDENT_SYMBOLS.UPDATE_USE_CASE);
    const getUseCase = useInjection<GetStudentUseCase>(STUDENT_SYMBOLS.GET_USE_CASE);

    const { handleSubmit, register, watch, setValue, formState: { errors, isSubmitting } } = useForm<UpdateStudentCommand>();

    const formData = watch();

    const fetchStudent = useCallback(async () => {
        if (!id) return;
        const res = await getUseCase.execute(new GetStudentCommand(Number(id)));
        res.ifRight((student) => {
            if (!student) return;
            setValue("id", student.id);
            setValue("firstName", student.firstName);
            setValue("lastName", student.lastName);
            setValue("uuidParallel", student.uuidParallel);
        });
        res.ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al obtener el estudiante: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive",
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);

    const onSubmit = async (data: UpdateStudentCommand) => {
        const res = await updateUseCase.execute(data);
        res.ifRight((student) => {
            toast({
                title: "Estudiante actualizado",
                description: `El estudiante ${student?.firstName} ${student?.lastName} ha sido actualizado.`,
                duration: 5000,
            });
        });
        res.ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al actualizar el estudiante: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive",
            });
        });
    };

    return (
        <StudentEditPresenter
            onCancel={() => { }}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            loading={isSubmitting}
            formData={formData}
        />
    );
};

