import { ListAssessmentsCommand, ListAssessmentsUseCase } from "@/academic/application/usecases/assessment/ListAssessmentsUseCase";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";
import { AssessmentListPresenter } from "./AssessmentListPresenter";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const AssessmentListContainer = () => {
  const listUseCase = useInjection<ListAssessmentsUseCase>(ASSESSMENT_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [assessments, setAssessments] = useState<Page<Assessment>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListAssessmentsCommand(page, 10, filter));
    res
      .ifRight(data => {
        if (data) setAssessments(data);
      })
      .ifLeft(failures =>
        toast({
          title: "Error",
          description: failures.map(f => f.message).join(", "),
          variant: "destructive",
        })
      );
    setLoading(false);
  }, [listUseCase, page, filter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/evaluaciones", search: `?page=1&filter=${term}` });
  };

  const handleAddAssessment = () => {
    navigate("/evaluaciones/nueva");
  };

  return (
    <AssessmentListPresenter
      assessments={assessments}
      loading={loading}
      error={null}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
      onAddAssessment={handleAddAssessment}
    />
  );
};
