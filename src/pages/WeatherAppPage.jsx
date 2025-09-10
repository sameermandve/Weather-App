import { lazy, Suspense, useEffect, useState } from "react";

import { CircleGauge, Droplets, Eye, SearchIcon, Sun, ThermometerSun, Wind } from "lucide-react";
import { extractDate } from "../utils/ExtractDate.utils.js";

import Forecast from "../components/Forecast";
import WeatherHighlights from "../components/WeatherHighlights";
import bgImage from "../assets/bgImage.jpg";

function WeatherAppPage() {

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const LazyComponent = lazy(() => import("../components/CityContainer.jsx"))

    const fetchData = async () => {
        const queryCity = city || "Barcelona";

        const url = `${import.meta.env.VITE_API_URI}key=${import.meta.env.VITE_API_KEY}&q=${queryCity}&days=5&aqi=yes&alerts=no`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`http Error: ${res.status}`)
            }

            const data = await res.json();

            setWeatherData(w => ({ ...data }));

        } catch (error) {
            console.error("Error while fetching data: \n", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //  bg-gradient-to-br from-slate-900 to-slate-800
    return (
        <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className="min-h-screen bg-center bg-no-repeat bg-cover bg-fixed text-white font-[Inter]"
        >
            <div className="flex items-center justify-center">
                <div className="w-full max-w-6xl p-6">
                    {/* Main Container */}
                    <div className="border-2 border-white/50 rounded-2xl flex flex-col lg:flex-row backdrop-blur-lg">
                        {/* Left side */}
                        <div className="sm:flex-1 flex flex-col bg-slate-600/10 px-7 py-8 rounded-tl-xl rounded-tr-xl sm:rounded-tr-none sm:rounded-bl-xl space-y-8">
                            {/* Input field */}
                            <div className="relative flex items-center">
                                <div className="absolute inset-y-0 right-0 cursor-pointer z-20 flex items-center pr-5">
                                    <SearchIcon
                                        onClick={fetchData}
                                        className="size-5 text-white/80 hover:text-blue-500 hover:scale-110"
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="w-full py-4 pl-5 pr-10 bg-slate-900/75 text-white/90 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-0 focus:duration-200"
                                    placeholder="Search city...."
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            {/* Input field end */}

                            {/* Data Field */}
                            <div className="space-y-10 lg:pl-5">
                                <Suspense fallback={<p className="font-medium text-lg text-white/90">Loading...</p>}>
                                    <LazyComponent
                                        title={weatherData.location?.name}
                                        para={extractDate(weatherData.location?.localtime)}
                                        titleStyle="font-bold text-5xl lg:text-4xl text-white tracking-tight"
                                        paraStyle="font-semibold text-white/70"
                                    />
                                </Suspense>
                                {/* <div className="flex flex-col gap-1 text-center lg:text-left">
                                    <h1 className="font-bold text-5xl lg:text-4xl text-white tracking-tight">{weatherData.location?.name}</h1>
                                    <p className="font-medium text-white/90">{ extractDate(weatherData.location?.localtime) }</p>
                                </div> */}

                                <div className="p-6 flex justify-center lg:justify-start">
                                    <img
                                        src={weatherData.current?.condition?.icon}
                                        alt="Image"
                                        className="size-32 max-w-40 max-h-40"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 text-center lg:text-left mb-2">
                                    <h1 className="font-bold text-7xl text-white">{weatherData.current?.temp_c}°C</h1>
                                    <p className="font-semibold text-xl text-blue-300">{weatherData.current?.condition?.text}</p>
                                </div>
                            </div>
                            {/* Data Field end */}
                        </div>
                        {/* Left side end */}

                        {/* Right side */}
                        <div className="sm:flex-1/3 flex flex-col bg-slate-400/10 px-7 py-8 rounded-br-xl rounded-bl-xl rounded-tr-none sm:rounded-bl-none sm:rounded-tr-xl space-y-10">
                            {/* Top of right side */}
                            <div className="flex flex-col space-y-8">
                                <h1 className="font-bold text-2xl tracking-wide sm:tracking-wider text-white/80 pt-2">Today's Highlights</h1>

                                {/* Highlights grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                    {/* 1 */}
                                    <WeatherHighlights
                                        title="Feels Like"
                                        Icon={ThermometerSun}
                                        iconStyle={"text-yellow-500"}
                                        data={weatherData.current?.feelslike_c}
                                        dataUnit="°C"
                                    />

                                    {/* 2 */}
                                    <WeatherHighlights
                                        title="Humidity"
                                        Icon={Droplets}
                                        iconStyle={"text-blue-500"}
                                        data={weatherData.current?.humidity}
                                        dataUnit="%"
                                    />

                                    {/* 3 */}
                                    <WeatherHighlights
                                        title="Wind Speed"
                                        Icon={Wind}
                                        iconStyle={"text-white/70"}
                                        data={weatherData.current?.wind_kph}
                                        dataUnit="km/h"
                                    />

                                    {/* 4 */}
                                    <WeatherHighlights
                                        title="UV Index"
                                        Icon={Sun}
                                        iconStyle={"text-yellow-600"}
                                        data={weatherData.current?.uv !== 0 ? weatherData.current?.uv : "None"}
                                    />

                                    {/* 5 */}
                                    <WeatherHighlights
                                        title="Visibility"
                                        Icon={Eye}
                                        iconStyle={"text-cyan-300"}
                                        data={weatherData.current?.vis_km}
                                        dataUnit="km"
                                    />

                                    {/* 6 */}
                                    <WeatherHighlights
                                        title="Air Pressure"
                                        Icon={CircleGauge}
                                        iconStyle={"text-purple-300"}
                                        data={weatherData.current?.pressure_mb}
                                        dataUnit="hPa"
                                    />
                                </div>
                                {/* Highlights grid end */}
                            </div>
                            {/* Top of right side end */}

                            {/* Bottom of right side */}
                            <div className="flex flex-col space-y-8">
                                <h1 className="font-bold text-2xl tracking-wide sm:tracking-wider text-white/80 pt-2">3-Day Forecast</h1>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* 1 */}
                                    <Forecast
                                        date={weatherData.forecast?.forecastday?.[0]?.date}
                                        icon={weatherData.forecast?.forecastday?.[0]?.day?.condition?.icon}
                                        maxTemp={weatherData.forecast?.forecastday?.[0]?.day?.maxtemp_c}
                                        minTemp={weatherData.forecast?.forecastday?.[0]?.day?.mintemp_c}
                                    />

                                    {/* 2 */}
                                    <Forecast
                                        date={weatherData.forecast?.forecastday?.[1]?.date}
                                        icon={weatherData.forecast?.forecastday?.[1]?.day?.condition?.icon}
                                        maxTemp={weatherData.forecast?.forecastday?.[1]?.day?.maxtemp_c}
                                        minTemp={weatherData.forecast?.forecastday?.[1]?.day?.mintemp_c}
                                    />

                                    {/* 3 */}
                                    <Forecast
                                        date={weatherData.forecast?.forecastday?.[2]?.date}
                                        icon={weatherData.forecast?.forecastday?.[2]?.day?.condition?.icon}
                                        maxTemp={weatherData.forecast?.forecastday?.[2]?.day?.maxtemp_c}
                                        minTemp={weatherData.forecast?.forecastday?.[2]?.day?.mintemp_c}
                                    />
                                </div>
                            </div>
                            {/* Bottom of right side end */}
                        </div>
                        {/* Right side end */}
                    </div>
                    {/* Main Container end */}
                </div>
            </div>
        </div>
    );
}

export default WeatherAppPage