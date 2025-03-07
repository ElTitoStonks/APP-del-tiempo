import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const URL_MUNICIPIOS_TARGET = (CODPROV, id) => `https://www.el-tiempo.net/api/json/v2/provincias/${CODPROV}/municipios/${id}`

export function useDataMunicipiosTarget() {
    const [municipiosTarget, setMunicipiosTarget] = useState([])
    const [loading, setLoading] = useState(true)
    const { city, municipio } = useParams()
    const filterMunicipio = municipio?.slice(0, 5)


    useEffect(() => {
        if (city && filterMunicipio) {
            const fetchMunicipiosTarget = async () => {
                try {
                    setLoading(true)
                    const response = await fetch(URL_MUNICIPIOS_TARGET(city, filterMunicipio))
                    const data = await response.json()
                    setMunicipiosTarget(data)
                    console.log(municipiosTarget)
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