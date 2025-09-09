import { ListPromotionActsCommand, ListPromotionActsUseCase } from "@/academic/application/usecases/promotion-act/ListPromotionActsUseCase";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { PromotionActListPresenter } from "./PromotionActListPresenter";
import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";

export const PromotionActListContainer = () => {
  const listUseCase = useInjection<ListPromotionActsUseCase>(PROMOTION_ACT_SYMBOLS.LIST_USE_CASE);
  const [acts, setActs] = useState<PromotionAct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courseId, setCourseId] = useState("");
  const [yearId, setYearId] = useState("");

  const fetchData = useCallback(async () => {
    if (!courseId || !yearId) return;
    setLoading(true);
    setError(null);
    const res = await listUseCase.execute(new ListPromotionActsCommand(courseId, yearId));
    res.ifRight(data => setActs(data ?? [])).ifLeft(f => setError(f.map(x => x.message).join(", ")));
    setLoading(false);
  }, [listUseCase, courseId, yearId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <PromotionActListPresenter
      acts={acts}
      loading={loading}
      error={error}
      courseId={courseId}
      yearId={yearId}
      onCourseChange={setCourseId}
      onYearChange={setYearId}
      onSearch={fetchData}
      onAddAct={() => {}}
    />
  );
};
