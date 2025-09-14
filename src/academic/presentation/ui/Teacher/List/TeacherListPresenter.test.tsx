import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TeacherListPresenter } from "./TeacherListPresenter";
import { Page } from "@/lib/utils";
import { Teacher } from "@/academic/domain/entities/Teacher";

const mockTeachers: Page<Teacher> = {
    content: [
        {
            id: 1,
            firstName: "Juan",
            lastName: "Pérez",
            identification: "123",
            phone: "555-123",
            birthDate: "1990-01-01",
            gender: "Masculino",
            address: "Calle Falsa 123",
            nationality: "Ecuador",
            image: "",
        },
    ],
    page: 1,
    size: 10,
    total: 1,
    totalPage: 1,
};

describe("TeacherListPresenter", () => {
    it("muestra skeleton cuando está cargando", () => {
        render(
            <TeacherListPresenter
                teachers={mockTeachers}
                loading={true}
                error={null}
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        expect(screen.getByRole("status")).toBeInTheDocument(); // Skeleton tiene role="status"
    });

    it("muestra mensaje de error si error existe", () => {
        render(
            <TeacherListPresenter
                teachers={mockTeachers}
                loading={false}
                error="Error al cargar"
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        expect(screen.getByText("Error al cargar")).toBeInTheDocument();
    });

    it("muestra lista de docentes", () => {
        render(
            <TeacherListPresenter
                teachers={mockTeachers}
                loading={false}
                error={null}
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
        expect(screen.getByText("555-123")).toBeInTheDocument();
    });

    it("muestra mensaje de lista vacía", () => {
        render(
            <TeacherListPresenter
                teachers={{ ...mockTeachers, content: [] }}
                loading={false}
                error={null}
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        expect(screen.getByText("No hay docentes registrados aún.")).toBeInTheDocument();
    });

    it("dispara onAddTeacher al hacer click en 'Agregar Docente'", () => {
        const onAddTeacher = vi.fn();
        render(
            <TeacherListPresenter
                teachers={mockTeachers}
                loading={false}
                error={null}
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={onAddTeacher}
                onEditTeacher={vi.fn()}

            />
        );
        fireEvent.click(screen.getByText("Agregar Docente"));
        expect(onAddTeacher).toHaveBeenCalled();
    });

    it("llama a onSearchChange cuando cambia el input", () => {
        const onSearchChange = vi.fn();
        render(
            <TeacherListPresenter
                teachers={mockTeachers}
                loading={false}
                error={null}
                searchTerm=""
                onSearchChange={onSearchChange}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        fireEvent.change(screen.getByPlaceholderText("Buscar docentes..."), {
            target: { value: "Juan" },
        });
        expect(onSearchChange).toHaveBeenCalledWith("Juan");
    });

    it('paginación - muestra controles de paginación si hay múltiples páginas', () => {
        const multiPageTeachers: Page<Teacher> = {
            ...mockTeachers,
            total: 25,
            totalPage: 3,
            page: 1,
        };
        render(
            <TeacherListPresenter
                teachers={multiPageTeachers}
                loading={false}
                error={null}
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        expect(screen.getByText("Página 1 de 3 - Total de docentes: 25")).toBeInTheDocument();
        expect(screen.getByText("Página anterior")).toBeInTheDocument();
        expect(screen.getByText("Página siguiente")).toBeInTheDocument();
    });


    it("debe mostrar el boton de editar si el docente tiene id", async() => {
        render(
            <TeacherListPresenter
                teachers={mockTeachers}
                loading={false}
                error={null}
                searchTerm=""
                onSearchChange={vi.fn()}
                onAddTeacher={vi.fn()}
                onEditTeacher={vi.fn()}

            />
        );
        const editButton = await screen.findAllByTitle("editar");
        await waitFor(() => {
            expect(editButton.length).toBe(mockTeachers.content.length);
        });
    });
});
