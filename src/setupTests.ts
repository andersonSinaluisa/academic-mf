import "@testing-library/jest-dom";
import { vi } from "vitest";

// mock global de inversify-react
export const useInjectionMock = vi.fn();

vi.mock("inversify-react", () => ({
    useInjection: useInjectionMock,
}));


// mock de toast
vi.mock("@/hooks/use-toast", () => ({
    toast: vi.fn(),
}));
// Simula un Right(value)
export const mockRight = <T>(value: T) => ({
    ifRight: (fn: (v: T) => void) => {
        fn(value);
        return { ifLeft: () => { } };
    },
});

// Simula un Left(errors)
export const mockLeft = <E>(errors: E[]) => ({
    ifRight: () => ({
        ifLeft: (fn: (e: E[]) => void) => fn(errors),
    }),
});
