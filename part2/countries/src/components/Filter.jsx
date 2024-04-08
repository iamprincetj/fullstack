const Filter = ({ countryToShow, handleSearch, handleShow }) => {

    let style

    if (countryToShow.includes('Too many matches, specify another filter')) {
        style = {display: 'none'}
    }
    return (
        <>
            <div>
                find countries <input onChange={handleSearch} />
            </div>
            {countryToShow.map(country => <p key={country}>{country}
                <button style={style} onClick={() => handleShow(country)}>show</button>
            </p>)}
        </>
    )
}

export default Filter