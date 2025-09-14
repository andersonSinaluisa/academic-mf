"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { AcademicHistory } from "@/academic/domain/entities/AcademicHistory";
import { GetAcademicHistoryUseCase, GetAcademicHistoryCommand } from "@/academic/application/usecases/academic-history/GetAcademicHistoryUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { AcademicHistoryViewPresenter } from "./AcademicHistoryViewPresenter";

export function AcademicHistoryViewContainer() {
  const useCase = useInjection(GetAcademicHistoryUseCase);
  const [history, setHistory] = useState<AcademicHistory | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (studentId: number) => {
    setLoading(true);
    setError(null);
    const result = await useCase.execute(new GetAcademicHistoryCommand(studentId));
    result.caseOf({
      Left: (failures: AbstractFailure[]) => setError(failures[0]?.message ?? "Error"),
      Right: (h: AcademicHistory | undefined) => setHistory(h),
    });
    setLoading(false);
  };

  return (
    <AcademicHistoryViewPresenter
      history={history}
      loading={loading}
      error={error}
      onSearch={onSearch}
    />
  );
}

