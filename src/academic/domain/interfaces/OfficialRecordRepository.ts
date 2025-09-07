import { OfficialRecord } from "../entities/OfficialRecord";

export interface OfficialRecordRepository {
    getByStudent(studentId: number): Promise<OfficialRecord>;
}
