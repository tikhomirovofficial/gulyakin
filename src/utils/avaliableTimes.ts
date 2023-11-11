function generateTimeArray() {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    // Если текущее время позже 22:00, начинаем с завтрашнего дня
    const startHour = currentHour >= 22 ? 9 : currentHour < 9 ? 9 : currentHour;
    let startMinute = currentHour === 9 && currentMinute < 30 ? 30 : 0;

    // Добавляем минимальное следующее время, если текущее время имеет минуты меньше 30

    if (currentMinute < 30 && currentHour <= 22) {
        const formattedNextHour = (startHour + 1).toString().padStart(2, "0");
        return [`${formattedNextHour}:00`, `${formattedNextHour}:30`, ...generateRemainingTimes(startHour + 1)];
    }

    return generateRemainingTimes(startHour);
}

// Функция для генерации времени для оставшейся части дня
function generateRemainingTimes(startHour: number) {
    const times = [];
    for (let hour = startHour; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            times.push(`${formattedHour}:${formattedMinute}`);
        }
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


