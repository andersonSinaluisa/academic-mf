import { CreateRepresentativeCommand, CreateRepresentativeUseCase } from "@/academic/application/usecases/representative/CreateRepresentativeUseCase";
import { useForm } from "react-hook-form";
import { RepresentativeCreatePresenter } from "./RepresentativeCreatePresenter";
import { useInjection } from "inversify-react";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import { toast } from "@/hooks/use-toast";

export const RepresentativeCreateContainer = () => {
    const createUseCase = useInjection<CreateRepresentativeUseCase>(REPRESENTATIVE_SYMBOLS.CREATE_USE_CASE);

    const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<CreateRepresentativeCommand>({
        defaultValues: {
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
        }
    });

    const formData = watch();

    const onSubmit = async (data: CreateRepresentativeCommand) => {
        const res = await createUseCase.execute(data);
        res.ifRight((rep) => {
            if (!rep) return;
            toast({
                title: "Representante creado",
                description: `El representante ${rep.firstName} ${rep.lastName} ha sido creado con éxito.`,
                duration: 5000,
            });
            onCancel();
        }).ifLeft((failures) => {
            toast({
                title: "Error",
                description: "Error al crear el representante: " + failures.map(f => f.message).join(", "),
                duration: 5000,
                variant: "destructive",
            });
        });
    };

    const onCancel = () => {
        // Implement navigation or state reset logic here
    };

    return (
        <RepresentativeCreatePresenter
            onCancel={onCancel}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            loading={isSubmitting}
            formData={formData}
        />
    );
};

