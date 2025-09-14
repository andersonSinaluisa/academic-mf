import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";
import { UpdateBehaviorReportCommand, UpdateBehaviorReportUseCase } from "@/academic/application/usecases/behavior-report/UpdateBehaviorReportUseCase";
import { ListBehaviorReportsCommand, ListBehaviorReportsUseCase } from "@/academic/application/usecases/behavior-report/ListBehaviorReportsUseCase";
import { BehaviorReportEditPresenter } from "./BehaviorReportEditPresenter";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const BehaviorReportEditContainer = () => {
  const { id } = useParams();

  const updateUseCase = useInjection<UpdateBehaviorReportUseCase>(BEHAVIOR_REPORT_SYMBOLS.UPDATE_USE_CASE);
  const listUseCase = useInjection<ListBehaviorReportsUseCase>(BEHAVIOR_REPORT_SYMBOLS.LIST_USE_CASE);

  const { handleSubmit, register, setValue, formState: { errors, isSubmitting } } = useForm<UpdateBehaviorReportCommand & { studentId: number }>();

  const fetchReport = useCallback(async () => {
    if (!id) return;
    const res = await listUseCase.execute(new ListBehaviorReportsCommand());
    res.ifRight((reports) => {
      const report = reports?.find(r => r.id === Number(id));
      if (!report) return;
      setValue("id", report.id);
      setValue("description", report.description);
      setValue("studentId", report.studentId);
    }).ifLeft((failures) => {
      toast({
        title: "Error",
        description: "Error al obtener el reporte: " + failures.map(f => f.message).join(", "),
        variant: "destructive",
        duration: 5000,
      });
    });
  }, [id, listUseCase, setValue]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const onSubmit = async (data: UpdateBehaviorReportCommand) => {
    const res = await updateUseCase.execute(data);
    res.ifRight(() => {
      toast({
        title: "Reporte actualizado",
        description: `El reporte ha sido actualizado con éxito.`,
        duration: 5000,
      });
    }).ifLeft((failures) => {
      toast({
        title: "Error",
        description: "Error al actualizar el reporte: " + failures.map(f => f.message).join(", "),
        variant: "destructive",
        duration: 5000,
      });
    });
  };

  return (
    <BehaviorReportEditPresenter
      onCancel={() => { }}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
