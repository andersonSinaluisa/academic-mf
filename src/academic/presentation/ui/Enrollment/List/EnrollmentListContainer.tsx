import { ListEnrollmentsUseCase, ListEnrollmentsCommand } from "@/academic/application/usecases/enrollment/ListEnrollmentsUseCase";
import { EnrollmentListPresenter } from "./EnrollmentListPresenter";
import { useInjection } from "inversify-react";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";
import { useCallback, useEffect, useState } from "react";
import { Enrollment } from "@/academic/domain/entities/Enrollment";

export const EnrollmentListContainer = () => {
  const listUseCase = useInjection<ListEnrollmentsUseCase>(ENROLLMENT_SYMBOLS.LIST_USE_CASE);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListEnrollmentsCommand());
    res.ifRight(data => { setEnrollments(data ?? []); }).ifLeft(failures => { setError(failures.map(f=>f.message).join(", ")); });
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchEnrollments(); }, [fetchEnrollments]);

  const handleSearchChange = (term: string) => setSearchTerm(term);

  const filtered = enrollments.filter(e => e.courseId.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <EnrollmentListPresenter
      enrollments={filtered}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onAdd={() => {}}
    />
  );
};
