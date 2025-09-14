import { ListMeetingsCommand, ListMeetingsUseCase } from "@/academic/application/usecases/meeting/ListMeetingsUseCase";
import { MeetingListPresenter } from "./MeetingListPresenter";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { Meeting } from "@/academic/domain/entities/Meeting";

export const MeetingListContainer = () => {
  const listUseCase = useInjection<ListMeetingsUseCase>(MEETING_SYMBOLS.LIST_USE_CASE);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListMeetingsCommand());
    res.ifRight(data => setMeetings(data ?? [])).ifLeft(f => setError(f.map(x => x.message).join(", ")));
    setLoading(false);
  }, [listUseCase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = meetings.filter(m => m.topic.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <MeetingListPresenter
      meetings={filtered}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddMeeting={() => {}}
    />
  );
};
