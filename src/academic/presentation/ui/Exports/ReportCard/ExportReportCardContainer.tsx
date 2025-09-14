"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { ExportReportCardUseCase, ExportReportCardCommand } from "@/academic/application/usecases/exports/ExportReportCardUseCase";
import { ExportReportCardPresenter } from "./ExportReportCardPresenter";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export function ExportReportCardContainer() {
  const useCase = useInjection(ExportReportCardUseCase);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onExport = async (studentId: number, academicYearId: string, format: string) => {
    setLoading(true);
    setError(null);
    const res = await useCase.execute(new ExportReportCardCommand(studentId, academicYearId, format));
    res.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `boleta.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      },
    });
    setLoading(false);
  };

  return <ExportReportCardPresenter loading={loading} error={error} onExport={onExport} />;
}

