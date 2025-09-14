import { ListPromotionActsCommand, ListPromotionActsUseCase } from "@/academic/application/usecases/promotion-act/ListPromotionActsUseCase";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { PromotionActListPresenter } from "./PromotionActListPresenter";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const PromotionActListContainer = () => {
  const listUseCase = useInjection<ListPromotionActsUseCase>(PROMOTION_ACT_SYMBOLS.LIST_USE_CASE);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const initialCourse = searchParams.get("courseId") || "";
  const initialYear = searchParams.get("yearId") || "";

  const [acts, setActs] = useState<Page<PromotionAct>>({
    content: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(initialCourse);
  const [yearId, setYearId] = useState(initialYear);

  const fetchData = useCallback(async () => {
    if (!courseId || !yearId) return;
    setLoading(true);
    const res = await listUseCase.execute(new ListPromotionActsCommand(courseId, yearId, page, 10));
    res
      .ifRight(data => {
        if (data) setActs(data);
      })
      .ifLeft(f =>
        toast({
          title: "Error",
          description: f.map(x => x.message).join(", "),
          variant: "destructive",
        })
      );
    setLoading(false);
  }, [listUseCase, courseId, yearId, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearch = () => {
    if (!courseId || !yearId) return;
    navigate({ pathname: "/actas-promocion", search: `?page=1&courseId=${courseId}&yearId=${yearId}` });
  };

  const handleAddAct = () => {
    navigate("/actas-promocion/nueva");
  };

  return (
    <PromotionActListPresenter
      acts={acts}
      loading={loading}
      error={null}
      courseId={courseId}
      yearId={yearId}
      onCourseChange={setCourseId}
      onYearChange={setYearId}
      onSearch={handleSearch}
      onAddAct={handleAddAct}
    />
  );
};
