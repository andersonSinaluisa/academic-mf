import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { RepresentativeListPresenter } from "./RepresentativeListPresenter";
import { Representative } from "@/academic/domain/entities/Representative";
import { Page } from "@/lib/utils";

const defaultProps = {
  representatives: {
    content: [] as Representative[],
    page: 1,
    size: 10,
    total: 0,
    totalPage: 0,
  } as Page<Representative>,
  loading: false,
  error: null as string | null,
  searchTerm: "",
  onSearchChange: vi.fn(),
  onAddRepresentative: vi.fn(),
};

const renderPresenter = (
  props: Partial<React.ComponentProps<typeof RepresentativeListPresenter>> = {}
) => {
  return render(
    <MemoryRouter>
      <RepresentativeListPresenter {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("RepresentativeListPresenter", () => {
  it("muestra skeleton mientras carga", async () => {
    renderPresenter({ loading: true });
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    const error = "Error de red";
    renderPresenter({ error });
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("muestra representantes", () => {
    const reps: Page<Representative> = {
      content: [
        new Representative(1, "Juan", "Pérez"),
      ],
      page: 1,
      size: 10,
      total: 1,
      totalPage: 1,
    } as any;
    renderPresenter({ representatives: reps });
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay representantes", () => {
    renderPresenter({ representatives: { ...defaultProps.representatives, content: [] } });
    expect(screen.getByText("No hay representantes registrados aún.")).toBeInTheDocument();
  });

  it("muestra controles de paginación", () => {
    const reps: Page<Representative> = {
      content: [],
      page: 1,
      size: 10,
      total: 20,
      totalPage: 2,
    } as any;
    renderPresenter({ representatives: reps });
    expect(
      screen.getByText("Página 1 de 2 - Total de representantes: 20")
    ).toBeInTheDocument();
    expect(screen.getByText("Página anterior")).toBeInTheDocument();
    expect(screen.getByText("Página siguiente")).toBeInTheDocument();
  });
});
