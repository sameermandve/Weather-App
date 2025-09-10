
function CityContainer(props) {
    return (
        <>
            <div className="flex flex-col gap-1 text-center lg:text-left">
                <h1 className={props.titleStyle}>{props.title}</h1>
                <p className={props.paraStyle}>{props.para}</p>
            </div>
        </>
    );
}

export default CityContainer