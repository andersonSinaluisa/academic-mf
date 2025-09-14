import { ListRepresentativesCommand, ListRepresentativesUseCase } from "@/academic/application/usecases/representative/ListRepresentativesUseCase";
import { RepresentativeListPresenter } from "./RepresentativeListPresenter";
import { useInjection } from "inversify-react";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";
import { useCallback, useEffect, useState } from "react";
import { Representative } from "@/academic/domain/entities/Representative";

export const RepresentativeListContainer = () => {
    const listUseCase = useInjection<ListRepresentativesUseCase>(REPRESENTATIVE_SYMBOLS.LIST_USE_CASE);

    const [representatives, setRepresentatives] = useState<Representative[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchRepresentatives = useCallback(async () => {
        setLoading(true);
        setError(null);
        const res = await listUseCase.execute(new ListRepresentativesCommand(1, 10));
        res.ifRight(data => {
            setRepresentatives(data ?? []);
        }).ifLeft(failures => {
            setError(failures.map(f => f.message).join(", "));
        });
        setLoading(false);
    }, [listUseCase]);

    useEffect(() => {
        fetchRepresentatives();
    }, [fetchRepresentatives]);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const filteredReps = representatives.filter(r =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <RepresentativeListPresenter
            representatives={filteredReps}
            loading={loading}
            error={error}
            onAddRepresentative={() => { }}
            onSearchChange={handleSearchChange}
            searchTerm={searchTerm}
        />
    );
};

