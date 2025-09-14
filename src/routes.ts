import {
    createBrowserRouter,
} from "react-router";
import { TeacherListContainer } from "./academic/presentation/ui/Teacher/List/TeacherListContainer";
import { TeacherCreateContainer } from "./academic/presentation/ui/Teacher/Create/TeacherCreateContainer";
import { TeacherEditContainer } from "./academic/presentation/ui/Teacher/Edit/TeacherEditContainer";
import { StudentListContainer } from "./academic/presentation/ui/Student/List/StudentListContainer";
import { StudentCreateContainer } from "./academic/presentation/ui/Student/Create/StudentCreateContainer";
import { StudentEditContainer } from "./academic/presentation/ui/Student/Edit/StudentEditContainer";
import { RepresentativeListContainer } from "./academic/presentation/ui/Representative/List/RepresentativeListContainer";
import { RepresentativeCreateContainer } from "./academic/presentation/ui/Representative/Create/RepresentativeCreateContainer";
import { RepresentativeEditContainer } from "./academic/presentation/ui/Representative/Edit/RepresentativeEditContainer";
import { AttendanceListContainer } from "./academic/presentation/ui/Attendance/List/AttendanceListContainer";
import { AttendanceCreateContainer } from "./academic/presentation/ui/Attendance/Create/AttendanceCreateContainer";
import { AttendanceEditContainer } from "./academic/presentation/ui/Attendance/Edit/AttendanceEditContainer";
import { EnrollmentListContainer } from "./academic/presentation/ui/Enrollment/List/EnrollmentListContainer";
import { EnrollmentCreateContainer } from "./academic/presentation/ui/Enrollment/Create/EnrollmentCreateContainer";
import { EnrollmentEditContainer } from "./academic/presentation/ui/Enrollment/Edit/EnrollmentEditContainer";
import { BehaviorReportListContainer } from "./academic/presentation/ui/BehaviorReport/List/BehaviorReportListContainer";
import { BehaviorReportCreateContainer } from "./academic/presentation/ui/BehaviorReport/Create/BehaviorReportCreateContainer";
import { BehaviorReportEditContainer } from "./academic/presentation/ui/BehaviorReport/Edit/BehaviorReportEditContainer";
import { AssessmentListContainer } from "./academic/presentation/ui/Assessment/List/AssessmentListContainer";
import { AssessmentCreateContainer } from "./academic/presentation/ui/Assessment/Create/AssessmentCreateContainer";
import { AssessmentEditContainer } from "./academic/presentation/ui/Assessment/Edit/AssessmentEditContainer";
import { MeetingListContainer } from "./academic/presentation/ui/Meeting/List/MeetingListContainer";
import { MeetingCreateContainer } from "./academic/presentation/ui/Meeting/Create/MeetingCreateContainer";
import { MeetingEditContainer } from "./academic/presentation/ui/Meeting/Edit/MeetingEditContainer";
import { PromotionActListContainer } from "./academic/presentation/ui/PromotionAct/List/PromotionActListContainer";
import { PromotionActCreateContainer } from "./academic/presentation/ui/PromotionAct/Create/PromotionActCreateContainer";
import { TeacherAssignmentListContainer } from "./academic/presentation/ui/TeacherAssignment/List/TeacherAssignmentListContainer";
import { TeacherAssignmentCreateContainer } from "./academic/presentation/ui/TeacherAssignment/Create/TeacherAssignmentCreateContainer";
import { TeacherPlanningListContainer } from "./academic/presentation/ui/TeacherPlanning/List/TeacherPlanningListContainer";
import { TeacherPlanningCreateContainer } from "./academic/presentation/ui/TeacherPlanning/Create/TeacherPlanningCreateContainer";
import { AcademicHistoryViewContainer } from "./academic/presentation/ui/AcademicHistory/View/AcademicHistoryViewContainer";
import { OfficialRecordViewContainer } from "./academic/presentation/ui/OfficialRecord/View/OfficialRecordViewContainer";
import { ReportCardViewContainer } from "./academic/presentation/ui/ReportCard/View/ReportCardViewContainer";
import { PromotionPromoteContainer } from "./academic/presentation/ui/Promotion/Promote/PromotionPromoteContainer";
import { AttendanceStatisticsContainer } from "./academic/presentation/ui/Statistics/Attendance/AttendanceStatisticsContainer";
import { PerformanceStatisticsContainer } from "./academic/presentation/ui/Statistics/Performance/PerformanceStatisticsContainer";
import { FinalGradeContainer } from "./academic/presentation/ui/Grading/FinalGradeContainer";
import { ExportReportCardContainer } from "./academic/presentation/ui/Exports/ReportCard/ExportReportCardContainer";
import { ExportStatisticsContainer } from "./academic/presentation/ui/Exports/Statistics/ExportStatisticsContainer";

export const router = createBrowserRouter([
    {
        path: "/docentes",
        Component: TeacherListContainer,
    },
    {
        path: "/docentes/:id",
        Component: TeacherEditContainer,
    },
    {
        path: "/docentes/nuevo",
        Component: TeacherCreateContainer,
    },
    {
        path: "/estudiantes",
        Component: StudentListContainer,
    },
    {
        path: "/estudiantes/:id",
        Component: StudentEditContainer,
    },
    {
        path: "/estudiantes/nuevo",
        Component: StudentCreateContainer,
    },
    {
        path: "/representantes",
        Component: RepresentativeListContainer,
    },
    {
        path: "/representantes/:id",
        Component: RepresentativeEditContainer,
    },
    {
        path: "/representantes/nuevo",
        Component: RepresentativeCreateContainer,
    },
    {
        path: "/asistencias",
        Component: AttendanceListContainer,
    },
    {
        path: "/asistencias/:id",
        Component: AttendanceEditContainer,
    },
    {
        path: "/asistencias/nuevo",
        Component: AttendanceCreateContainer,
    },
    {
        path: "/matriculas",
        Component: EnrollmentListContainer,
    },
    {
        path: "/matriculas/:id",
        Component: EnrollmentEditContainer,
    },
    {
        path: "/matriculas/nuevo",
        Component: EnrollmentCreateContainer,
    },
    {
        path: "/reportes-conducta",
        Component: BehaviorReportListContainer,
    },
    {
        path: "/reportes-conducta/:id",
        Component: BehaviorReportEditContainer,
    },
    {
        path: "/reportes-conducta/nuevo",
        Component: BehaviorReportCreateContainer,
    },
    {
        path: "/evaluaciones",
        Component: AssessmentListContainer,
    },
    {
        path: "/evaluaciones/:id",
        Component: AssessmentEditContainer,
    },
    {
        path: "/evaluaciones/nuevo",
        Component: AssessmentCreateContainer,
    },
    {
        path: "/reuniones",
        Component: MeetingListContainer,
    },
    {
        path: "/reuniones/:id",
        Component: MeetingEditContainer,
    },
    {
        path: "/reuniones/nuevo",
        Component: MeetingCreateContainer,
    },
    {
        path: "/actas-promocion",
        Component: PromotionActListContainer,
    },
    {
        path: "/actas-promocion/nuevo",
        Component: PromotionActCreateContainer,
    },
    {
        path: "/asignaciones-docentes",
        Component: TeacherAssignmentListContainer,
    },
    {
        path: "/asignaciones-docentes/nuevo",
        Component: TeacherAssignmentCreateContainer,
    },
    {
        path: "/planificaciones-docentes",
        Component: TeacherPlanningListContainer,
    },
    {
        path: "/planificaciones-docentes/nuevo",
        Component: TeacherPlanningCreateContainer,
    },
    {
        path: "/historial-academico",
        Component: AcademicHistoryViewContainer,
    },
    {
        path: "/registro-oficial",
        Component: OfficialRecordViewContainer,
    },
    {
        path: "/boletas",
        Component: ReportCardViewContainer,
    },
    {
        path: "/promociones",
        Component: PromotionPromoteContainer,
    },
    {
        path: "/estadisticas/asistencia",
        Component: AttendanceStatisticsContainer,
    },
    {
        path: "/estadisticas/rendimiento",
        Component: PerformanceStatisticsContainer,
    },
    {
        path: "/calificaciones/final",
        Component: FinalGradeContainer,
    },
    {
        path: "/exportaciones/boleta",
        Component: ExportReportCardContainer,
    },
    {
        path: "/exportaciones/estadisticas",
        Component: ExportStatisticsContainer,
    },
]);
