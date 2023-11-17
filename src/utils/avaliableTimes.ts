
type GetTimesParams =  {
    startDate: Date;
    endDate: Date;
    step: number;
    trimPast: boolean;
    currentTime: Date;
}

function getTimes(params: GetTimesParams): string[] {
    const { startDate, endDate, step, trimPast, currentTime } = params;

    if (trimPast && currentTime >= endDate) {
        return [];
    }
    const startTime = new Date(startDate);
    startTime.setHours(startTime.getHours() + 1)

    const times: string[] = [];
    let current = new Date(startTime);

    while (current <= endDate) {
        if (!trimPast || current > currentTime) {
            const currentHours = current.getHours()
            const gettedHours = currentTime.getHours()

            if(currentHours !== gettedHours) {
                const nextHours = gettedHours + 1
                const currentHourNear = nextHours === currentHours
                if(currentHourNear) {
                    const afterHalf = currentTime.getMinutes() > 30
                    if(!afterHalf && current.getMinutes() == 30) {
                        const timeHoursStr = `${nextHours}`
                        const timeMinutesStr = `${current.getMinutes().toString().padStart(2, '0')}`
                        times.push(`${timeHoursStr}:${timeMinutesStr}`);
                    }
                } else {
                    const timeHoursStr = `${current.getHours()}`
                    const timeMinutesStr = `${current.getMinutes().toString().padStart(2, '0')}`
                    times.push(`${timeHoursStr}:${timeMinutesStr}`);
                }

            }
        }
        current.setMinutes(current.getMinutes() + step);
    }

    return times;
}

const defaultParams: GetTimesParams = {
    startDate: new Date(2023, 10, 17, 8, 0), // Год, месяц (от 0 до 11), день, час, минута
    endDate: new Date(2023, 10, 17, 22, 0),
    step: 30, // Шаг в минутах
    trimPast: true, // Флаг обрезания времени, если оно прошло текущее время
    currentTime: new Date(), // Обязательное передача текущего времени
};
export {
    getTimes,
    defaultParams
}