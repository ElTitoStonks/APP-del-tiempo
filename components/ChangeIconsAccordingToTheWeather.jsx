import { Sunny } from "./icons/Sunny"
import { LittleCloudyDay } from "./icons/LittleCloudyDay"
import { Cloudy } from "./icons/Cloudy"
import { Moon } from "./icons/Moon"
import { useEffect, useMemo, useState } from "react"

export function ChangeIconsAccordingToTheWeather({ weather, time, ocaso, orto }) {
    const [stateSky, setStateSky] = useState("")

    useEffect(() => {
        setStateSky(weather)
    }, [weather])

    const ocasoMin = parseInt(ocaso)
    console.log(ocasoMin)

    if (stateSky === 'Cubierto') {
        return <Cloudy />
    } else if (stateSky === 'Poco nuboso') {
        return <LittleCloudyDay />
    } else if (stateSky === 'Despejado') {
        if(time > ocasoMin){
            return <Moon />
        } else {
            return <Sunny />
        }
    }


}