import { Sunny } from "./icons/Sunny"
import { LittleCloudyDay } from "./icons/LittleCloudyDay"
import { Cloudy } from "./icons/Cloudy"
import { Moon } from "./icons/Moon"
import { useEffect, useMemo, useState } from "react"

export function ChangeIconsAccordingToTheWeather({ weather, time, ocaso, orto, timeNextDay, ocasoNexDay, ortoNextDay }) {
    const [stateSky, setStateSky] = useState("")

    useEffect(() => {
        setStateSky(weather)
    }, [weather])

    const ocasoMin = useMemo(() => {
        return parseInt(ocaso)
    }, [ocaso])

    const ocasoNext = useMemo(() => {
        return parseInt(ocasoNexDay)
    }, [ocasoNexDay])

    const ortoNext = useMemo(() => {
        return parseInt(ortoNextDay)
    }, [ortoNextDay])

    console.log(ortoNext)

    if (stateSky === 'Cubierto') {
        return <Cloudy />
    } else if (stateSky === 'Poco nuboso') {
        return <LittleCloudyDay />
    } else if (stateSky === 'Despejado') {
        if (time > ocasoMin || timeNextDay > ocasoNext || timeNextDay >= 0 && timeNextDay < ortoNext) {
            return <Moon />
        } else {
            return <Sunny />
        }
    }


}