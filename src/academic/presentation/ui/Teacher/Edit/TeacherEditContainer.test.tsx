import { render, screen, waitFor } from "@testing-library/react"
import { Mock, vi } from "vitest"
import { MemoryRouter, useParams } from "react-router"
import { TeacherEditContainer } from "./TeacherEditContainer"
import { UpdateTeacherUseCase } from "@/academic/application/usecases/teacher/UpdateTeacherUseCase"
import { GetTeacherUseCase } from "@/academic/application/usecases/teacher/GetTeacherUseCase"
import {  mockLeft, mockRight, useInjectionMock } from "@/setupTests"
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher"
import userEvent from "@testing-library/user-event"
import { AbstractFailure } from "@/academic/domain/entities/failure"
import { toast } from "@/hooks/use-toast"


vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router")
    return {
        ...actual,
        useParams: vi.fn(),
    }
})

export function provideTeacherMocks({ get, update }: { get: GetTeacherUseCase; update: UpdateTeacherUseCase }) {
    useInjectionMock.mockImplementation((symbol) => {
        if (symbol === TEACHER_SYMBOLS.GET_USE_CASE) return get
        if (symbol === TEACHER_SYMBOLS.UPDATE_USE_CASE) return update
        return null
    })
}


describe("TeacherEditContainer", () => {

    const getUseCase = {
        execute: vi.fn().mockResolvedValue(
            mockRight({
                id: 1,
                firstName: "Juan",
                lastName: "Pérez",
                phone: "123456",
                identification: "12345678",
                address: "Calle Falsa 123",
                birthDate: "1990-01-01",
            })
        ),
    } as unknown as GetTeacherUseCase

    const updateUseCase = {
        execute: vi.fn().mockResolvedValue(
            mockRight({
                id: 1,
                firstName: "Juan",
                lastName: "Pérez",
                phone: "123456",
                identification: "12345678",
                address: "Calle Falsa 123",
                birthDate: "1990-01-01",
            })
        ),
    } as unknown as UpdateTeacherUseCase
    beforeAll(() => {
        vi.clearAllMocks()
        provideTeacherMocks({ get: getUseCase, update: updateUseCase });
        (useParams as Mock).mockReturnValue({ id: "1" })
    })

    it("carga datos del profesor al montar", async () => {
        render(
            <MemoryRouter>
                <TeacherEditContainer />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(getUseCase.execute).toHaveBeenCalledWith(expect.anything())
        })

        // valida que los datos se pintan en los inputs
        const firstNameInput = await screen.findByDisplayValue("Juan")
        expect(firstNameInput).toBeInTheDocument()
        const lastNameInput = screen.getByDisplayValue("Pérez")
        expect(lastNameInput).toBeInTheDocument()
        const phoneInput = screen.getByDisplayValue("123456")
        expect(phoneInput).toBeInTheDocument()
        
    })

    it("ejecuta updateUseCase al enviar el formulario", async () => {
        render(
            <MemoryRouter>
                <TeacherEditContainer />
            </MemoryRouter>
        )

        const firstNameInput = await screen.findByRole("textbox", { name: /Nombre/i })
        const lastNameInput = await screen.findByRole("textbox", { name: /Apellido/i })

        await userEvent.clear(firstNameInput)
        await userEvent.type(firstNameInput, "Pedro")

        await userEvent.clear(lastNameInput)
        await userEvent.type(lastNameInput, "Gómez")

        expect(firstNameInput).toHaveValue("Pedro")
        expect(lastNameInput).toHaveValue("Gómez")

        await userEvent.click(screen.getByRole("button", { name: /Guardar/i }))

        await waitFor(() => {
            expect(updateUseCase.execute).toHaveBeenCalledWith(
                expect.objectContaining({
                    firstName: "Pedro",
                    lastName: "Gómez",
                })
            )
            expect(toast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Éxito",
                description: expect.stringContaining("Profesor actualizado correctamente")
            }))
            expect(toast).toHaveBeenCalledTimes(1);
            expect(getUseCase.execute).toHaveBeenCalledTimes(2); // una vez al montar y otra al enviar
            expect(updateUseCase.execute).toHaveBeenCalledTimes(1);
        })
    })

    it("muestra toast de error si getUseCase falla", async () => {
        getUseCase.execute = vi.fn().mockResolvedValue(
            mockLeft([
                new AbstractFailure("error", "Error al obtener profesor", "root")
            ])
        )
        provideTeacherMocks({ get: getUseCase, update: updateUseCase });

        render(
            <MemoryRouter>
                <TeacherEditContainer />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(getUseCase.execute).toHaveBeenCalled()
            expect(toast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Error",
                description: expect.stringContaining("Error al obtener el profesor")
            }))
            
        })
    })
})
