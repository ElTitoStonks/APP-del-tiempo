import { useParams } from "react-router-dom"
import { useProvincias } from "../services/dataProvincias"
import { ChangeIconsAccordingToTheWeather } from "./ChangeIconsAccordingToTheWeather"
import { Humidity } from './icons/Humidity'
import { Windy } from "./icons/Windy"
import { Rain } from "./icons/Rain"
import { Umbrella } from "./icons/Umbrella"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function MunicipioDetail() {
    const { municipiosTarget, loading } = useProvincias()
    const { city, municipio } = useParams()
    console.log(municipiosTarget)
    const tiempo = Date.now();
    const tiempoHoy = new Date(tiempo)

    if (loading) {
        return <p>Cargando...</p>
    }

    function ShowMunicipiosDetails() {

        const noRain = municipiosTarget.lluvia === '' ? '0' : municipiosTarget.lluvia

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
                        <p className="font-bold">{noRain} %</p>
                    </div>
                </div>
            </div>
        )
    }


    function ShowWeatherToday() {

        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 2,
                partialVisibilityGutter: 30
            }
        }

        if (!municipiosTarget.pronostico?.hoy?.estado_cielo_descripcion) {
            return <p>Cargando los elementos</p>
        }

        if (!municipiosTarget.pronostico?.manana?.estado_cielo_descripcion) {
            return <p>Cargando los elementos</p>
        }

        function GetMunicipiosTargetPronosticoHoy() {
            return (
                <Carousel responsive={responsive}
                    draggable={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    partialVisible={true}
                    centerMode={false}
                    className="mt-2 h-44 border rounded-xl">
                    {municipiosTarget.pronostico.hoy.estado_cielo_descripcion.map((item, index) => {
                        const morning = 7
                        const aproxTime = morning + index
                        const formatTime = aproxTime > 23 ? aproxTime - 24 : aproxTime.toString()
                        const aproxTemp = municipiosTarget.pronostico.hoy.temperatura[index]
                        const aproxRain = municipiosTarget.pronostico.hoy.precipitacion[index]
                        const aproxWindDirection = municipiosTarget.pronostico.hoy.viento[index]?.direccion
                        const aproxWindSpeed = municipiosTarget.pronostico.hoy.viento[index]?.velocidad
                        const ocaso = municipiosTarget.pronostico.hoy['@attributes'].ocaso
                        const orto = municipiosTarget.pronostico.hoy['@attributes'].orto
                        return (
                            <div className="bg-[#0E0E52]/20  h-44  grid-rows-4 grid content-center  justify-center items-center text-center text-[#FAFAFA]">
                                <p className="">{formatTime}:00</p>
                                <div className="flex justify-center">
                                    <ChangeIconsAccordingToTheWeather
                                        weather={item} time={aproxTime} ocaso={ocaso} orto={orto}
                                    />
                                </div>
                                <p className="">{aproxTemp}º</p>
                                <p className="flex justify-center gap-1"><Umbrella /> {aproxRain} %</p>
                                <p className="flex justify-center items-center"><Windy /> {aproxWindDirection} {aproxWindSpeed} km/h</p>
                            </div>
                        )
                    })}

                    {municipiosTarget.pronostico.manana.estado_cielo_descripcion.map((item, index) => {
                        const nextDayNight = 0 + index
                        const nextDayNightFormat = nextDayNight > 23 ? nextDayNight - 24 : nextDayNight.toString().padStart(2, '0')
                        const nextDayTemp = municipiosTarget.pronostico.manana.temperatura[index]
                        const nextDayRain = municipiosTarget.pronostico.manana.precipitacion[index]
                        const nextDayWindDirection = municipiosTarget.pronostico.manana.viento[index]?.direccion
                        const nextDayWindSpeed = municipiosTarget.pronostico.manana.viento[index]?.velocidad
                        const ocasoNextDay = municipiosTarget.pronostico.manana['@attributes'].ocaso
                        const ortoNextDay = municipiosTarget.pronostico.manana['@attributes'].orto

                        return (
                            <div className="bg-[#0E0E52]/20  h-44  grid-rows-4 grid content-center  justify-center items-center text-center text-[#FAFAFA]">
                                <p>{nextDayNightFormat}:00</p>
                                <div className="flex justify-center">
                                    <ChangeIconsAccordingToTheWeather
                                        weather={item} timeNextDay={nextDayNight} ocasoNexDay={ocasoNextDay}
                                        ortoNextDay={ortoNextDay}
                                    />
                                </div>
                                <p>{nextDayTemp}º</p>
                                <p className="flex justify-center gap-1"><Umbrella /> {nextDayRain}%</p>
                                <p className="flex justify-center items-center"> <Windy />{nextDayWindDirection} {nextDayWindSpeed} km/h</p>
                            </div>
                        )
                    })}
                </Carousel>
            )
        }


        return (
            <GetMunicipiosTargetPronosticoHoy />
        )
    }

    return (
        <section>
            <ShowMunicipiosDetails />
            <ShowWeatherToday />
        </section>
    )
}
