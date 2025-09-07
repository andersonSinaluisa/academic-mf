export interface BehaviorReportInputDto {
    studentId: number;
    description: string;
}

export interface BehaviorReportOutputDto extends BehaviorReportInputDto {
    id: number;
}
