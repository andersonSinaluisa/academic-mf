import { OfficialRecord, OfficialRecordEntry } from "@/academic/domain/entities/OfficialRecord";
import { OfficialRecordOutputDto } from "../dto/OfficialRecordDto";

export class OfficialRecordMapper {
    static toDomain(raw: OfficialRecordOutputDto): OfficialRecord {
        return new OfficialRecord(
            raw.studentId,
            raw.fullName,
            raw.records.map(r => new OfficialRecordEntry(r.academicYearId, r.course, r.averageScore, r.status))
        );
    }
}
