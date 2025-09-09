import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { CreateTeacherAssignmentCommand, CreateTeacherAssignmentUseCase } from "@/academic/application/usecases/teacher-assignment/CreateTeacherAssignmentUseCase";
import { toast } from "@/hooks/use-toast";
import { TeacherAssignmentCreatePresenter } from "./TeacherAssignmentCreatePresenter";

export const TeacherAssignmentCreateContainer = () => {
  const createUseCase = useInjection<CreateTeacherAssignmentUseCase>(TEACHER_ASSIGNMENT_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateTeacherAssignmentCommand>();

  const onSubmit = async (data: CreateTeacherAssignmentCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Asignación creada", description: "La asignación docente ha sido creada", duration: 5000 });
      reset();
    }).ifLeft(f => {
      toast({ title: "Error", description: f.map(x => x.message).join(", "), variant: "destructive", duration: 5000 });
    });
  };

  return (
    <TeacherAssignmentCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
