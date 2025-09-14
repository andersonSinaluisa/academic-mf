import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { useForm } from "react-hook-form";
import { UpdateTeacherCommand } from "@/academic/application/usecases/teacher/UpdateTeacherUseCase";
import { TeacherEditPresenter } from "./TeacherEditPresenter";

function Wrapper({
    formData,
    onCancel,
    loading,
    _handleSubmit,
}: Readonly<{
    formData: UpdateTeacherCommand,
    onCancel: () => void,
    loading?: boolean,
    _handleSubmit: (data: UpdateTeacherCommand) => void
}>) {
    const { register, control, formState: { errors },
        handleSubmit } = useForm<UpdateTeacherCommand>({
            defaultValues: {
                ...formData
            },
        });

    return (
        <MemoryRouter>
            <TeacherEditPresenter
                onCancel={onCancel}
                loading={loading}
                onSubmit={handleSubmit(_handleSubmit)}
                register={register}
                control={control}
                errors={errors}
                formData={formData}
            />
        </MemoryRouter>
    );
}


describe("TeacherEditPresenter", () => {
    it("renderiza el título y botones", async() => {
            render(<Wrapper
                formData={new UpdateTeacherCommand(0, "", "", "", "", "", "", "", "", "", "")}
                onCancel={vi.fn()}
                _handleSubmit={vi.fn()}
                loading={false}
            />)
    
                
            const titles = await screen.findAllByText(/Editar Profesor/i);
            expect(titles.length).toBeGreaterThan(0);
            expect(screen.getByText("Guardar")).toBeInTheDocument();
            expect(screen.getByText("Cancelar")).toBeInTheDocument();
        });
    
        it("muestra errores de validación", async () => {
            render(<Wrapper
                formData={new UpdateTeacherCommand(0,"", "", "", "", "", "", "", "", "", "")}
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
                formData={new UpdateTeacherCommand(0, "", "", "", "", "", "", "", "", "", "")}
                onCancel={onCancel}
                _handleSubmit={vi.fn()}
                loading={false}
            />)
    
            fireEvent.click(screen.getByText("Cancelar"));
            expect(onCancel).toHaveBeenCalled();
        });
    
        it("deshabilita el botón Guardar cuando loading es true", () => {
            render(<Wrapper
                formData={new UpdateTeacherCommand(0, "", "", "", "", "", "", "", "", "", "")}
                onCancel={vi.fn()}
                _handleSubmit={vi.fn()}
                loading={true}
            />)
    
            expect(screen.getByText("Guardando...")).toBeDisabled();
        });
});