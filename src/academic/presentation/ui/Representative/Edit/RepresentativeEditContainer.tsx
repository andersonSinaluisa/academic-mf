import { useForm } from "react-hook-form";
import { RepresentativeEditPresenter } from "./RepresentativeEditPresenter";
import { UpdateRepresentativeCommand, UpdateRepresentativeUseCase } from "@/academic/application/usecases/representative/UpdateRepresentativeUseCase";
import { useInjection } from "inversify-react";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import { useParams } from "react-router";
import { GetRepresentativeCommand, GetRepresentativeUseCase } from "@/academic/application/usecases/representative/GetRepresentativeUseCase";
import { useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const RepresentativeEditContainer = () => {
    const { id } = useParams();

    const updateUseCase = useInjection<UpdateRepresentativeUseCase>(REPRESENTATIVE_SYMBOLS.UPDATE_USE_CASE);
    const getUseCase = useInjection<GetRepresentativeUseCase>(REPRESENTATIVE_SYMBOLS.GET_USE_CASE);

    const { handleSubmit, register, watch, setValue, formState: { errors, isSubmitting } } = useForm<UpdateRepresentativeCommand>({
        defaultValues: {
            id: 0,
            firstName: "",
            lastName: "",
            phone: "",
            birthDate: "",
            uuidUser: "",
            address: "",
            identification: "",
            nacionality: "",
            gender: "",
            image: "",
        },
    });

    const formData = watch();

    const fetchRepresentative = useCallback(async () => {
        if (!id) return;
        const res = await getUseCase.execute(new GetRepresentativeCommand(Number(id)));
        res
            .ifRight((rep) => {
                if (!rep) return;
                setValue("id", rep.id);
                setValue("firstName", rep.firstName);
                setValue("lastName", rep.lastName);
                setValue("phone", rep.phone || "");
                setValue("birthDate", rep.birthDate || "");
                setValue("uuidUser", rep.uuidUser || "");
                setValue("address", rep.address || "");
                setValue("identification", rep.identification || "");
                setValue("nacionality", rep.nacionality || "");
                setValue("gender", rep.gender || "");
                setValue("image", rep.image || "");
            })
            .ifLeft((failures) => {
                toast({
                    title: "Error",
                    description: "Error al obtener el representante: " + failures.map(f => f.message).join(", "),
                    duration: 5000,
                    variant: "destructive",
                });
            });
    }, [getUseCase, id, setValue]);

    useEffect(() => {
        fetchRepresentative();
    }, [fetchRepresentative]);

    const onSubmit = async (data: UpdateRepresentativeCommand) => {
        const res = await updateUseCase.execute(data);
        res
            .ifRight((rep) => {
                toast({
                    title: "Representante actualizado",
                    description: `El representante ${rep?.firstName} ${rep?.lastName} ha sido actualizado.`,
                    duration: 5000,
                });
            })
            .ifLeft((failures) => {
                toast({
                    title: "Error",
                    description: "Error al actualizar el representante: " + failures.map(f => f.message).join(", "),
                    duration: 5000,
                    variant: "destructive",
                });
            });
    };

    return (
        <RepresentativeEditPresenter
            onCancel={() => { }}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            loading={isSubmitting}
            formData={formData}
        />
    );
};

