"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { ExportStatisticsUseCase, ExportStatisticsCommand } from "@/academic/application/usecases/exports/ExportStatisticsUseCase";
import { ExportStatisticsPresenter } from "./ExportStatisticsPresenter";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export function ExportStatisticsContainer() {
  const useCase = useInjection(ExportStatisticsUseCase);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onExport = async (courseId: string, academicYearId: string, format: string) => {
    setLoading(true);
    setError(null);
    const res = await useCase.execute(new ExportStatisticsCommand(courseId, academicYearId, format));
    res.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `estadisticas.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      },
    });
    setLoading(false);
  };

  return <ExportStatisticsPresenter loading={loading} error={error} onExport={onExport} />;
}

