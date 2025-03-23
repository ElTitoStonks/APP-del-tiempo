import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useProvincias } from "../services/dataProvincias"
import { useDataMunicipios } from "../services/useDataMunicipios"
import { MunicipioDetail } from "./MunicipioDetail"



export function ShowMunicipios() {
    const { municipios, municipiosTarget } = useProvincias()

    const { city } = useParams()

    console.log(municipios)

    function ShowMunicipios() {
        return (
            <div className="grid md:grid-cols-3 gap-1">
                {municipios.map((item) => (
                    <Link
                        className="border-1 border-black h-16 bg-[#150578]/40 flex justify-center items-center p-2 rounded-lg text-[#ccc]"
                        key={item.CODIGOINE}
                        to={`/tiempo/${city}/${item.CODIGOINE.slice(0, 5)}`}>
                        <div>
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