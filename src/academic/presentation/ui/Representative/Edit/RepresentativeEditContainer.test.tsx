import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { MemoryRouter } from "react-router";
import { RepresentativeEditContainer } from "./RepresentativeEditContainer";
import { UpdateRepresentativeUseCase } from "@/academic/application/usecases/representative/UpdateRepresentativeUseCase";
import { GetRepresentativeUseCase } from "@/academic/application/usecases/representative/GetRepresentativeUseCase";
import { useInjectionMock, mockLeft, mockRight } from "@/setupTests";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import userEvent from "@testing-library/user-event";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router";
import { AbstractFailure } from "@/academic/domain/entities/failure";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

function provideMocks({ get, update }: { get: GetRepresentativeUseCase; update: UpdateRepresentativeUseCase }) {
  useInjectionMock.mockImplementation((symbol) => {
    if (symbol === REPRESENTATIVE_SYMBOLS.GET_USE_CASE) return get;
    if (symbol === REPRESENTATIVE_SYMBOLS.UPDATE_USE_CASE) return update;
    return null;
  });
}

describe("RepresentativeEditContainer", () => {
  const getUseCase = {
    execute: vi.fn().mockResolvedValue(
      mockRight({ id: 1, firstName: "Juan", lastName: "Pérez" })
    ),
  } as unknown as GetRepresentativeUseCase;

  const updateUseCase = {
    execute: vi.fn().mockResolvedValue(
      mockRight({ id: 1, firstName: "Juan", lastName: "Pérez" })
    ),
  } as unknown as UpdateRepresentativeUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    provideMocks({ get: getUseCase, update: updateUseCase });
    (useParams as Mock).mockReturnValue({ id: "1" });
  });

  it("carga datos del representante al montar", async () => {
    render(
      <MemoryRouter>
        <RepresentativeEditContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getUseCase.execute).toHaveBeenCalled();
    });

    expect(await screen.findByDisplayValue("Juan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pérez")).toBeInTheDocument();
  });

  it("ejecuta updateUseCase al enviar el formulario", async () => {
    render(
      <MemoryRouter>
        <RepresentativeEditContainer />
      </MemoryRouter>
    );

    const firstNameInput = await screen.findByLabelText(/Nombre/i);
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Pedro");

    const lastNameInput = screen.getByLabelText(/Apellido/i);
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "Gómez");

    await userEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(updateUseCase.execute).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Representante actualizado",
        })
      );
    });
  });

  it("muestra toast de error si getUseCase falla", async () => {
    getUseCase.execute = vi.fn().mockResolvedValue(
      mockLeft([new AbstractFailure("error", "Error al obtener representante", "root")])
    );
    provideMocks({ get: getUseCase, update: updateUseCase });

    render(
      <MemoryRouter>
        <RepresentativeEditContainer />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: expect.stringContaining("Error al obtener el representante"),
        })
      );
    });
  });
});
