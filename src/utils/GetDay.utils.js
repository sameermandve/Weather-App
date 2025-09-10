
export const getDay = (dateStr) => {
    const date = new Date(dateStr);

    const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };

    return days[date.getDay()];
};