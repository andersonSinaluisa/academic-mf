import { Meeting } from "@/academic/domain/entities/Meeting";
import { MeetingInputDto, MeetingOutputDto } from "../dto/MeetingDto";

export class MeetingMapper {
    static toDomain(dto: MeetingOutputDto): Meeting {
        return new Meeting(dto.id, dto.topic, dto.date);
    }

    static toDto(meeting: Meeting): MeetingInputDto {
        return {
            topic: meeting.topic,
            date: meeting.date
        };
    }
}
