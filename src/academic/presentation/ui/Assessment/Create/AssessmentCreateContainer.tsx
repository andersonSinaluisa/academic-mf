import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";
import { CreateAssessmentCommand, CreateAssessmentUseCase } from "@/academic/application/usecases/assessment/CreateAssessmentUseCase";
import { toast } from "@/hooks/use-toast";
import { AssessmentCreatePresenter } from "./AssessmentCreatePresenter";

export const AssessmentCreateContainer = () => {
  const createUseCase = useInjection<CreateAssessmentUseCase>(ASSESSMENT_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateAssessmentCommand>();

  const onSubmit = async (data: CreateAssessmentCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({
        title: "Evaluación creada",
        description: "La evaluación ha sido creada correctamente",
        duration: 5000,
      });
      reset();
    }).ifLeft(failures => {
      toast({
        title: "Error",
        description: failures.map(f => f.message).join(", "),
        variant: "destructive",
        duration: 5000,
      });
    });
  };

  return (
    <AssessmentCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
