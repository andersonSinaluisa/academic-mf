import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { StudentListPresenter } from "./StudentListPresenter";
import { Student } from "@/academic/domain/entities/Student";
import { Page } from "@/lib/utils";

const defaultProps = {
  students: {
    content: [] as Student[],
    page: 1,
    size: 10,
    total: 0,
    totalPage: 0,
  } as Page<Student>,
  loading: false,
  error: null as string | null,
  searchTerm: "",
  onSearchChange: vi.fn(),
  onAddStudent: vi.fn(),
};

const renderPresenter = (
  props: Partial<React.ComponentProps<typeof StudentListPresenter>> = {}
) => {
  return render(
    <MemoryRouter>
      <StudentListPresenter {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("StudentListPresenter", () => {
  it("muestra skeleton mientras carga", async () => {
    renderPresenter({ loading: true });
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    const error = "Error de red";
    renderPresenter({ error });
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("muestra estudiantes", () => {
    const students: Page<Student> = {
      content: [new Student(1, "Juan", "Pérez", "P1")],
      page: 1,
      size: 10,
      total: 1,
      totalPage: 1,
    };
    renderPresenter({ students });
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay estudiantes", () => {
    renderPresenter({ students: { ...defaultProps.students, content: [] } });
    expect(screen.getByText("No hay estudiantes registrados aún.")).toBeInTheDocument();
  });

  it("muestra controles de paginación", () => {
    const students: Page<Student> = {
      content: [],
      page: 1,
      size: 10,
      total: 20,
      totalPage: 2,
    };
    renderPresenter({ students });
    expect(
      screen.getByText("Página 1 de 2 - Total de estudiantes: 20")
    ).toBeInTheDocument();
    expect(screen.getByText("Página anterior")).toBeInTheDocument();
    expect(screen.getByText("Página siguiente")).toBeInTheDocument();
  });
});

