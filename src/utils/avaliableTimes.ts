function generateTimeArray() {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const startHour = currentHour < 9 ? 9 : currentHour;
    let startMinute = currentHour === 9 && currentMinute < 30 ? 30 : 0;

    const times = [];
    for (let hour = startHour; hour <= 22; hour++) {
        for (let minute = startMinute; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            times.push(`${formattedHour}:${formattedMinute}`);
        }
        startMinute = 0; // Reset startMinute for the next hour
    }

    return times;
}


export function getAvailableTimes() {
    const orderTimes = generateTimeArray()
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    let nextAvailableTime = orderTimes.find(time => {
        const [hour, minute] = time.split(":");
        const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
        return timeInMinutes > currentTime;
    });

    if (!nextAvailableTime) {
        // Если не найдено доступное время в текущий день, начнем с первого времени следующего дня
        nextAvailableTime = orderTimes[0];
    }

    const [nextHour, nextMinute] = nextAvailableTime.split(":");
    const nextTimeInMinutes = parseInt(nextHour) * 60 + parseInt(nextMinute);

    return orderTimes.filter(time => {
        const [hour, minute] = time.split(":");
        const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
        return timeInMinutes >= nextTimeInMinutes && timeInMinutes <= 22 * 60;
    });
}


