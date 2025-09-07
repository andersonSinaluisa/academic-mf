export class ReportCardSubject {
    constructor(
        public subjectId: string,
        public name: string,
        public scores: Record<string, number>
    ) { }
}

export class ReportCard {
    constructor(
        public id: number,
        public academicYearId: string,
        public studentId: number,
        public averageScore: number,
        public status: string,
        public subjects: ReportCardSubject[]
    ) { }
}

