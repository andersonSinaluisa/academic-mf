import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { TeacherAssignmentCreateContainer } from "./TeacherAssignmentCreateContainer";
import { useInjectionMock, mockLeft } from "@/setupTests";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { CreateTeacherAssignmentUseCase } from "@/academic/application/usecases/teacher-assignment/CreateTeacherAssignmentUseCase";
import { toast } from "@/hooks/use-toast";

describe("TeacherAssignmentCreateContainer", () => {
  let executeMock: CreateTeacherAssignmentUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    executeMock = { execute: vi.fn() } as unknown as CreateTeacherAssignmentUseCase;
    useInjectionMock.mockImplementation((symbol) => {
      if (symbol === TEACHER_ASSIGNMENT_SYMBOLS.CREATE_USE_CASE) return executeMock;
      return null;
    });
  });

  it("crea asignación y muestra toast de éxito", async () => {
    executeMock = {
      execute: vi.fn().mockResolvedValue({
        ifRight: (fn: () => void) => {
          fn();
          return { ifLeft: () => {} };
        },
      }),
    } as unknown as CreateTeacherAssignmentUseCase;

    render(
      <MemoryRouter>
        <TeacherAssignmentCreateContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/ID Docente/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/ID Curso/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/ID Asignatura/i), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText(/Año Lectivo/i), { target: { value: "2023" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Asignación creada",
          description: expect.stringContaining("La asignación docente ha sido creada"),
        })
      );
    });
  });

  it("muestra error si falla la creación", async () => {
    executeMock = {
      execute: vi.fn().mockResolvedValue(
        mockLeft([{ message: "Error al crear", code: "E", field: "root" }])
      ),
    } as unknown as CreateTeacherAssignmentUseCase;

    render(
      <MemoryRouter>
        <TeacherAssignmentCreateContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/ID Docente/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/ID Curso/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/ID Asignatura/i), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText(/Año Lectivo/i), { target: { value: "2023" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: expect.stringContaining("Error al crear"),
          variant: "destructive",
        })
      );
    });
  });
});
