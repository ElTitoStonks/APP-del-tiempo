import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL_MUNICIPIOS = (CODPROV) => `https://www.el-tiempo.net/api/json/v2/provincias/${CODPROV}/municipios`


export function useDataMunicipios() {
    const [municipios, setMunicipios] = useState([])
    const [loading, setLoading] = useState(true)
    const { city } = useParams()
    useEffect(() => {
        if (city) {
            const fetchMunicipios = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(URL_MUNICIPIOS(city));
                    const text = await response.text();
                    const datas = JSON.parse(text);

                    // Función para decodificar entidades HTML (ej: &#39; → ')
                    const decodeHTMLEntities = (text) => {
                        const parser = new DOMParser();
                        return parser.parseFromString(
                            `<!doctype html><body>${text}`,
                            'text/html'
                        ).body.textContent;
                    };

                    // Recorre el JSON y aplica la decodificación solo a los strings
                    const fixData = (data) => {
                        if (typeof data === "string") return decodeHTMLEntities(data);
                        if (Array.isArray(data)) return data.map(fixData);
                        if (data && typeof data === "object") {
                            return Object.fromEntries(
                                Object.entries(data).map(([key, value]) => [key, fixData(value)])
                            );
                        }
                        return data;
                    };

                    const fixedData = fixData(datas);
                    setMunicipios(fixedData.municipios); // Asegúrate de que la clave sea "municipios"

                } catch (err) {
                    console.error("Error al obtener municipios", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchMunicipios();
        }
    }, [city]);

    return { municipios, loading }
}
