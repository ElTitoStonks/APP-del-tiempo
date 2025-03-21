import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useProvincias } from "../services/dataProvincias"
import { useDataMunicipios } from "../services/useDataMunicipios"
import { MunicipioDetail } from "./MunicipioDetail"



export function ShowMunicipios() {
    const { municipios, municipiosTarget } = useProvincias()

    const { city } = useParams()

    

    function ShowMunicipios() {
        return (
            <div className="grid grid-cols-3 gap-1">
                {municipios.map((item) => (
                    <Link
                        className="border-1 h-40"
                        key={item.CODIGOINE}
                        to={`/tiempo/${city}/${item.CODIGOINE.slice(0, 5)}`}>
                        <div
                            className="">
                            {item.NOMBRE}
                        </div>

                    </Link>

                ))
                }
            </div >
        )
    }

    return (
        municipios.length > 0
            ? (
                <ShowMunicipios />
            )
            :
            null
    )
}