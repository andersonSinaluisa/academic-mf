import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { TeacherAssignmentListPresenter } from "./TeacherAssignmentListPresenter";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { Page } from "@/lib/utils";

const defaultProps = {
  assignments: { content: [], page: 0, size: 10, total: 0, totalPage: 0 } as Page<TeacherAssignment>,
  loading: false,
  error: null as string | null,
  searchTerm: "",
  onSearchChange: vi.fn(),
  onAddAssignment: vi.fn(),
};

const renderPresenter = (props: Partial<React.ComponentProps<typeof TeacherAssignmentListPresenter>> = {}) => {
  return render(
    <MemoryRouter>
      <TeacherAssignmentListPresenter {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("TeacherAssignmentListPresenter", () => {
  it("muestra skeleton mientras carga", async () => {
    renderPresenter({ loading: true });
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    const error = "Error de red";
    renderPresenter({ error });
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("muestra asignaciones", () => {
    const assignments: Page<TeacherAssignment> = {
      content: [{ id: 1, teacherId: 1, courseId: 2, subjectId: 3, schoolYearId: "2023" }],
      page: 1,
      size: 10,
      total: 1,
      totalPage: 1,
    };
    renderPresenter({ assignments });
    expect(screen.getByText(/Docente: 1/)).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay asignaciones", () => {
    renderPresenter({ assignments: { ...defaultProps.assignments, content: [] } });
    expect(screen.getByText("No hay asignaciones registradas aún.")).toBeInTheDocument();
  });
});
