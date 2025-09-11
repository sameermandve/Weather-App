
function WeatherHighlights({ Icon, ...props }) {

    return (
        <>
            <div className="flex flex-col flex-1 p-6 sm:px-5 sm:py-4 border-2 border-white/50 rounded-2xl space-y-4 sm:space-y-2 bg-black/40">
                <p className="text-white/80 text-lg lg:text-sm tracking-wide text-center sm:text-left">{props.title}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-normal">
                    {
                        Icon
                        &&
                        (<Icon className={`size-7 sm:size-6 ${props.iconStyle}`} />)
                    }
                    <p className="font-semibold text-2xl lg:text-xl">{props.data} {props.dataUnit}</p>
                </div>
            </div>
        </>
    );
}

export default WeatherHighlights