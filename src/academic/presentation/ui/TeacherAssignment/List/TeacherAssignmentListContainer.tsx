import { ListTeacherAssignmentsCommand, ListTeacherAssignmentsUseCase } from "@/academic/application/usecases/teacher-assignment/ListTeacherAssignmentsUseCase";
import { TeacherAssignmentListPresenter } from "./TeacherAssignmentListPresenter";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";
import { Page } from "@/lib/utils";

export const TeacherAssignmentListContainer = () => {
  const listUseCase = useInjection<ListTeacherAssignmentsUseCase>(TEACHER_ASSIGNMENT_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [assignments, setAssignments] = useState<Page<TeacherAssignment>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListTeacherAssignmentsCommand(page, 10));
    res
      .ifRight(data => {
        if (data) setAssignments(data);
      })
      .ifLeft(f =>
        toast({
          title: "Error",
          description: f.map(x => x.message).join(", "),
          variant: "destructive",
        })
      );
    setLoading(false);
  }, [listUseCase, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/asignaciones-docentes", search: `?page=1&filter=${term}` });
  };

  const filtered = assignments.content.filter(a => a.teacherId.toString().includes(filter));
  const data = { ...assignments, content: filtered };

  return (
    <TeacherAssignmentListPresenter
      assignments={data}
      loading={loading}
      error={null}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
      onAddAssignment={() => navigate("/asignaciones-docentes/nuevo")}
    />
  );
};
