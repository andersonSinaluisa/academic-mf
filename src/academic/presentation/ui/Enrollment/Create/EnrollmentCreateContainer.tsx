import { CreateEnrollmentCommand, CreateEnrollmentUseCase } from "@/academic/application/usecases/enrollment/CreateEnrollmentUseCase";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";
import { useInjection } from "inversify-react";
import { useForm } from "react-hook-form";
import { EnrollmentCreatePresenter } from "./EnrollmentCreatePresenter";
import { toast } from "@/hooks/use-toast";

export const EnrollmentCreateContainer = () => {
  const createUseCase = useInjection<CreateEnrollmentUseCase>(ENROLLMENT_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateEnrollmentCommand>({
    defaultValues: { studentId: 0, courseId: "" }
  });

  const onSubmit = async (data: CreateEnrollmentCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Matrícula creada", description: "La matrícula ha sido registrada", duration:5000 });
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f=>f.message).join(", "), duration:5000, variant:"destructive" });
    });
  };

  return (
    <EnrollmentCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
