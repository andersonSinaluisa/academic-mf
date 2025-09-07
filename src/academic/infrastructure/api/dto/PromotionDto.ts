export interface PromotionInputDto {
    studentId: number;
    academicYearId: string;
}

export interface PromotionOutputDto {
    studentId: number;
    academicYearId: string;
    finalAverage: number;
    status: string;
    generatedAt: string;
}
