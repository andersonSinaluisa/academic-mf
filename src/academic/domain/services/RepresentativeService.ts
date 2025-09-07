import { inject, injectable } from "inversify";
import { Representative } from "../entities/Representative";
import { RepresentativeRepository } from "../interfaces/RepresentativeRepository";
import { REPRESENTATIVE_SYMBOLS } from "../symbols/Representative";

@injectable()
export class RepresentativeService {
    constructor(
        @inject(REPRESENTATIVE_SYMBOLS.REPOSITORY)
        private repository: RepresentativeRepository
    ) { }

    async create(rep: Representative): Promise<Representative> {
        return this.repository.create(rep);
    }

    async list(page: number, limit: number): Promise<Representative[]> {
        return this.repository.list(page, limit);
    }

    async getById(id: number): Promise<Representative | null> {
        return this.repository.getById(id);
    }

    async update(rep: Representative): Promise<Representative> {
        return this.repository.update(rep);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
