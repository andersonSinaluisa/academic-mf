import { Representative } from "../entities/Representative";
import { Page } from "@/lib/utils";

export interface RepresentativeRepository {
    create(rep: Representative): Promise<Representative>;
    list(page: number, limit: number): Promise<Page<Representative>>;
    getById(id: number): Promise<Representative | null>;
    update(rep: Representative): Promise<Representative>;
    delete(id: number): Promise<void>;
}
