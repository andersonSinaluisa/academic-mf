import { ListTeacherAssignmentsCommand, ListTeacherAssignmentsUseCase } from "@/academic/application/usecases/teacher-assignment/ListTeacherAssignmentsUseCase";
import { TeacherAssignmentListPresenter } from "./TeacherAssignmentListPresenter";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";

export const TeacherAssignmentListContainer = () => {
  const listUseCase = useInjection<ListTeacherAssignmentsUseCase>(TEACHER_ASSIGNMENT_SYMBOLS.LIST_USE_CASE);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListTeacherAssignmentsCommand());
    res.ifRight(data => setAssignments(data ?? [])).ifLeft(f => setError(f.map(x => x.message).join(", ")));
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = assignments.filter(a => a.teacherId.toString().includes(searchTerm));

  return (
    <TeacherAssignmentListPresenter
      assignments={filtered}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddAssignment={() => {}}
    />
  );
};
