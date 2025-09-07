export class Promotion {
    constructor(
        public studentId: number,
        public academicYearId: string,
        public finalAverage: number,
        public status: string,
        public generatedAt: string
    ) {}
}
