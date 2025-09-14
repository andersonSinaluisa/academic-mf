import { MeetingRepository } from "@/academic/domain/interfaces/MeetingRepository";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { ApiInstance } from "./Api";
import { MeetingOutputDto } from "./dto/MeetingDto";
import { MeetingMapper } from "./mappers/MeetingMapper";
import { Page } from "@/lib/utils";

export class MeetingRepositoryImpl implements MeetingRepository {
    async create(meeting: Meeting): Promise<Meeting> {
        const res = await ApiInstance.post<MeetingOutputDto>(
            '/meetings',
            MeetingMapper.toDto(meeting)
        );
        return MeetingMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, topic?: string): Promise<Page<Meeting>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (topic) params.append('topic', topic);
        const res = await ApiInstance.get<Page<MeetingOutputDto>>(
            '/meetings',
            { params }
        );
        return {
            ...res.data,
            content: res.data.content.map(MeetingMapper.toDomain)
        };
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
