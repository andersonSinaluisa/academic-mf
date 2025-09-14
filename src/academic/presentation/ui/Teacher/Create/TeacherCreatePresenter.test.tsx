

import { render, screen, fireEvent } from "@testing-library/react";
import { TeacherCreatePresenter } from "./TeacherCreatePresenter";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { useForm } from "react-hook-form";
import { CreateTeacherCommand } from "@/academic/application/usecases/teacher/CreateTeacherUseCase";

function Wrapper({
    formData,
    onCancel,
    loading,
    _handleSubmit,
}: Readonly<{
    formData: CreateTeacherCommand,
    onCancel: () => void,
    loading?: boolean,
    _handleSubmit: (data: CreateTeacherCommand) => void
}>) {
    const { register, control, formState: { errors }, 
    handleSubmit } = useForm<CreateTeacherCommand>({
        defaultValues: {
            ...formData
        },
    });

    return (
        <MemoryRouter>
            <TeacherCreatePresenter
                onCancel={onCancel}
                loading={loading}
                handleSubmit={handleSubmit(_handleSubmit)}
                register={register}
                control={control}
                errors={errors}
                formData={formData}
            />
        </MemoryRouter>
    );
}

describe("TeacherCreatePresenter", () => {
    it("renderiza el título y botones", () => {
        render(<Wrapper
            formData={new CreateTeacherCommand("", "", "", "", "", "", "", "", "", "")}
            onCancel={vi.fn()}
            _handleSubmit={vi.fn()}
            loading={false}
        />)

 
        expect(screen.getByText("Registrar Profesor")).toBeInTheDocument();
        expect(screen.getByText("Guardar")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    it("muestra errores de validación", async () => {
        render(<Wrapper
            formData={new CreateTeacherCommand("", "", "", "", "", "", "", "", "", "")}
            onCancel={vi.fn()}
            _handleSubmit={vi.fn()}
            loading={false}
        />)
            
        fireEvent.click(screen.getByText("Guardar"));
        expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
        expect(await screen.findByText("El apellido es obligatorio")).toBeInTheDocument();
    });

    it("llama a onCancel al hacer clic en Cancelar", () => {
        const onCancel = vi.fn();
        render(<Wrapper
            formData={new CreateTeacherCommand("", "", "", "", "", "", "", "", "", "")}
            onCancel={onCancel}
            _handleSubmit={vi.fn()}
            loading={false}
        />)

        fireEvent.click(screen.getByText("Cancelar"));
        expect(onCancel).toHaveBeenCalled();
    });

    it("deshabilita el botón Guardar cuando loading es true", () => {
        render(<Wrapper
            formData={new CreateTeacherCommand("", "", "", "", "", "", "", "", "", "")}
            onCancel={vi.fn()}
            _handleSubmit={vi.fn()}
            loading={true}
        />)

        expect(screen.getByText("Guardando...")).toBeDisabled();
    });

});
