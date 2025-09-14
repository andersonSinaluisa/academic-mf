import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { useForm } from "react-hook-form";
import { CreateTeacherAssignmentCommand } from "@/academic/application/usecases/teacher-assignment/CreateTeacherAssignmentUseCase";
import { TeacherAssignmentCreatePresenter } from "./TeacherAssignmentCreatePresenter";

function Wrapper({ onCancel, loading, _handleSubmit }: { onCancel: () => void; loading?: boolean; _handleSubmit: (data: CreateTeacherAssignmentCommand) => void; }) {
  const { register, formState: { errors }, handleSubmit } = useForm<CreateTeacherAssignmentCommand>({ defaultValues: { teacherId: undefined, courseId: undefined, subjectId: undefined, schoolYearId: "" } });
  return (
    <MemoryRouter>
      <TeacherAssignmentCreatePresenter
        onCancel={onCancel}
        loading={loading}
        handleSubmit={handleSubmit(_handleSubmit)}
        register={register}
        errors={errors}
      />
    </MemoryRouter>
  );
}

describe("TeacherAssignmentCreatePresenter", () => {
  it("renderiza el título y botones", () => {
    render(<Wrapper onCancel={vi.fn()} loading={false} _handleSubmit={vi.fn()} />);
    expect(screen.getByText("Registrar Asignación")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("muestra errores de validación", async () => {
    render(<Wrapper onCancel={vi.fn()} loading={false} _handleSubmit={vi.fn()} />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(await screen.findAllByText("Obligatorio")).toHaveLength(4);
  });

  it("llama a onCancel al hacer clic en Cancelar", () => {
    const onCancel = vi.fn();
    render(<Wrapper onCancel={onCancel} loading={false} _handleSubmit={vi.fn()} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("deshabilita el botón Guardar cuando loading es true", () => {
    render(<Wrapper onCancel={vi.fn()} loading={true} _handleSubmit={vi.fn()} />);
    expect(screen.getByText("Guardando...")).toBeDisabled();
  });
});
