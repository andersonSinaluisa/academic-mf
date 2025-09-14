import { ListAttendanceUseCase, ListAttendanceCommand } from "@/academic/application/usecases/attendance/ListAttendanceUseCase";
import { AttendanceListPresenter } from "./AttendanceListPresenter";
import { useInjection } from "inversify-react";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";
import { useCallback, useEffect, useState } from "react";
import { Attendance } from "@/academic/domain/entities/Attendance";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const AttendanceListContainer = () => {
  const listUseCase = useInjection<ListAttendanceUseCase>(ATTENDANCE_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [attendances, setAttendances] = useState<Page<Attendance>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListAttendanceCommand(page, 10, filter));
    res
      .ifRight(data => {
        if (data) setAttendances(data);
      })
      .ifLeft(failures => {
        const msg = failures.map(f => f.message).join(", ");
        toast({ title: "Error", description: msg, variant: "destructive" });
      });
    setLoading(false);
  }, [listUseCase, page, filter]);

  useEffect(() => { fetchAttendance(); }, [fetchAttendance]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/asistencias", search: `?page=1&filter=${term}` });
  };

  return (
    <AttendanceListPresenter
      attendances={attendances}
      loading={loading}
      error={null}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
      onAdd={() => navigate("/asistencias/nuevo")}
    />
  );
};
