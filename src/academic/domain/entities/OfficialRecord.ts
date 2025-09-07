export class OfficialRecordEntry {
    constructor(
        public academicYearId: string,
        public course: string,
        public averageScore: number,
        public status: string
    ) { }
}

export class OfficialRecord {
    constructor(
        public studentId: number,
        public fullName: string,
        public records: OfficialRecordEntry[]
    ) { }
}
