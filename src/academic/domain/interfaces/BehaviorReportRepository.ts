import { BehaviorReport } from "../entities/BehaviorReport";
import { Page } from "@/lib/utils";

export interface BehaviorReportRepository {
    create(report: BehaviorReport): Promise<BehaviorReport>;
    list(page: number, limit: number, search?: string): Promise<Page<BehaviorReport>>;
    update(report: BehaviorReport): Promise<BehaviorReport>;
    delete(id: number): Promise<void>;
}
