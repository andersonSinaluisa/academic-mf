import { ListTeacherPlanningsCommand, ListTeacherPlanningsUseCase } from "@/academic/application/usecases/teacher-planning/ListTeacherPlanningsUseCase";
import { TeacherPlanningListPresenter } from "./TeacherPlanningListPresenter";
import { TEACHER_PLANNING_SYMBOLS } from "@/academic/domain/symbols/TeacherPlanning";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";

export const TeacherPlanningListContainer = () => {
  const listUseCase = useInjection<ListTeacherPlanningsUseCase>(TEACHER_PLANNING_SYMBOLS.LIST_USE_CASE);
  const [plannings, setPlannings] = useState<TeacherPlanning[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListTeacherPlanningsCommand());
    res.ifRight(data => setPlannings(data ?? [])).ifLeft(f => setError(f.map(x => x.message).join(", ")));
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = plannings.filter(p => p.topic.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <TeacherPlanningListPresenter
      plannings={filtered}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddPlanning={() => {}}
    />
  );
};
