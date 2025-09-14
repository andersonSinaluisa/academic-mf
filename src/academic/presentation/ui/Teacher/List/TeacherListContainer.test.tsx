import { toast } from "@/hooks/use-toast";
import {   mockLeft, mockRight, useInjectionMock } from "@/setupTests";
import { TeacherListContainer } from "./TeacherListContainer";
import { vi } from "vitest";
import { fireEvent, getByTitle, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher";
import { ListTeachersUseCase } from "@/academic/application/usecases/teacher/ListTeachersUseCase";
const navigationMock = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router");
    return {
        ...actual,
        useNavigate: () => navigationMock,
    };
});
describe("TeacherListContainer", () => {
    let listUseCase: ListTeachersUseCase = {
        execute: vi.fn().mockResolvedValue(
            mockRight({
                content: [],
                page: 1,
                size: 10,
                total: 0,
                totalPages: 0,
            })
        ),
    } as unknown as ListTeachersUseCase;
    beforeEach(() => {
        vi.clearAllMocks();
        useInjectionMock.mockImplementation((symbol) => {
            if (symbol === TEACHER_SYMBOLS.LIST_USE_CASE) return listUseCase;
            return null;
        });
    });


    it("muestra error si falla la carga de profesores", async () => {
        
        listUseCase = {
            execute: vi.fn().mockResolvedValue(
                mockLeft([
                    {
                        message: "Error de red",
                        code: "NETWORK_ERROR",
                        field: "root",
                    },
                ])
            ),
        } as unknown as ListTeachersUseCase;
      

        render(
            <MemoryRouter>
                <TeacherListContainer />
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


    it("muestra la lista de profesores si la carga es exitosa", async () => {
        listUseCase = {
            execute: vi.fn().mockResolvedValue(
                mockRight({
                    content: [
                        {
                            id: "1",
                            firstName: "Juan",
                            lastName: "Perez",
                            identification: "123456",
                            phone: "555-1234",
                            birthDate: "1990-01-01",
                            address: "Calle Falsa 123",
                            email: "juan.perez@example.com",
                        },
                    ],
                    page: 1,
                    size: 10,
                    total: 1,
                    totalPages: 1,
                })
            ),
        } as unknown as ListTeachersUseCase;
        
        
        const { getByText } = render(
            <MemoryRouter>
                <TeacherListContainer />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(getByText("Juan Perez")).toBeInTheDocument();
        });
    });

    it("muestra mensaje si no hay profesores", async () => {
        listUseCase = {
            execute: vi.fn().mockResolvedValue(
                mockRight({
                    content: [],
                    page: 1,
                    size: 10,
                    total: 0,
                    totalPages: 0,
                })
            ),
        } as unknown as ListTeachersUseCase;
        const { getByText } = render(
            <MemoryRouter>
                <TeacherListContainer />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(getByText("No hay docentes registrados aún.")).toBeInTheDocument();
        });

    });
    it("muestra skeleton mientras carga", async () => {
        listUseCase = {
            execute: vi.fn(() => new Promise(() => {})),
        } as unknown as ListTeachersUseCase;

        const { findByRole } = render(
            <MemoryRouter>
                <TeacherListContainer />
            </MemoryRouter>
        );

        expect(await findByRole("status")).toBeInTheDocument(); // Skeleton tiene role="status"
    });

    it("llama a la función de búsqueda al cambiar el término de búsqueda", async () => {
        
        
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <TeacherListContainer />
            </MemoryRouter>
        );
            
        const searchInput = getByPlaceholderText("Buscar docentes...");
        fireEvent.change(searchInput, { target: { value: "Juan" } });
        await waitFor(() => {
            expect(navigationMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    pathname: "/docentes",
                    search: "?page=1&filter=Juan",
                })
            );
        });
    });
            
    it("navega a la página de creación al hacer clic en 'Agregar Docente'", async () => {
        const { getByText } = render(
            <MemoryRouter>
                <TeacherListContainer />
            </MemoryRouter>
        );
        const addButton = getByText("Agregar Docente");
        fireEvent.click(addButton);
        await waitFor(() => {
            expect(navigationMock).toHaveBeenCalledWith("/docentes/nuevo");
        });
    });
        
    it("navega a la página de edición al hacer clic en 'Editar'", async () => {
        listUseCase = {
            execute: vi.fn().mockResolvedValue(
            mockRight({
                content: [
                    {
                        id: "1",
                        firstName: "Juan",
                        lastName: "Perez",
                        identification: "123456",
                        phone: "555-1234",
                        birthDate: "1990-01-01",
                        address: "Calle Falsa 123",
                        email: "juan.perez@example.com",
                    },
                ],
                page: 1,
                size: 10,
                total: 1,
                totalPages: 1,
            })
        )} as unknown as ListTeachersUseCase;
        const { getByText } = render(
            <MemoryRouter>
                <TeacherListContainer />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(getByText("Juan Perez")).toBeInTheDocument();
        });
        const editButton = getByTitle(document.body, "editar");
        fireEvent.click(editButton);
        await waitFor(() => {
            expect(navigationMock).toHaveBeenCalledWith("/docentes/1");
        });
    });
})