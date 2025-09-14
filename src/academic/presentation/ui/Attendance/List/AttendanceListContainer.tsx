import { ListAttendanceUseCase, ListAttendanceCommand } from "@/academic/application/usecases/attendance/ListAttendanceUseCase";
import { AttendanceListPresenter } from "./AttendanceListPresenter";
import { useInjection } from "inversify-react";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";
import { useCallback, useEffect, useState } from "react";
import { Attendance } from "@/academic/domain/entities/Attendance";

export const AttendanceListContainer = () => {
  const listUseCase = useInjection<ListAttendanceUseCase>(ATTENDANCE_SYMBOLS.LIST_USE_CASE);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListAttendanceCommand());
    res.ifRight(data => { setAttendances(data ?? []); }).ifLeft(failures => { setError(failures.map(f=>f.message).join(", ")); });
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchAttendance(); }, [fetchAttendance]);

  const handleSearchChange = (term: string) => setSearchTerm(term);

  const filtered = attendances.filter(a => a.studentId.toString().includes(searchTerm));

  return (
    <AttendanceListPresenter
      attendances={filtered}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onAdd={() => {}}
    />
  );
};
