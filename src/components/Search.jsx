import { useEffect, useRef, useState } from "react"

const Search = () => {
    const [search, setSearch] = useState('')
    const [countryInfo, setCountryInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const ref = useRef()
    const NoCountries = countryInfo.message;

    useEffect(() => {
        setLoading(true)
        setCountryInfo([])


        const response = ref.current.value
        console.log(response)
        let timer
        if(response.trim()){
            try{
                clearTimeout(timer)
                    timer = setTimeout(() => {
                    setCountryInfo([])
                    fetchCountries(response.trim())
                }, 1200)

            }

            catch(error){

                console.log('API IS DRUNKED 😁',error)
            }
        }
        else if(response.length === 0){
            setCountryInfo([])
            setLoading(false)
        }


    }, [search])

    const fetchCountries = async(countryName) => {

        const respones = await  fetch(`https://restcountries.com/v3.1/name/${countryName}`)

        const data = await respones.json()
        setLoading(false)
        setCountryInfo(data)


    }


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }



    return(
        <div>
            <input  onChange={handleSearch} ref={ref} value={search} type="text"/>
            {loading && <h3>Loading...</h3>}
            <div className="box">
            {!NoCountries ? (countryInfo.map((ele, index) => {
                return(
                    <div key={index}>
                        <img src={ele.flags.png} alt="" width='180px'/>
                        <p>{ele.name.common}</p>
                        <p>area {ele.area}</p>
                        <p>population: {ele.population}</p>

                    </div>
                )
            })) : <h1>Some Issue</h1>}
            </div>

        </div>
    )
}
export {Search}
