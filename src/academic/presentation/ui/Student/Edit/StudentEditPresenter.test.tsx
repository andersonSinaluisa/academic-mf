import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { useForm } from "react-hook-form";
import { UpdateStudentCommand } from "@/academic/application/usecases/student/UpdateStudentUseCase";
import { StudentEditPresenter } from "./StudentEditPresenter";

function Wrapper({
  formData,
  onCancel,
  loading,
  _handleSubmit,
}: Readonly<{
  formData: UpdateStudentCommand;
  onCancel: () => void;
  loading?: boolean;
  _handleSubmit: (data: UpdateStudentCommand) => void;
}>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateStudentCommand>({
    defaultValues: { ...formData },
  });

  return (
    <MemoryRouter>
      <StudentEditPresenter
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

describe("StudentEditPresenter", () => {
  it("renderiza el título y botones", async () => {
    render(
      <Wrapper
        formData={new UpdateStudentCommand(1, "", "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={false}
      />
    );
    const titles = await screen.findAllByText(/Editar Estudiante/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText("Guardar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("muestra errores de validación", async () => {
    render(
      <Wrapper
        formData={new UpdateStudentCommand(1, "", "", "")}
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
        formData={new UpdateStudentCommand(1, "", "", "")}
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
        formData={new UpdateStudentCommand(1, "", "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={true}
      />
    );
    expect(screen.getByText("Guardando...")).toBeDisabled();
  });
});

