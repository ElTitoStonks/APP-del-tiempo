
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { CitySelected, SelectCity } from '../components/SelectCity'
import { useProvincias } from '../services/dataProvincias'
import './App.css'
import { PresentationForm } from "../components/PresentationForm";
import { ShowMunicipios } from "../components/ShowMunicipios";
import { MunicipioDetail } from "../components/MunicipioDetail";

function App() {
  const { provincias, loading } = useProvincias()
  const [city, setCity] = useState('')
  const [municipio, setMunicipio] = useState('')
  
  return (
    <div className="md:w-1/2 w-[80%] pt-7 mx-auto font-monserrat" >
      <PresentationForm
        city={city}
        setCity={setCity}
        provincias={provincias}
      />

      <main>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/tiempo/:city" element={<CitySelected provincia={provincias} />} />
          <Route path="/tiempo/:city/:municipio" element={<MunicipioDetail />} />
        </Routes>
      </main>
    </div >

  )
}

export default App