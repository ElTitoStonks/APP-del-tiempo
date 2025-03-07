import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ShowMunicipios({ Municipios }) {
    const { city } = useParams()

    return (
        Municipios.length > 0
            ? (
                <ul>
                    {Municipios.map((item) => (
                        <li key={item.CODIGOINE}>
                            <Link to={`/tiempo/${city}/${item.CODIGOINE.slice(0, 5)}`}>
                                {item.NOMBRE}</Link>
                        </li>
                    ))}
                </ul>
            )
            :
            null
    )
}