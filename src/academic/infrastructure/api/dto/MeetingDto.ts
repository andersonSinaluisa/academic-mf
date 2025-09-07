export interface MeetingInputDto {
    topic: string;
    date: string;
}

export interface MeetingOutputDto extends MeetingInputDto {
    id: number;
}
