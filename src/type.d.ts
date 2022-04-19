declare interface Activity {
    actName: string,
    time: [string, string],
    type: string,
    region: string,
    actCategory: string,
    ticketNum: number,
    isGoing: boolean,
    desc: string,
    startTime?: string,
    endTime?: string,
    _id?: number
}