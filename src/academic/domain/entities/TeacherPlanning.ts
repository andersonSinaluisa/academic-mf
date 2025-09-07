export class TeacherPlanning {
    constructor(
        public id: number,
        public teacherId: number,
        public subjectId: number,
        public courseId: number,
        public schoolYearId: string,
        public topic: string,
        public description: string,
        public week: number,
        public createdAt?: string
    ) { }
}
