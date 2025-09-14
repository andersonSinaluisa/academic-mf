export class Representative {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public phone?: string,
        public birthDate?: string,
        public uuidUser?: string,
        public address?: string,
        public identification?: string,
        public nacionality?: string,
        public gender?: string,
        public image?: string,
    ) { }
}
