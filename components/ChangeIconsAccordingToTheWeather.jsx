import { Sunny } from "./icons/Sunny"
import { LittleCloudyDay } from "./icons/LittleCloudyDay"
import { Cloudy } from "./icons/Cloudy"
import { useEffect, useMemo, useState } from "react"

export function ChangeIconsAccordingToTheWeather({ weather }) {
    const [stateSky, setStateSky] = useState("")

    useEffect(() => {
        setStateSky(weather)
    }, [weather])

    if (stateSky === 'Cubierto') {
        return <Cloudy />
    } else if (stateSky === 'Poco nuboso') {
        return <LittleCloudyDay />
    } else if (stateSky === 'Nubes altas') {
        return <Sunny />
    }


}