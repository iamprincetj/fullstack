const Weather = ({ temp, icon, wind, country }) => {

    if (temp) {
        return (
            <>
                <h1>
                    Weather in {country}
                </h1>
                <p>temperature {temp} Celcius </p>
                <img src={icon} alt="weather icon" />
                <p>wind {wind} m/s</p>
            </>
        )
    }

}

export default Weather