import { CreateAttendanceCommand, CreateAttendanceUseCase } from "@/academic/application/usecases/attendance/CreateAttendanceUseCase";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";
import { useInjection } from "inversify-react";
import { useForm } from "react-hook-form";
import { AttendanceCreatePresenter } from "./AttendanceCreatePresenter";
import { toast } from "@/hooks/use-toast";

export const AttendanceCreateContainer = () => {
  const createUseCase = useInjection<CreateAttendanceUseCase>(ATTENDANCE_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<CreateAttendanceCommand>({
    defaultValues: { studentId: 0, date: "", status: "PRESENT" }
  });

  const onSubmit = async (data: CreateAttendanceCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Asistencia registrada", description: "La asistencia ha sido creada con éxito", duration: 5000 });
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f=>f.message).join(", "), duration:5000, variant:"destructive" });
    });
  };

  return (
    <AttendanceCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
      control={control}
    />
  );
};
