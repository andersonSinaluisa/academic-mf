export class PromotionAct {
    constructor(
        public id: number,
        public courseId: string,
        public academicYearId: string,
        public generatedBy: number,
        public generatedAt: string
    ) {}
}
