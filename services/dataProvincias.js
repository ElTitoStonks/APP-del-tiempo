import { useDataProvincias } from "./useDataProvincias"
import { useDataMunicipios } from "./useDataMunicipios"
import { useDataMunicipiosTarget } from "./useDataMunicipiosTarget"



export function useProvincias() {
    const { provincias } = useDataProvincias()
    const { municipios } = useDataMunicipios()
    const { municipiosTarget} = useDataMunicipiosTarget()

    return { provincias, municipios, municipiosTarget }
}