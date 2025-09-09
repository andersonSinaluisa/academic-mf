import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";
import { UpdateAssessmentCommand, UpdateAssessmentUseCase } from "@/academic/application/usecases/assessment/UpdateAssessmentUseCase";
import { ListAssessmentsCommand, ListAssessmentsUseCase } from "@/academic/application/usecases/assessment/ListAssessmentsUseCase";
import { AssessmentEditPresenter } from "./AssessmentEditPresenter";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const AssessmentEditContainer = () => {
  const { id } = useParams();
  const updateUseCase = useInjection<UpdateAssessmentUseCase>(ASSESSMENT_SYMBOLS.UPDATE_USE_CASE);
  const listUseCase = useInjection<ListAssessmentsUseCase>(ASSESSMENT_SYMBOLS.LIST_USE_CASE);

  const { handleSubmit, register, setValue, formState: { errors, isSubmitting } } = useForm<UpdateAssessmentCommand & { studentId: number; subjectId: number }>();

  const fetchAssessment = useCallback(async () => {
    if (!id) return;
    const res = await listUseCase.execute(new ListAssessmentsCommand());
    res.ifRight(assessments => {
      const assessment = assessments?.find(a => a.id === Number(id));
      if (!assessment) return;
      setValue("id", assessment.id);
      setValue("studentId", assessment.studentId);
      setValue("subjectId", assessment.subjectId);
      setValue("score", assessment.score);
    }).ifLeft(failures => {
      toast({
        title: "Error",
        description: failures.map(f => f.message).join(", "),
        variant: "destructive",
        duration: 5000,
      });
    });
  }, [id, listUseCase, setValue]);

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  const onSubmit = async (data: UpdateAssessmentCommand) => {
    const res = await updateUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Evaluación actualizada", description: "La evaluación ha sido actualizada", duration: 5000 });
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f => f.message).join(", "), variant: "destructive", duration: 5000 });
    });
  };

  return (
    <AssessmentEditPresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
