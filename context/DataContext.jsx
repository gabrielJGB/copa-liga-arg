import React, { createContext, useState, useEffect } from "react";
import jugando from '../jugando.json'
import jugando2 from '../jugando2.json'

export const DataContext = createContext({
  tablas: null,
  cargando: null,
  selected: null,
  setSelected: () => { },
  obj: null,
  setObj: () => { },
  error: null,
  matchDisplay: null,
  setMatchDisplay: () => { },
  openHistory:null, 
  setOpenHistory:()=>{},
  selectedTeam:null, 
  setSelectedTeam:()=>{}

})

export function DataProvider({ children }) {
  const [tablas, setTablas] = useState(false);
  const [cargando, setCargando] = useState(true)
  const [selected, setSelected] = useState(false)
  const [error, setError] = useState(false)
  const [obj, setObj] = useState(false)
  const [partidosJugando, setPartidosJugando] = useState(false)
  const [matchDisplay, setMatchDisplay] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(false)
  let interval = null
  
  // useEffect(() => {
  //   //fetchScores() descomentar
  //   setTimeout(() => {
  //     setPartidosJugando(jugando.pa)
  //   }, 5000);
  //   // setTimeout(() => {
  //   //   setPartidosJugando(jugando2.pa)
  //   // }, 10000);
  // }, [])





  useEffect(() => {

    updatePartidosJugando()

  }, [partidosJugando])

  useEffect(() => {

    if (interval != null) {
      clearInterval(interval)
    }
    fetchScores()

    interval = setInterval(() => {
      fetchScores()
    }, 30000);

    fetchScores()

  }, [])

  useEffect(() => {

    fetch("https://gabrieljgb.github.io/pr-task/fechas.json")
      .then(resp => resp.json())
      .then(parsed => {
        setObj(parsed)
        setTablas(getTablasPuntos(parsed.fechas))
      })
      .catch(error => {
        console.error(error)
        setError(error)
      })
      .finally(() => {

        setCargando(false)
      })
  }, [])

  const updatePartidosJugando = () => {

    if (obj) {
      if (partidosJugando.length > 0) {
        setObj(prevObj => {
          partidosJugando.forEach(partido_nuevo => {
            prevObj.fechas.forEach(fecha => {
              fecha.partidos.forEach(partido => {
                if (partido.id == partido_nuevo.id) {


                  partido.goles_local = partido_nuevo.r1 === "" ? "" : parseInt(partido_nuevo.r1)
                  partido.goles_visitante = partido_nuevo.r2 === "" ? "" : parseInt(partido_nuevo.r2)
                  partido.estado = getStatus(partido_nuevo)
                  partido.cronometro = getLabel(partido.estado, partido_nuevo.ti)
                  partido.resultado = getResult(partido.estado, partido.goles_local, partido.goles_visitante)
                  partido.rojas_local = parseInt(partido_nuevo.roj1)
                  partido.rojas_visitante = parseInt(partido_nuevo.roj2)
                  partido.autores_local = getScorerArr(partido_nuevo.g1)
                  partido.autores_visitante = getScorerArr(partido_nuevo.g2)



                }
              })
            })
          })

          setTablas(getTablasPuntos(prevObj.fechas))

          return prevObj
        })
      }
    }

    const getScorerArr = (g) => {
      return g.trim().slice(0, -1).split("; ").map(score => (score.replace("<i>", "").replace("</i>", "")))
    }

    const getLabel = (estado, cronometro) => {


      if (estado === "jugando" || estado === "no empezado") {
        let r = cronometro + (cronometro != "E. T." && !cronometro.includes(":") ? "\'" : "")

        return r

      } else if (estado === "finalizado") {
        return "Final"
      }

    }

    const getStatus = (partido_nuevo) => {
      const st = partido_nuevo.st

      if (st === "1" || st === "2" || st === "3") {
        return "jugando"
      } else if (st === "0") {
        return "no empezado"
      } else if (st === "4") {
        return "finalizado"
      } else {
        return "suspendido"
      }


    }

    const getResult = (estado, goles_local, goles_visitante) => {

      if (estado != "no empezado") {
        if (goles_local === goles_visitante) {
          return "E"
        } else if (goles_local > goles_visitante) {
          return "L"
        } else if (goles_local < goles_visitante) {
          return "V"
        }
      } else {
        return ""
      }
    }

  }

  const fetchScores = () => {

    let date = new Date().getTime()

    // let url = "https://api.allorigins.win/raw?url=https://www.promiedos.com.ar/scores84mjd7.json?_=" + date
    let url = "https://cors-proxy-alt.onrender.com/https://www.promiedos.com.ar/scores84mjd7.json"
    let req_info = { headers: { 'X-Requested-With': 'XMLHttpRequest' } }


    fetch(url,req_info)
      .then(resp => resp.json())
      .then(parsed => {

        let x = parsed.pa.filter(partido => partido.li == "1") // cambiar 60
        setPartidosJugando(x)

      })
      .catch(error => {
        console.log(error)
        setError(error)
      })
      .finally(() => {
        setCargando(false)
      })

  }

  const getTablasPuntos = fechas => {

    let equipos = []
    fechas[0].partidos.forEach(partido => {

      equipos.push({ "nombre": partido.local, "escudo": partido.escudo_local, "zona": partido.zona_local })
      equipos.push({ "nombre": partido.visitante, "escudo": partido.escudo_visitante, "zona": partido.zona_visitante })

    })



    let info_tabla_1 = []
    let info_tabla_2 = []

    let id_equipo = 0
    equipos.forEach(equipo => {
      let { goles_favor, goles_contra, dif_goles } = getInfoGoles(equipo.nombre, fechas)
      let { jugados, ganados, empatados, perdidos } = getInfoPartidos(equipo.nombre, fechas)
      let puntos = ganados * 3 + empatados

      let obj_equipo = {
        "id": id_equipo++,
        "escudo": equipo.escudo,
        "equipo": getNombreCorto(equipo.nombre),
        "PJ": jugados,
        "puntos": puntos,
        "PG": ganados,
        "PE": empatados,
        "PP": perdidos,
        "GF": goles_favor,
        "GC": goles_contra,
        "dif": dif_goles
      }



      if (equipo.zona === 1) {
        info_tabla_1.push(obj_equipo)
      } else if (equipo.zona === 2) {
        info_tabla_2.push(obj_equipo)
      }


    })

    // info_tabla.sort((a, b) => a.equipo.localeCompare(b.equipo))
    // info_tabla.sort(((a, b) => b.puntos - a.puntos))

    // info_tabla_1.sort((a, b) => {
    //   let n = b.puntos - a.puntos
    //   if (n != 0) {
    //     return n
    //   }
    //   return b.dif - a.dif
    // })

    // info_tabla_1.sort((a, b) => {
    //   let n = b.GF - a.GF
    //   if (n != 0) {
    //     return n
    //   }
    //   return a.GC - b.GC
    // })

    info_tabla_1.sort((a, b) => a.equipo < b.equipo ? -1 : a.equipo > b.equipo ? 1 : 0)
    info_tabla_2.sort((a, b) => a.equipo < b.equipo ? -1 : a.equipo > b.equipo ? 1 : 0)

    info_tabla_1.sort((a, b) => b.puntos - a.puntos || b.dif - a.dif || b.GF - a.GF || a.GC - b.GC)
    info_tabla_2.sort((a, b) => b.puntos - a.puntos || b.dif - a.dif || b.GF - a.GF || a.GC - b.GC)



    let pos = 0
    info_tabla_1.forEach(equipo => {
      equipo.posicion = ++pos
    })
    pos = 0
    info_tabla_2.forEach(equipo => {
      equipo.posicion = ++pos
    })



    return { info_tabla_1, info_tabla_2 }
  }

  const getInfoGoles = (equipo, fechas) => {
    let goles_favor = 0
    let goles_contra = 0
    let dif_goles = 0

    fechas.forEach(fecha => {
      fecha.partidos.forEach(partido => {
        if (partido.local == equipo) {
          goles_favor += partido.goles_local != "" ? partido.goles_local : 0
          goles_contra += partido.goles_visitante != "" ? partido.goles_visitante : 0

        } else if (partido.visitante == equipo) {
          goles_favor += partido.goles_visitante != "" ? partido.goles_visitante : 0
          goles_contra += partido.goles_local != "" ? partido.goles_local : 0

        }
      })
    })

    dif_goles = goles_favor - goles_contra

    return { goles_favor, goles_contra, dif_goles }
  }

  const getInfoPartidos = (equipo, fechas) => {
    let jugados = 0
    let ganados = 0
    let empatados = 0
    let perdidos = 0
    fechas.forEach(fecha => {
      fecha.partidos.forEach(partido => {
        if (partido.local == equipo || partido.visitante == equipo) {
          if (partido.resultado != "") {
            jugados++
          }
        }

        if ((partido.local == equipo && partido.resultado == "L") || (partido.visitante == equipo && partido.resultado == "V")) {
          ganados++
        }

        if ((partido.local == equipo && partido.resultado == "E") || (partido.visitante == equipo && partido.resultado == "E")) {
          empatados++
        }

        if ((partido.local == equipo && partido.resultado == "V") || (partido.visitante == equipo && partido.resultado == "L")) {
          perdidos++
        }

      })
    })
    return { jugados, ganados, empatados, perdidos }


  }

  const getNombreCorto = equipo => {
    if (equipo == "Argentinos Juniors") {
      return "Argentinos"
    } else if (equipo == "Atlético Tucumán") {
      return "Atl. Tucumán"
    } else if (equipo == "Central Córdoba (SdE)") {
      return "Central Cba."
    } else if (equipo == "Defensa y Justicia") {
      return "Def y Justicia"
    } else if (equipo == "Gimnasia y Esgrima (LP)") {
      return "Gimnasia (LP)"
    } else if (equipo == "Newell's Old Boys") {
      return "Newells"
    } else {
      return equipo
    }
  }


  const contextValue = {
    tablas,
    cargando,
    selected,
    setSelected,
    obj,
    setObj,
    error,
    matchDisplay,
    setMatchDisplay,
    openHistory, 
    setOpenHistory,
    selectedTeam, 
    setSelectedTeam

  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider