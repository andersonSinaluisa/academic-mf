export class TeacherAssignment {
    constructor(
        public id: number,
        public teacherId: number,
        public courseId: number,
        public subjectId: number,
        public schoolYearId: string,
        public createdAt?: string
    ) { }
}
