"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { ReportCard } from "@/academic/domain/entities/ReportCard";
import { GetReportCardUseCase, GetReportCardCommand } from "@/academic/application/usecases/report-card/GetReportCardUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { ReportCardViewPresenter } from "./ReportCardViewPresenter";

export function ReportCardViewContainer() {
  const useCase = useInjection(GetReportCardUseCase);
  const [report, setReport] = useState<ReportCard | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (studentId: number, academicYearId: string) => {
    setLoading(true);
    setError(null);
    const result = await useCase.execute(new GetReportCardCommand(studentId, academicYearId));
    result.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (r: ReportCard | undefined) => setReport(r),
    });
    setLoading(false);
  };

  return (
    <ReportCardViewPresenter
      report={report}
      loading={loading}
      error={error}
      onSearch={onSearch}
    />
  );
}

