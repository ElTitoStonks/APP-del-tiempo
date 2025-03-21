import { useParams } from "react-router-dom"
import { useProvincias } from "../services/dataProvincias"
import { ShowMunicipios } from "./ShowMunicipios"

export function MunicipioDetail({ max, min }) {
    const { municipiosTarget, loading } = useProvincias()
    const { city, municipio } = useParams()

    return (
        <div className="text-sm">
            {/* Ajusta esta línea según la estructura real de la API */}
            {/* <ShowMunicipios max={municipiosTarget.temperaturas?.max}
                min={municipiosTarget.temperaturas?.min} /> */}
        </div>
    )
}