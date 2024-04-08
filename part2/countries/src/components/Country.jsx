const Country = ({name, capital, area, languages, flag}) => {

    console.log(area)

    if (name) {
    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital} </p>
            <p>area {area} </p>
            <h2>languages</h2>
            <ul>
                {languages.map((language, idx) => <li key={idx}> {language} </li>)}
            </ul>
            <img src={flag} style={{
                height: '150px',
                width: '150px'
            }}/>
        </>
    )
    }
    
}

export default Country