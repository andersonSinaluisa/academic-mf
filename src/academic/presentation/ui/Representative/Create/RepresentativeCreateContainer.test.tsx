import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { RepresentativeCreateContainer } from "./RepresentativeCreateContainer";
import { useInjectionMock, mockLeft } from "@/setupTests";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import { CreateRepresentativeUseCase } from "@/academic/application/usecases/representative/CreateRepresentativeUseCase";
import { toast } from "@/hooks/use-toast";

describe("RepresentativeCreateContainer", () => {
  let executeMock: CreateRepresentativeUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    executeMock = { execute: vi.fn() } as unknown as CreateRepresentativeUseCase;
    useInjectionMock.mockImplementation((symbol) => {
      if (symbol === REPRESENTATIVE_SYMBOLS.CREATE_USE_CASE) return executeMock;
      return null;
    });
  });

  it("crea representante y muestra toast de éxito", async () => {
    executeMock = {
      execute: vi.fn().mockResolvedValue({
        ifRight: (fn: (data: { firstName: string; lastName: string }) => void) => {
          fn({ firstName: "Juan", lastName: "Pérez" });
          return { ifLeft: () => {} };
        },
      }),
    } as unknown as CreateRepresentativeUseCase;

    render(
      <MemoryRouter>
        <RepresentativeCreateContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Representante creado",
          description: expect.stringContaining("Juan Pérez"),
        })
      );
    });
  });

  it("muestra error si falla la creación", async () => {
    executeMock = {
      execute: vi.fn().mockResolvedValue(
        mockLeft([{ message: "Error al crear representante", code: "E", field: "root" }])
      ),
    } as unknown as CreateRepresentativeUseCase;

    render(
      <MemoryRouter>
        <RepresentativeCreateContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: expect.stringContaining("Error al crear representante"),
          variant: "destructive",
        })
      );
    });
  });
});
