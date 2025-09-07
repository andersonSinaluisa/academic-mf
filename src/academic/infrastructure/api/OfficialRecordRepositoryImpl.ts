import { OfficialRecordRepository } from "@/academic/domain/interfaces/OfficialRecordRepository";
import { OfficialRecord } from "@/academic/domain/entities/OfficialRecord";
import { ApiInstance } from "./Api";
import { OfficialRecordOutputDto } from "./dto/OfficialRecordDto";
import { OfficialRecordMapper } from "./mappers/OfficialRecordMapper";

export class OfficialRecordRepositoryImpl implements OfficialRecordRepository {
    async getByStudent(studentId: number): Promise<OfficialRecord> {
        const res = await ApiInstance.get<OfficialRecordOutputDto>(
            `/official-records/${studentId}`
        );
        return OfficialRecordMapper.toDomain(res.data);
    }
}
