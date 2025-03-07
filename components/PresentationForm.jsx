import { useNavigate } from "react-router-dom"
import { SelectCity } from "./SelectCity"

export function PresentationForm({ city, setCity, provincias }) {
  const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (city) {
            navigate(`/tiempo/${city}`)
        }
    }

    return (
        <header className="flex flex-col">
            <h1 className="text-[#FFFFFF] font-bold text-center text-4xl mb-2">El tiempo</h1>

            <form onSubmit={handleSubmit}
                className="flex items-center justify-center">
                <SelectCity city={city} setCity={setCity} provincias={provincias} />
                <button className="w-20 bg-[#150578]/30 h-10 rounded-r-xl text-[#FFFFFF] p-2"
                    type="submit">Buscar</button>
            </form>
        </header>
    )
}