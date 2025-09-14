import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";
import { CreateMeetingCommand, CreateMeetingUseCase } from "@/academic/application/usecases/meeting/CreateMeetingUseCase";
import { toast } from "@/hooks/use-toast";
import { MeetingCreatePresenter } from "./MeetingCreatePresenter";

export const MeetingCreateContainer = () => {
  const createUseCase = useInjection<CreateMeetingUseCase>(MEETING_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateMeetingCommand>();

  const onSubmit = async (data: CreateMeetingCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Reunión creada", description: "La reunión ha sido registrada", duration: 5000 });
      reset();
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f => f.message).join(", "), variant: "destructive", duration: 5000 });
    });
  };

  return (
    <MeetingCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
