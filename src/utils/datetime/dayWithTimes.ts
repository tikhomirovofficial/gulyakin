export function getDatesWithTimes(date: Date, time1: string, time2: string): Date[] {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    const dateWithTime1 = new Date(date);
    dateWithTime1.setHours(hour1, minute1, 0, 0);

    const dateWithTime2 = new Date(date);
    dateWithTime2.setHours(hour2, minute2, 0, 0);

    return [dateWithTime1, dateWithTime2];
}

