import { useParams } from 'react-router-dom'
import { SearchQuery } from '../components/icons/searchQuery'
import { useEffect, useMemo, useState } from 'react'
import { useProvincias } from '../services/dataProvincias'
import { ShowMunicipios } from './ShowMunicipios'

export function SelectCity({ city, setCity, provincias }) {

    const ShowProvincias = () => {
        return <select value={city} onChange={handleCity}
            className='md:w-96 h-10 rounded-l-xl bg-[#150578]/40 px-2 text-[#FFFFFF]'>
            <option value='' disabled>Selecciona una ciudad</option>
            {provincias.length > 0
                ? (
                    provincias.map((provincia) => (
                        <option className='bg-[#150578]' key={provincia.CODPROV} value={provincia.CODPROV}>
                            {provincia.NOMBRE_PROVINCIA}
                        </option>
                    ))
                )
                : (
                    <option value=''>Cargando provincias...</option>
                )
            }


        </select>

    }

    const handleCity = (e) => {
        setCity(e.target.value)
    }

    return (
        <span className='flex items-center'>
            <SearchQuery />
            <ShowProvincias />
        </span>
    )
}

export function CitySelected({ provincia }) {
    const { provincias, municipios, loading } = useProvincias()
    const { city } = useParams()
    
    const selectProvincia = useMemo(() => {
        return provincia.find(prov => String(prov.CODPROV) === city)
    }, [provincia, city])

    if (!selectProvincia) {
        return <div>Cargando información de la provincia...</div>;
    }



    return (
        <section className='mt-2'>
            <h2>Bienvenido a la provincia de {selectProvincia.NOMBRE_PROVINCIA}</h2>
            <ShowMunicipios Municipios={municipios} />
        </section>
    )
}