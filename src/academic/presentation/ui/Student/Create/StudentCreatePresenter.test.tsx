import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { useForm } from "react-hook-form";
import { CreateStudentCommand } from "@/academic/application/usecases/student/CreateStudentUseCase";
import { StudentCreatePresenter } from "./StudentCreatePresenter";

function Wrapper({
  formData,
  onCancel,
  loading,
  _handleSubmit,
}: Readonly<{
  formData: CreateStudentCommand;
  onCancel: () => void;
  loading?: boolean;
  _handleSubmit: (data: CreateStudentCommand) => void;
}>) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateStudentCommand>({
    defaultValues: { ...formData },
  });

  return (
    <MemoryRouter>
      <StudentCreatePresenter
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

describe("StudentCreatePresenter", () => {
  it("renderiza el título y botones", () => {
    render(
      <Wrapper
        formData={new CreateStudentCommand("", "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={false}
      />
    );

    expect(screen.getByText("Registrar Estudiante")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("muestra errores de validación", async () => {
    render(
      <Wrapper
        formData={new CreateStudentCommand("", "", "")}
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
        formData={new CreateStudentCommand("", "", "")}
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
        formData={new CreateStudentCommand("", "", "")}
        onCancel={vi.fn()}
        _handleSubmit={vi.fn()}
        loading={true}
      />
    );
    expect(screen.getByText("Guardando...")).toBeDisabled();
  });
});

