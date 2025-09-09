import { CreateBehaviorReportCommand, CreateBehaviorReportUseCase } from "@/academic/application/usecases/behavior-report/CreateBehaviorReportUseCase";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";
import { BehaviorReportCreatePresenter } from "./BehaviorReportCreatePresenter";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";

export const BehaviorReportCreateContainer = () => {
  const createUseCase = useInjection<CreateBehaviorReportUseCase>(BEHAVIOR_REPORT_SYMBOLS.CREATE_USE_CASE);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateBehaviorReportCommand>({
    defaultValues: {
      studentId: 0,
      description: "",
    },
  });

  const onSubmit = async (data: CreateBehaviorReportCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight((report) => {
      toast({
        title: "Reporte creado",
        description: `Se registró el reporte para el estudiante ${report?.studentId}.`,
        duration: 5000,
      });
      onCancel();
    }).ifLeft((failures) => {
      toast({
        title: "Error",
        description: "Error al crear el reporte: " + failures.map(f => f.message).join(", "),
        variant: "destructive",
        duration: 5000,
      });
    });
  };

  const onCancel = () => {
    // Implement navigation or state reset if needed
  };

  return (
    <BehaviorReportCreatePresenter
      onCancel={onCancel}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
