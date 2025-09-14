import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import { useInjectionMock, mockLeft, mockRight } from "@/setupTests";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import { ListRepresentativesUseCase } from "@/academic/application/usecases/representative/ListRepresentativesUseCase";
import { RepresentativeListContainer } from "./RepresentativeListContainer";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

describe("RepresentativeListContainer", () => {
  let listUseCase: ListRepresentativesUseCase = {
    execute: vi.fn().mockResolvedValue(
      mockRight({ content: [], page: 1, size: 10, total: 0, totalPage: 0 })
    ),
  } as unknown as ListRepresentativesUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useInjectionMock.mockImplementation((symbol) => {
      if (symbol === REPRESENTATIVE_SYMBOLS.LIST_USE_CASE) return listUseCase;
      return null;
    });
  });

  it("muestra mensaje de error si la carga falla", async () => {
    listUseCase = {
      execute: vi.fn().mockResolvedValue(
        mockLeft([{ message: "Error de red", code: "NETWORK", field: "root" }])
      ),
    } as unknown as ListRepresentativesUseCase;

    render(
      <MemoryRouter>
        <RepresentativeListContainer />
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

  it("muestra lista de representantes si la carga es exitosa", async () => {
    listUseCase = {
      execute: vi.fn().mockResolvedValue(
        mockRight({
          content: [
            { id: 1, firstName: "Juan", lastName: "Pérez" },
          ],
          page: 1,
          size: 10,
          total: 1,
          totalPage: 1,
        } as Page<any>)
      ),
    } as unknown as ListRepresentativesUseCase;

    render(
      <MemoryRouter>
        <RepresentativeListContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    });
  });

  it("muestra skeleton mientras carga", async () => {
    listUseCase = {
      execute: vi.fn(() => new Promise(() => {})),
    } as unknown as ListRepresentativesUseCase;

    render(
      <MemoryRouter>
        <RepresentativeListContainer />
      </MemoryRouter>
    );

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});
