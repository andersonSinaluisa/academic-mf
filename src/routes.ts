import {
    createBrowserRouter,
} from "react-router";
import { TeacherListContainer } from "./academic/presentation/ui/Teacher/List/TeacherListContainer";
import { TeacherCreateContainer } from "./academic/presentation/ui/Teacher/Create/TeacherCreateContainer";
import { TeacherEditContainer } from "./academic/presentation/ui/Teacher/Edit/TeacherEditContainer";

export const router = createBrowserRouter([
    {
        path: "/docentes",
        Component: TeacherListContainer
    },
    {
        path: "/docentes/:id",
        Component: TeacherEditContainer
    },
    {
        path: "/docentes/nuevo",
        Component: TeacherCreateContainer
    },

]);

