
function WeatherHighlights({ Icon, ...props }) {

    return (
        <>
            <div className="flex flex-col flex-1 px-5 py-4 border-2 border-white/50 rounded-2xl space-y-2 bg-black/40">
                <p className="text-white/80 text-sm tracking-wide text-left">{props.title}</p>
                <div className="flex gap-4 items-center">
                    {
                        Icon
                        &&
                        (<Icon className={`size-5 sm:size-6 ${props.iconStyle}`} />)
                    }
                    <p className="font-semibold text-xl sm:text-2xl">{props.data} {props.dataUnit}</p>
                </div>
            </div>
        </>
    );
}

export default WeatherHighlights