"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { AttendanceStatistics } from "@/academic/domain/entities/Statistics";
import { GetAttendanceStatisticsUseCase, GetAttendanceStatisticsCommand } from "@/academic/application/usecases/statistics/GetAttendanceStatisticsUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { AttendanceStatisticsPresenter } from "./AttendanceStatisticsPresenter";

export function AttendanceStatisticsContainer() {
  const useCase = useInjection(GetAttendanceStatisticsUseCase);
  const [stats, setStats] = useState<AttendanceStatistics | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (courseId: string, academicYearId: string) => {
    setLoading(true);
    setError(null);
    const res = await useCase.execute(new GetAttendanceStatisticsCommand(courseId, academicYearId));
    res.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (s: AttendanceStatistics | undefined) => setStats(s),
    });
    setLoading(false);
  };

  return (
    <AttendanceStatisticsPresenter
      stats={stats}
      loading={loading}
      error={error}
      onSearch={onSearch}
    />
  );
}

