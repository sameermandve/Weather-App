
export const extractDate = (rawDate) => {
    const date = new Date(rawDate);

    const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };

    let day = days[date.getDay()];
    let hours = date.getHours();
    let mins = date.getMinutes();
    let meridian = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${day}, ${padZero(hours)}:${padZero(mins)} ${meridian}`;
};

function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}