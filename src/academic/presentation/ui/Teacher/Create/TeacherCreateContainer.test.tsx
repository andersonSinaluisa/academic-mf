import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { TeacherCreateContainer } from "./TeacherCreateContainer";
import { vi } from "vitest";


import { toast } from "@/hooks/use-toast";
import {  mockLeft, useInjectionMock } from "@/setupTests";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { CreateTeacherUseCase } from "@/academic/application/usecases/teacher/CreateTeacherUseCase";
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher";

describe("TeacherCreateContainer", () => {
    let executeMock : CreateTeacherUseCase;
    
    beforeEach(() => {
        vi.clearAllMocks();
        executeMock = {
            execute: vi.fn(),
        } as unknown as CreateTeacherUseCase;
        useInjectionMock.mockImplementation((symbol) => {
            if (symbol === TEACHER_SYMBOLS.CREATE_USE_CASE) return executeMock;
            return null;
        });
    });

    it("crea profesor y muestra toast de éxito", async () => {
        // 👉 simulamos que ifRight se llama y devuelve un objeto con ifLeft
        executeMock = {
            execute:vi.fn().mockResolvedValue({
                ifRight: (fn: (data: { firstName: string; lastName: string }) => void) => {
                    fn({ firstName: "Juan", lastName: "Pérez" });
                    return { ifLeft: () => { } };
                },
            })
        } as unknown as CreateTeacherUseCase;

        render(
            <MemoryRouter>
                <TeacherCreateContainer />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
        fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });
        fireEvent.change(screen.getByLabelText(/Identificación/i), { target: { value: "123" } });
        fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), { target: { value: "2000-01-01" } });

        fireEvent.click(screen.getByText("Guardar"));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Profesor creado",
                    description: expect.stringContaining("Juan Pérez"),
                })
            );
        });
    });

    it("muestra error si falla la creación del profesor", async () => {
       
        executeMock = {
            execute: vi.fn().mockResolvedValue(
                mockLeft([
                    new AbstractFailure("error", "Error al crear profesor","root")
                ])
            )
        } as unknown as CreateTeacherUseCase;

        render(
            <MemoryRouter>
                <TeacherCreateContainer />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
        fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });
        fireEvent.change(screen.getByLabelText(/Identificación/i), { target: { value: "123" } });
        fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), { target: { value: "2000-01-01" } });
        fireEvent.click(screen.getByRole("combobox"));
        const options = screen.getAllByText("Masculino");
        fireEvent.click(options[options.length - 1]);

        fireEvent.click(screen.getByText("Guardar"));

        await waitFor(() => {
            expect(executeMock.execute).toHaveBeenCalled();
            expect(toast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Error",
                    description: expect.stringContaining("Error al crear profesor"),
                    variant: "destructive",
                })
            );
        });
    });
});
