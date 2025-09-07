export interface PromotionActInputDto {
    courseId: string;
    academicYearId: string;
    generatedBy: number;
}

export interface PromotionActOutputDto {
    id: number;
    courseId: string;
    academicYearId: string;
    generatedBy: number;
    generatedAt: string;
}
