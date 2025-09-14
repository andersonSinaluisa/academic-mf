import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import { useInjectionMock, mockLeft, mockRight } from "@/setupTests";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { ListTeacherAssignmentsUseCase } from "@/academic/application/usecases/teacher-assignment/ListTeacherAssignmentsUseCase";
import { TeacherAssignmentListContainer } from "./TeacherAssignmentListContainer";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { toast } from "@/hooks/use-toast";
import { Page } from "@/lib/utils";

describe("TeacherAssignmentListContainer", () => {
  let listUseCase: ListTeacherAssignmentsUseCase = {
    execute: vi.fn().mockResolvedValue(
      mockRight<Page<TeacherAssignment>>({ content: [], page: 1, size: 10, total: 0, totalPage: 0 })
    ),
  } as unknown as ListTeacherAssignmentsUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useInjectionMock.mockImplementation((symbol) => {
      if (symbol === TEACHER_ASSIGNMENT_SYMBOLS.LIST_USE_CASE) return listUseCase;
      return null;
    });
  });

  it("muestra mensaje de error si la carga falla", async () => {
    listUseCase = {
      execute: vi.fn().mockResolvedValue(
        mockLeft([{ message: "Error de red", code: "NETWORK", field: "root" }])
      ),
    } as unknown as ListTeacherAssignmentsUseCase;

    render(
      <MemoryRouter>
        <TeacherAssignmentListContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: expect.stringContaining("Error de red"),
        })
      );
    });
  });

  it("muestra lista de asignaciones si la carga es exitosa", async () => {
    listUseCase = {
      execute: vi.fn().mockResolvedValue(
        mockRight<Page<TeacherAssignment>>({
          content: [
            { id: 1, teacherId: 1, courseId: 2, subjectId: 3, schoolYearId: "2023" } as TeacherAssignment,
          ],
          page: 1,
          size: 10,
          total: 1,
          totalPage: 1,
        })
      ),
    } as unknown as ListTeacherAssignmentsUseCase;

    render(
      <MemoryRouter>
        <TeacherAssignmentListContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Docente: 1/)).toBeInTheDocument();
    });
  });

  it("muestra skeleton mientras carga", async () => {
    listUseCase = {
      execute: vi.fn(() => new Promise(() => {})),
    } as unknown as ListTeacherAssignmentsUseCase;

    render(
      <MemoryRouter>
        <TeacherAssignmentListContainer />
      </MemoryRouter>
    );

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});
