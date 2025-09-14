import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { StudentCreateContainer } from "./StudentCreateContainer";
import { useInjectionMock, mockLeft } from "@/setupTests";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";
import { CreateStudentUseCase } from "@/academic/application/usecases/student/CreateStudentUseCase";
import { toast } from "@/hooks/use-toast";

describe("StudentCreateContainer", () => {
  let executeMock: CreateStudentUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    executeMock = { execute: vi.fn() } as unknown as CreateStudentUseCase;
    useInjectionMock.mockImplementation((symbol) => {
      if (symbol === STUDENT_SYMBOLS.CREATE_USE_CASE) return executeMock;
      return null;
    });
  });

  it("crea estudiante y muestra toast de éxito", async () => {
    executeMock = {
      execute: vi.fn().mockResolvedValue({
        ifRight: (fn: (data: { firstName: string; lastName: string }) => void) => {
          fn({ firstName: "Juan", lastName: "Pérez" });
          return { ifLeft: () => {} };
        },
      }),
    } as unknown as CreateStudentUseCase;

    render(
      <MemoryRouter>
        <StudentCreateContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/Paralelo/i), { target: { value: "P1" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Estudiante creado",
          description: expect.stringContaining("Juan Pérez"),
        })
      );
    });
  });

  it("muestra error si falla la creación", async () => {
    executeMock = {
      execute: vi.fn().mockResolvedValue(
        mockLeft([{ message: "Error al crear estudiante", code: "E", field: "root" }])
      ),
    } as unknown as CreateStudentUseCase;

    render(
      <MemoryRouter>
        <StudentCreateContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/Paralelo/i), { target: { value: "P1" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: expect.stringContaining("Error al crear estudiante"),
          variant: "destructive",
        })
      );
    });
  });
});

