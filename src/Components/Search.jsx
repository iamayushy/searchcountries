import { useEffect, useState } from "react"
import debounce from "lodash.debounce"
const Search = () => {
    const [countryName, setCountryName] = useState('')
    const [countryList, setCountryList] = useState([])
    const [loading, setLoading] = useState(false)

    const noCountries = countryList.message
    const fetchCountries = async() => {

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.trim()}`)

        const data = await response.json()
        setLoading(false)
        setCountryList(data)
    }

    const readStream = () => {
        {countryName.trim() && fetchCountries(countryName.trim())}
    }
    const callStream = debounce(() => {
        fetchCountries()
        console.log('called')
    }, 1000)

    // useEffect(() => {
    //     console.log(countryList)
    // }, [countryList])
    return(
        <div>
            <input type="text" onKeyDown = {callStream} value = {countryName} onChange = {(e) => setCountryName(e.target.value)} />

            <section>
                {loading && <h1>loading...</h1> }
            {!noCountries ? countryList.map((nation, index) => {
                return(
                    <div key={index} style = {{border:'1px solid black'}}>
                        <img src={nation?.flags?.png} alt="flag"  width="180px"/>
                        <p>Name: {nation.name.common}</p>
                        <p>Cont: {nation.continents[0]}</p>
                        <p>pop: {nation.population}</p>
                        <p>area: {nation.area}</p>
                        <p>currency: {nation?.currencies && Object.values(nation.currencies).map((co, index) => {
                            return <span key={index}>{co?.symbol} {co?.name} </span>
                        })}</p>
                        <p>languages: {nation.languages && Object.values(nation.languages).map((lang, index) => {
                            return <span key={index}> {lang} </span>
                        })}</p>
                    </div>
                )
            }) : <h1>🙇‍♂️ Noob</h1> }

            </section>
        </div>
    )
}

export {Search}
