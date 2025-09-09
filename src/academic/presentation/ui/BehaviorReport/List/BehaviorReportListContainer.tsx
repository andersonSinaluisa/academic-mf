import { ListBehaviorReportsCommand, ListBehaviorReportsUseCase } from "@/academic/application/usecases/behavior-report/ListBehaviorReportsUseCase";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { BehaviorReportListPresenter } from "./BehaviorReportListPresenter";

export const BehaviorReportListContainer = () => {
  const listUseCase = useInjection<ListBehaviorReportsUseCase>(BEHAVIOR_REPORT_SYMBOLS.LIST_USE_CASE);

  const [reports, setReports] = useState<BehaviorReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListBehaviorReportsCommand());
    res.ifRight(data => {
      setReports(data ?? []);
    }).ifLeft(failures => {
      setError(failures.map(f => f.message).join(", "));
    });
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredReports = reports.filter(r =>
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BehaviorReportListPresenter
      reports={filteredReports}
      loading={loading}
      error={error}
      onAddReport={() => { }}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
    />
  );
};
