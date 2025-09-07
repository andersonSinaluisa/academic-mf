import { inject, injectable } from "inversify";
import { BehaviorReport } from "../entities/BehaviorReport";
import { BehaviorReportRepository } from "../interfaces/BehaviorReportRepository";
import { BEHAVIOR_REPORT_SYMBOLS } from "../symbols/BehaviorReport";

@injectable()
export class BehaviorReportService {
    constructor(
        @inject(BEHAVIOR_REPORT_SYMBOLS.REPOSITORY)
        private repository: BehaviorReportRepository
    ) { }

    create(report: BehaviorReport): Promise<BehaviorReport> {
        return this.repository.create(report);
    }

    list(): Promise<BehaviorReport[]> {
        return this.repository.list();
    }

    update(report: BehaviorReport): Promise<BehaviorReport> {
        return this.repository.update(report);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
