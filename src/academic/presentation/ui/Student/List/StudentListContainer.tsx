import { ListStudentsCommand, ListStudentsUseCase } from "@/academic/application/usecases/student/ListStudentsUseCase";
import { StudentListPresenter } from "./StudentListPresenter";
import { useInjection } from "inversify-react";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";
import { useCallback, useEffect, useState } from "react";
import { Student } from "@/academic/domain/entities/Student";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const StudentListContainer = () => {
    const listUseCase = useInjection<ListStudentsUseCase>(STUDENT_SYMBOLS.LIST_USE_CASE);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("filter") || "";

    const [students, setStudents] = useState<Page<Student>>({
        content: [],
        page: 0,
        size: 10,
        total: 0,
        totalPage: 0
    });
    const [loading, setLoading] = useState(false);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        const res = await listUseCase.execute(new ListStudentsCommand(page, 10, undefined, filter));
        res.ifRight(data => {
            if (data) setStudents(data);
        }).ifLeft(failures => {
            const msg = failures.map(f => f.message).join(", ");
            toast({
                title: "Error",
                description: msg,
                variant: "destructive",
            });
        });
        setLoading(false);
    }, [listUseCase, page, filter]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleSearchChange = (term: string) => {
        navigate({ pathname: "/estudiantes", search: `?page=1&filter=${term}` });
    };

    return (
        <StudentListPresenter
            students={students}
            loading={loading}
            error={null}
            onAddStudent={() => navigate("/estudiantes/nuevo")}
            onSearchChange={handleSearchChange}
            searchTerm={filter}
        />
    );
};

