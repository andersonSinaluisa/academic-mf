import { useForm } from "react-hook-form";
import { AttendanceEditPresenter } from "./AttendanceEditPresenter";
import { UpdateAttendanceCommand, UpdateAttendanceUseCase } from "@/academic/application/usecases/attendance/UpdateAttendanceUseCase";
import { ListAttendanceUseCase, ListAttendanceCommand } from "@/academic/application/usecases/attendance/ListAttendanceUseCase";
import { useInjection } from "inversify-react";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const AttendanceEditContainer = () => {
  const { id } = useParams();
  const updateUseCase = useInjection<UpdateAttendanceUseCase>(ATTENDANCE_SYMBOLS.UPDATE_USE_CASE);
  const listUseCase = useInjection<ListAttendanceUseCase>(ATTENDANCE_SYMBOLS.LIST_USE_CASE);

  const { handleSubmit, register, watch, setValue, control, formState: { errors, isSubmitting } } = useForm<UpdateAttendanceCommand>();
  const formData = watch();

  const fetchAttendance = useCallback(async () => {
    if (!id) return;
    const res = await listUseCase.execute(new ListAttendanceCommand(1, 1000));
    res
      .ifRight(list => {
        const attendance = list?.content.find(a => a.id === Number(id));
        if (attendance) {
          setValue("id", attendance.id);
          setValue("status", attendance.status);
          (setValue as any)("studentId", attendance.studentId);
          (setValue as any)("date", attendance.date);
        }
      })
      .ifLeft(failures => {
        toast({
          title: "Error",
          description: failures.map(f => f.message).join(", "),
          duration: 5000,
          variant: "destructive",
        });
      });
  }, [id, listUseCase, setValue]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const onSubmit = async (data: UpdateAttendanceCommand) => {
    const res = await updateUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Asistencia actualizada", description: "La asistencia ha sido actualizada", duration:5000 });
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f=>f.message).join(", "), duration:5000, variant:"destructive" });
    });
  };

  return (
    <AttendanceEditPresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register as any}
      errors={errors as any}
      loading={isSubmitting}
      control={control as any}
      formData={formData as any}
    />
  );
};
