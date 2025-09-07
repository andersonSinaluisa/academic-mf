import { Representative } from "../entities/Representative";

export interface RepresentativeRepository {
    create(rep: Representative): Promise<Representative>;
    list(page: number, limit: number): Promise<Representative[]>;
    getById(id: number): Promise<Representative | null>;
    update(rep: Representative): Promise<Representative>;
    delete(id: number): Promise<void>;
}
