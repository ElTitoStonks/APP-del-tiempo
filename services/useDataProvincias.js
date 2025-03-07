import { useEffect, useState } from "react"
const URL_PROVINCIAS = 'https://www.el-tiempo.net/api/json/v2/provincias'

export function useDataProvincias() {
    const [provincias, setUseProvincias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(URL_PROVINCIAS)
                const datas = await response.json()
                setUseProvincias(datas.provincias)
            } catch (err) {
                console.error('Error al obtener las provincias', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return { provincias, loading }
}