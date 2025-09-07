import { MeetingRepository } from "@/academic/domain/interfaces/MeetingRepository";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { ApiInstance } from "./Api";
import { MeetingOutputDto } from "./dto/MeetingDto";
import { MeetingMapper } from "./mappers/MeetingMapper";

export class MeetingRepositoryImpl implements MeetingRepository {
    async create(meeting: Meeting): Promise<Meeting> {
        const res = await ApiInstance.post<MeetingOutputDto>(
            '/meetings',
            MeetingMapper.toDto(meeting)
        );
        return MeetingMapper.toDomain(res.data);
    }

    async list(): Promise<Meeting[]> {
        const res = await ApiInstance.get<MeetingOutputDto[]>('/meetings');
        return res.data.map(MeetingMapper.toDomain);
    }

    async update(meeting: Meeting): Promise<Meeting> {
        const res = await ApiInstance.put<MeetingOutputDto>(
            `/meetings/${meeting.id}`,
            { topic: meeting.topic }
        );
        return MeetingMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/meetings/${id}`);
    }
}
