import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { TEACHER_PLANNING_SYMBOLS } from "@/academic/domain/symbols/TeacherPlanning";
import { CreateTeacherPlanningCommand, CreateTeacherPlanningUseCase } from "@/academic/application/usecases/teacher-planning/CreateTeacherPlanningUseCase";
import { toast } from "@/hooks/use-toast";
import { TeacherPlanningCreatePresenter } from "./TeacherPlanningCreatePresenter";

export const TeacherPlanningCreateContainer = () => {
  const createUseCase = useInjection<CreateTeacherPlanningUseCase>(TEACHER_PLANNING_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateTeacherPlanningCommand>();

  const onSubmit = async (data: CreateTeacherPlanningCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Planificación creada", description: "La planificación ha sido registrada", duration: 5000 });
      reset();
    }).ifLeft(f => {
      toast({ title: "Error", description: f.map(x => x.message).join(", "), variant: "destructive", duration: 5000 });
    });
  };

  return (
    <TeacherPlanningCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
