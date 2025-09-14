import { useForm } from "react-hook-form";
import { EnrollmentEditPresenter } from "./EnrollmentEditPresenter";
import { UpdateEnrollmentCommand, UpdateEnrollmentUseCase } from "@/academic/application/usecases/enrollment/UpdateEnrollmentUseCase";
import { ListEnrollmentsUseCase, ListEnrollmentsCommand } from "@/academic/application/usecases/enrollment/ListEnrollmentsUseCase";
import { useInjection } from "inversify-react";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const EnrollmentEditContainer = () => {
  const { id } = useParams();
  const updateUseCase = useInjection<UpdateEnrollmentUseCase>(ENROLLMENT_SYMBOLS.UPDATE_USE_CASE);
  const listUseCase = useInjection<ListEnrollmentsUseCase>(ENROLLMENT_SYMBOLS.LIST_USE_CASE);

  const { handleSubmit, register, watch, setValue, formState: { errors, isSubmitting } } = useForm<UpdateEnrollmentCommand>();
  const formData = watch();

  const fetchEnrollment = useCallback(async () => {
    if (!id) return;
    const res = await listUseCase.execute(new ListEnrollmentsCommand());
    res.ifRight(list => {
      const enrollment = list?.find(e => e.id === Number(id));
      if (enrollment) {
        setValue("id", enrollment.id);
        setValue("courseId", enrollment.courseId);
        (setValue as any)("studentId", enrollment.studentId);
      }
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f=>f.message).join(", "), duration:5000, variant:"destructive" });
    });
  }, [id, listUseCase, setValue]);

  useEffect(() => { fetchEnrollment(); }, [fetchEnrollment]);

  const onSubmit = async (data: UpdateEnrollmentCommand) => {
    const res = await updateUseCase.execute(data);
    res.ifRight(() => { toast({ title: "Matrícula actualizada", description: "La matrícula ha sido actualizada", duration:5000 }); });
    res.ifLeft(failures => { toast({ title: "Error", description: failures.map(f=>f.message).join(", "), duration:5000, variant:"destructive" }); });
  };

  return (
    <EnrollmentEditPresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register as any}
      errors={errors as any}
      loading={isSubmitting}
      formData={formData as any}
    />
  );
};
