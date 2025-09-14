import { ListRepresentativesCommand, ListRepresentativesUseCase } from "@/academic/application/usecases/representative/ListRepresentativesUseCase";
import { RepresentativeListPresenter } from "./RepresentativeListPresenter";
import { useInjection } from "inversify-react";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import { useCallback, useEffect, useState } from "react";
import { Representative } from "@/academic/domain/entities/Representative";
import { Page } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router";

export const RepresentativeListContainer = () => {
    const listUseCase = useInjection<ListRepresentativesUseCase>(REPRESENTATIVE_SYMBOLS.LIST_USE_CASE);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("filter") || "";

    const [representatives, setRepresentatives] = useState<Page<Representative>>({
        content: [],
        page: 0,
        size: 10,
        total: 0,
        totalPage: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchRepresentatives = useCallback(async () => {
        setLoading(true);
        const res = await listUseCase.execute(new ListRepresentativesCommand(page, 10, filter));
        res
            .ifRight(data => {
                if (data) setRepresentatives(data);
            })
            .ifLeft(failures => {
                toast({
                    title: "Error",
                    description: failures.map(f => f.message).join(", "),
                    variant: "destructive",
                });
            });
        setLoading(false);
    }, [listUseCase, page, filter]);

    useEffect(() => {
        fetchRepresentatives();
    }, [fetchRepresentatives]);

    const handleSearchChange = (term: string) => {
        navigate({ pathname: "/representantes", search: `?page=1&filter=${term}` });
    };

    return (
        <RepresentativeListPresenter
            representatives={representatives}
            loading={loading}
            error={null}
            onAddRepresentative={() => navigate("/representantes/nuevo")}
            onSearchChange={handleSearchChange}
            searchTerm={filter}
        />
    );
};

