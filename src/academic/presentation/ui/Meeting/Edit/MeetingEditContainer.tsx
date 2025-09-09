import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";
import { UpdateMeetingCommand, UpdateMeetingUseCase } from "@/academic/application/usecases/meeting/UpdateMeetingUseCase";
import { ListMeetingsCommand, ListMeetingsUseCase } from "@/academic/application/usecases/meeting/ListMeetingsUseCase";
import { MeetingEditPresenter } from "./MeetingEditPresenter";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const MeetingEditContainer = () => {
  const { id } = useParams();
  const updateUseCase = useInjection<UpdateMeetingUseCase>(MEETING_SYMBOLS.UPDATE_USE_CASE);
  const listUseCase = useInjection<ListMeetingsUseCase>(MEETING_SYMBOLS.LIST_USE_CASE);

  const { handleSubmit, register, setValue, formState: { errors, isSubmitting } } = useForm<UpdateMeetingCommand & { date: string }>();

  const fetchMeeting = useCallback(async () => {
    if (!id) return;
    const res = await listUseCase.execute(new ListMeetingsCommand());
    res.ifRight(meetings => {
      const meeting = meetings?.find(m => m.id === Number(id));
      if (!meeting) return;
      setValue("id", meeting.id);
      setValue("topic", meeting.topic);
      setValue("date", meeting.date);
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f => f.message).join(", "), variant: "destructive", duration: 5000 });
    });
  }, [id, listUseCase, setValue]);

  useEffect(() => { fetchMeeting(); }, [fetchMeeting]);

  const onSubmit = async (data: UpdateMeetingCommand & { date: string }) => {
    const res = await updateUseCase.execute(new UpdateMeetingCommand(data.id, data.topic));
    res.ifRight(() => {
      toast({ title: "Reunión actualizada", description: "La reunión ha sido actualizada", duration: 5000 });
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f => f.message).join(", "), variant: "destructive", duration: 5000 });
    });
  };

  return (
    <MeetingEditPresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
