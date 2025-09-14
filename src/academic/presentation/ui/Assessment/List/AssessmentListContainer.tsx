import { ListAssessmentsCommand, ListAssessmentsUseCase } from "@/academic/application/usecases/assessment/ListAssessmentsUseCase";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";
import { AssessmentListPresenter } from "./AssessmentListPresenter";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { Assessment } from "@/academic/domain/entities/Assessment";

export const AssessmentListContainer = () => {
  const listUseCase = useInjection<ListAssessmentsUseCase>(ASSESSMENT_SYMBOLS.LIST_USE_CASE);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListAssessmentsCommand());
    res.ifRight(data => setAssessments(data ?? [])).ifLeft(failures => setError(failures.map(f => f.message).join(", ")));
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = assessments.filter(a => a.studentId.toString().includes(searchTerm));

  return (
    <AssessmentListPresenter
      assessments={filtered}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddAssessment={() => {}}
    />
  );
};
