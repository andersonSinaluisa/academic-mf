import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { CreatePromotionActCommand, CreatePromotionActUseCase } from "@/academic/application/usecases/promotion-act/CreatePromotionActUseCase";
import { toast } from "@/hooks/use-toast";
import { PromotionActCreatePresenter } from "./PromotionActCreatePresenter";

export const PromotionActCreateContainer = () => {
  const createUseCase = useInjection<CreatePromotionActUseCase>(PROMOTION_ACT_SYMBOLS.CREATE_USE_CASE);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreatePromotionActCommand>();

  const onSubmit = async (data: CreatePromotionActCommand) => {
    const res = await createUseCase.execute(data);
    res.ifRight(() => {
      toast({ title: "Acta creada", description: "El acta de promoción ha sido creada", duration: 5000 });
      reset();
    }).ifLeft(failures => {
      toast({ title: "Error", description: failures.map(f => f.message).join(", "), variant: "destructive", duration: 5000 });
    });
  };

  return (
    <PromotionActCreatePresenter
      onCancel={() => {}}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={isSubmitting}
    />
  );
};
