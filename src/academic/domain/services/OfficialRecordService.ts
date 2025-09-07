import { inject, injectable } from "inversify";
import { OFFICIAL_RECORD_SYMBOLS } from "../symbols/OfficialRecord";
import { OfficialRecordRepository } from "../interfaces/OfficialRecordRepository";
import { OfficialRecord } from "../entities/OfficialRecord";

@injectable()
export class OfficialRecordService {
    constructor(
        @inject(OFFICIAL_RECORD_SYMBOLS.REPOSITORY)
        private repository: OfficialRecordRepository
    ) { }

    async getOfficialRecord(studentId: number): Promise<OfficialRecord> {
        return this.repository.getByStudent(studentId);
    }
}
