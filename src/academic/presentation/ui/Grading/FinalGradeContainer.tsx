"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { FinalGrade } from "@/academic/domain/entities/FinalGrade";
import { GetFinalGradeUseCase, GetFinalGradeCommand } from "@/academic/application/usecases/grading/GetFinalGradeUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { FinalGradePresenter } from "./FinalGradePresenter";

export function FinalGradeContainer() {
  const useCase = useInjection(GetFinalGradeUseCase);
  const [grade, setGrade] = useState<FinalGrade | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (studentId: number, subjectId: number, year: string) => {
    setLoading(true);
    setError(null);
    const res = await useCase.execute(new GetFinalGradeCommand(studentId, subjectId, year));
    res.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (g: FinalGrade | undefined) => setGrade(g),
    });
    setLoading(false);
  };

  return (
    <FinalGradePresenter
      grade={grade}
      loading={loading}
      error={error}
      onSearch={onSearch}
    />
  );
}

