"use client";

import { useState } from "react";
import { useInjection } from "inversify-react";
import { OfficialRecord } from "@/academic/domain/entities/OfficialRecord";
import { GetOfficialRecordUseCase, GetOfficialRecordCommand } from "@/academic/application/usecases/official-record/GetOfficialRecordUseCase";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { OfficialRecordViewPresenter } from "./OfficialRecordViewPresenter";

export function OfficialRecordViewContainer() {
  const useCase = useInjection(GetOfficialRecordUseCase);
  const [record, setRecord] = useState<OfficialRecord | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (studentId: number) => {
    setLoading(true);
    setError(null);
    const result = await useCase.execute(new GetOfficialRecordCommand(studentId));
    result.caseOf({
      Left: (f: AbstractFailure[]) => setError(f[0]?.message ?? "Error"),
      Right: (r: OfficialRecord | undefined) => setRecord(r),
    });
    setLoading(false);
  };

  return (
    <OfficialRecordViewPresenter
      record={record}
      loading={loading}
      error={error}
      onSearch={onSearch}
    />
  );
}

