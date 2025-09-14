import { ListMeetingsCommand, ListMeetingsUseCase } from "@/academic/application/usecases/meeting/ListMeetingsUseCase";
import { MeetingListPresenter } from "./MeetingListPresenter";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const MeetingListContainer = () => {
  const listUseCase = useInjection<ListMeetingsUseCase>(MEETING_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  const [meetings, setMeetings] = useState<Page<Meeting>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await listUseCase.execute(new ListMeetingsCommand(page, 10, filter));
    res
      .ifRight(data => {
        if (data) setMeetings(data);
      })
      .ifLeft(f =>
        toast({
          title: "Error",
          description: f.map(x => x.message).join(", "),
          variant: "destructive",
        })
      );
    setLoading(false);
  }, [listUseCase, page, filter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearchChange = (term: string) => {
    navigate({ pathname: "/reuniones", search: `?page=1&filter=${term}` });
  };

  const handleAddMeeting = () => {
    navigate("/reuniones/nueva");
  };

  return (
    <MeetingListPresenter
      meetings={meetings}
      loading={loading}
      error={null}
      searchTerm={filter}
      onSearchChange={handleSearchChange}
      onAddMeeting={handleAddMeeting}
    />
  );
};
