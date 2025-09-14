"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { PerformanceStatistics } from "@/academic/domain/entities/Statistics";
import { GetPerformanceStatisticsUseCase, GetPerformanceStatisticsCommand } from "@/academic/application/usecases/statistics/GetPerformanceStatisticsUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { PerformanceStatisticsPresenter } from "./PerformanceStatisticsPresenter";

export function PerformanceStatisticsContainer() {
  const useCase = useInjection(GetPerformanceStatisticsUseCase);
  const [stats, setStats] = useState<PerformanceStatistics | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (courseId: string, subjectId: string, academicYearId: string) => {
    setLoading(true);
    setError(null);
    const res = await useCase.execute(new GetPerformanceStatisticsCommand(courseId, subjectId, academicYearId));
    res.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (s: PerformanceStatistics | undefined) => setStats(s),
    });
    setLoading(false);
  };

  return (
    <PerformanceStatisticsPresenter
      stats={stats}
      loading={loading}
      error={error}
      onSearch={onSearch}
    />
  );
}

