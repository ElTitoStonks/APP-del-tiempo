import { useParams } from "react-router-dom"
import { useProvincias } from "../services/dataProvincias"

export function MunicipioDetail() {
    const { municipiosTarget, loading } = useProvincias()
    console.log(municipiosTarget)
    const { city, municipio } = useParams()

    return <div>Municipio: {municipio} en {city}</div>
}