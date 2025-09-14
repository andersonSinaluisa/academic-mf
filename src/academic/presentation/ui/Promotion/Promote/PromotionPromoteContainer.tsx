"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { Promotion } from "@/academic/domain/entities/Promotion";
import { PromoteStudentUseCase, PromoteStudentCommand } from "@/academic/application/usecases/promotion/PromoteStudentUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { PromotionPromotePresenter } from "./PromotionPromotePresenter";

export function PromotionPromoteContainer() {
  const useCase = useInjection(PromoteStudentUseCase);
  const [result, setResult] = useState<Promotion | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPromote = async (studentId: number, academicYearId: string) => {
    setLoading(true);
    setError(null);
    const res = await useCase.execute(new PromoteStudentCommand(studentId, academicYearId));
    res.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (r: Promotion | undefined) => setResult(r),
    });
    setLoading(false);
  };

  return (
    <PromotionPromotePresenter
      promotion={result}
      loading={loading}
      error={error}
      onPromote={onPromote}
    />
  );
}

