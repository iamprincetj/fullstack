const PersonForm = ({ handleName, handleNumber, handleSumbit }) => {
    return (
        <>
            <form onSubmit={handleSumbit}>
                <div>
                name: <input onChange={handleName} />
                </div>
                <div>
                number: <input onChange={handleNumber} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm