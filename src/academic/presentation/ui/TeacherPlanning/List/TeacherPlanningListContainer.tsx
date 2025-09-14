import { ListTeacherPlanningsCommand, ListTeacherPlanningsUseCase } from "@/academic/application/usecases/teacher-planning/ListTeacherPlanningsUseCase";
import { TeacherPlanningListPresenter } from "./TeacherPlanningListPresenter";
import { TEACHER_PLANNING_SYMBOLS } from "@/academic/domain/symbols/TeacherPlanning";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const TeacherPlanningListContainer = () => {
  const listUseCase = useInjection<ListTeacherPlanningsUseCase>(TEACHER_PLANNING_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [plannings, setPlannings] = useState<Page<TeacherPlanning>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListTeacherPlanningsCommand(page, 10, undefined, undefined, undefined, filter));
    res
      .ifRight(data => {
        if (data) setPlannings(data);
      })
      .ifLeft(f =>
        toast({
          title: "Error",
          description: f.map(x => x.message).join(", "),
          variant: "destructive",
        })
      );
    setLoading(false);
  }, [listUseCase, page, filter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/planificaciones-docentes", search: `?page=1&filter=${term}` });
  };

  const handleAddPlanning = () => {
    navigate("/planificaciones-docentes/nueva");
  };

  return (
    <TeacherPlanningListPresenter
      plannings={plannings}
      loading={loading}
      error={null}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
      onAddPlanning={handleAddPlanning}
    />
  );
};
