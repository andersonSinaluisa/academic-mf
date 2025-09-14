import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { useForm } from "react-hook-form";
import { UpdateRepresentativeCommand } from "@/academic/application/usecases/representative/UpdateRepresentativeUseCase";
import { RepresentativeEditPresenter } from "./RepresentativeEditPresenter";

function Wrapper({
  formData,
  onCancel,
  loading,
  _handleSubmit,
}: Readonly<{
  formData: UpdateRepresentativeCommand;
  onCancel: () => void;
  loading?: boolean;
  _handleSubmit: (data: UpdateRepresentativeCommand) => void;
}>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateRepresentativeCommand>({
    defaultValues: { ...formData },
  });

  return (
    <MemoryRouter>
      <RepresentativeEditPresenter
        onCancel={onCancel}
        loading={loading}
        handleSubmit={handleSubmit(_handleSubmit)}
        register={register}
        errors={errors}
        formData={formData}
      />
    </MemoryRouter>
  );
}

describe("RepresentativeEditPresenter", () => {
  it("renderiza el título y botones", async () => {
    render(
      <Wrapper
        formData={new UpdateRepresentativeCommand(1, "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={false}
      />
    );
    const titles = await screen.findAllByText(/Editar Representante/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText("Guardar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("muestra errores de validación", async () => {
    render(
      <Wrapper
        formData={new UpdateRepresentativeCommand(1, "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={false}
      />
    );
    fireEvent.click(screen.getByText("Guardar"));
    expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("El apellido es obligatorio")).toBeInTheDocument();
  });

  it("llama a onCancel al hacer clic en Cancelar", () => {
    const onCancel = vi.fn();
    render(
      <Wrapper
        formData={new UpdateRepresentativeCommand(1, "", "")}
        onCancel={onCancel}
        _handleSubmit={vi.fn()}
        loading={false}
      />
    );
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("deshabilita el botón Guardar cuando loading es true", () => {
    render(
      <Wrapper
        formData={new UpdateRepresentativeCommand(1, "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={true}
      />
    );
    expect(screen.getByText("Guardando...")).toBeDisabled();
  });
});
