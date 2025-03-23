import { useParams } from "react-router-dom"
import { useProvincias } from "../services/dataProvincias"
import { ChangeIconsAccordingToTheWeather } from "./ChangeIconsAccordingToTheWeather"
import { Humidity } from './icons/Humidity'
import { Windy } from "./icons/Windy"
import { Rain } from "./icons/Rain"

export function MunicipioDetail() {
    const { municipiosTarget, loading } = useProvincias()
    const { city, municipio } = useParams()
    console.log(municipiosTarget)
    const tiempo = Date.now();
    const tiempoHoy = new Date(tiempo)

    function ShowMunicipiosDetails() {

        return (
            <div className="mt-2 border border-[#0E0E52] rounded-lg p-2 bg-[#0E0E52]/20 shadow-[4px_6px_6px_0px_rgba(0,0,0,0.25)]
            text-[#FFF]">
                <div className="flex flex-col justify-center items-center ">
                    <h2 className="text-2xl">{municipiosTarget.municipio?.NOMBRE}</h2>
                    <p className="text-base font-light">{tiempoHoy.toLocaleDateString()}</p>
                </div>

                <div className="flex justify-center gap-5 items-center my-2">
                    <ChangeIconsAccordingToTheWeather
                        weather={municipiosTarget.stateSky?.description} />
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-2xl">{municipiosTarget.temperatura_actual}º</p>
                        <p className="text-2xl font-light">{municipiosTarget.stateSky?.description}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-sm">
                            Max {municipiosTarget.temperaturas?.max}º
                        </p>

                        <p className="text-sm">
                            Min {municipiosTarget.temperaturas?.min}º
                        </p>
                    </div>
                </div>

                <div className="flex justify-between px-4 text-sm">
                    <div className="flex flex-col items-center 
                    bg-[#150578] rounded-md h-20 w-20 justify-center">
                        <Humidity />
                        <p className="font-light">Humedad</p>
                        <p className="font-bold">{municipiosTarget.humedad}%</p>
                    </div>

                    <div className="flex flex-col items-center 
                    bg-[#150578] rounded-md h-20 w-20 justify-center">
                        <Windy />
                        <p className="font-light">Viento</p>
                        <p className="font-bold">{municipiosTarget.viento} km/h</p>
                    </div>

                    <div className="flex flex-col items-center 
                    bg-[#150578] rounded-md h-20 w-20 justify-center">
                        <Rain />
                        <p className="font-light">Lluvia</p>
                        <p className="font-bold">{municipiosTarget.lluvia} %</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section>
            <ShowMunicipiosDetails />
        </section>
    )
}

