import { ListBehaviorReportsCommand, ListBehaviorReportsUseCase } from "@/academic/application/usecases/behavior-report/ListBehaviorReportsUseCase";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { BehaviorReportListPresenter } from "./BehaviorReportListPresenter";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const BehaviorReportListContainer = () => {
  const listUseCase = useInjection<ListBehaviorReportsUseCase>(BEHAVIOR_REPORT_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [reports, setReports] = useState<Page<BehaviorReport>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListBehaviorReportsCommand(page, 10, filter));
    res
      .ifRight(data => {
        if (data) setReports(data);
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

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/reportes-conducta", search: `?page=1&filter=${term}` });
  };

  const handleAddReport = () => {
    navigate("/reportes-conducta/nuevo");
  };

  return (
    <BehaviorReportListPresenter
      reports={reports}
      loading={loading}
      error={null}
      onAddReport={handleAddReport}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
    />
  );
};
