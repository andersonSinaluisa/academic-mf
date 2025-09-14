import { ListTeacherAssignmentsCommand, ListTeacherAssignmentsUseCase } from "@/academic/application/usecases/teacher-assignment/ListTeacherAssignmentsUseCase";
import { TeacherAssignmentListPresenter } from "./TeacherAssignmentListPresenter";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export const TeacherAssignmentListContainer = () => {
  const listUseCase = useInjection<ListTeacherAssignmentsUseCase>(TEACHER_ASSIGNMENT_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListTeacherAssignmentsCommand());
    res
      .ifRight(data => setAssignments(data ?? []))
      .ifLeft(f =>
        toast({
          title: "Error",
          description: f.map(x => x.message).join(", "),
          variant: "destructive",
        })
      );
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = assignments.filter(a => a.teacherId.toString().includes(searchTerm));

  return (
    <TeacherAssignmentListPresenter
      assignments={filtered}
      loading={loading}
      error={null}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddAssignment={() => navigate("/asignaciones-docentes/nuevo")}
    />
  );
};
