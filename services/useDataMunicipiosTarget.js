import { useEffect, useMemo, useState } from "react"
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useParams } from "react-router-dom"
import { useDataMunicipios } from "./useDataMunicipios"

const URL_PROVINCIA = (CODPROV) =>
    `https://www.el-tiempo.net/api/json/v2/provincias/${CODPROV}`
const URL_MUNICIPIOS_TARGET = (CODPROV, id) => `https://www.el-tiempo.net/api/json/v2/provincias/${CODPROV}/municipios/${id}`

export function useDataMunicipiosTarget() {
    const [municipiosTarget, setMunicipiosTarget] = useState([])
    const [loading, setLoading] = useState(true)
    const { city, municipio } = useParams()
    const filterMunicipio = municipio?.slice(0, 5)
    const { municipios } = useDataMunicipios()



    // const filterMunicipios =  municipios.map((mun) => {
    //     if (mun.CODIGOINE.slice(0, 2) === city) {
    //         const checks = city + mun.CODIGOINE.slice(2, 5)
    //         return console.log(checks)
    //     }
    // })

    const codigosMunicipios = useMemo(() => {
        if (!city || !municipios) return [];

        return municipios
            .filter(mun => mun.CODIGOINE.toString().substr(2, 5))
            .map(mun => {
                const code = mun.CODIGOINE.toString().substr(2, 5)
                return {
                    codigo: code.slice(0, 7),
                    nombre: mun.NOMBRE
                }
            })
    }, [city, municipios])




    useEffect(() => {
        if (city && filterMunicipio) {
            const fetchMunicipiosTarget = async () => {
                try {
                    setLoading(true)
                    // const response = await fetch(URL_MUNICIPIOS_TARGET(city, filterMunicipio))
                    // const data = await response.json()
                    // setMunicipiosTarget(data)
                    const responses = await Promise.all(
                        codigosMunicipios.map(({ codigo }) =>
                            fetch(URL_MUNICIPIOS_TARGET(city, codigo))
                        )
                    )

                    const data = await Promise.all(responses
                        .map(res = res.json()))



                    const allDetails = data.map((detalle, i) => ({
                        ...codigosMunicipios[i],
                        temperaturas: detalle.temperaturas
                    }))

                    setMunicipiosTarget(allDetails)

                } catch (err) {
                    console.error('No se han podido localizar los municipios target', err)
                } finally {
                    setLoading(false)
                }
            }

            fetchMunicipiosTarget()
        }
    }, [city, filterMunicipio])

    return { municipiosTarget, loading }
}