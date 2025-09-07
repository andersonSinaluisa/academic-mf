export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'JUSTIFIED';

export class Attendance {
    constructor(
        public id: number,
        public studentId: number,
        public date: string,
        public status: AttendanceStatus
    ) { }
}
