import { ListStudentsCommand, ListStudentsUseCase } from "@/academic/application/usecases/student/ListStudentsUseCase";
import { StudentListPresenter } from "./StudentListPresenter";
import { useInjection } from "inversify-react";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";
import { useCallback, useEffect, useState } from "react";
import { Student } from "@/academic/domain/entities/Student";

export const StudentListContainer = () => {
    const listUseCase = useInjection<ListStudentsUseCase>(STUDENT_SYMBOLS.LIST_USE_CASE);

    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError(null);
        const res = await listUseCase.execute(new ListStudentsCommand(1, 10));
        res.ifRight(data => {
            setStudents(data ?? []);
        }).ifLeft(failures => {
            setError(failures.map(f => f.message).join(", "));
        });
        setLoading(false);
    }, [listUseCase]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const filteredStudents = students.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <StudentListPresenter
            students={filteredStudents}
            loading={loading}
            error={error}
            onAddStudent={() => { }}
            onSearchChange={handleSearchChange}
            searchTerm={searchTerm}
        />
    );
};

