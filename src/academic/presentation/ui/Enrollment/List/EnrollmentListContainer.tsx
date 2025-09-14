import { ListEnrollmentsUseCase, ListEnrollmentsCommand } from "@/academic/application/usecases/enrollment/ListEnrollmentsUseCase";
import { EnrollmentListPresenter } from "./EnrollmentListPresenter";
import { useInjection } from "inversify-react";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";
import { useCallback, useEffect, useState } from "react";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const EnrollmentListContainer = () => {
  const listUseCase = useInjection<ListEnrollmentsUseCase>(ENROLLMENT_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [enrollments, setEnrollments] = useState<Page<Enrollment>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListEnrollmentsCommand(page, 10, filter));
    res
      .ifRight(data => {
        if (data) setEnrollments(data);
      })
      .ifLeft(failures => {
        const msg = failures.map(f => f.message).join(", ");
        toast({ title: "Error", description: msg, variant: "destructive" });
      });
    setLoading(false);
  }, [listUseCase, page, filter]);

  useEffect(() => { fetchEnrollments(); }, [fetchEnrollments]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/matriculas", search: `?page=1&filter=${term}` });
  };

  return (
    <EnrollmentListPresenter
      enrollments={enrollments}
      loading={loading}
      error={null}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
      onAdd={() => navigate("/matriculas/nuevo")}
    />
  );
};
