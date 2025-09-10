import { getDay } from "../utils/GetDay.utils.js";

function Forecast(props) {

    return (
        <>
            <div className="flex flex-col text-center flex-1 p-4 border-2 border-white/50 rounded-2xl space-y-2 bg-black/30">
                <h1 className="font-semibold text-lg">{ getDay(props.date) }</h1>
                <div className="flex items-center justify-center">
                    <img
                        className="size-13"
                        src={ props.icon }
                        alt="image"
                    />
                </div>
                <p className="font-semibold text-lg">{props.maxTemp}° / { props.minTemp }°</p>
            </div>
        </>
    );
}

export default Forecast