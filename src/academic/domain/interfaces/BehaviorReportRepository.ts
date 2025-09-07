import { BehaviorReport } from "../entities/BehaviorReport";

export interface BehaviorReportRepository {
    create(report: BehaviorReport): Promise<BehaviorReport>;
    list(): Promise<BehaviorReport[]>;
    update(report: BehaviorReport): Promise<BehaviorReport>;
    delete(id: number): Promise<void>;
}
