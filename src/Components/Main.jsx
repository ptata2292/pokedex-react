import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

import './style.css'
import logo from '../poke-logo.jpeg';

const Main = ({setUser}) => {
    let dataBool = true;
    let paginaInicio = 1;
    const [pokeData , setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [disable, setDisable] = React.useState(true);
    const [paginas, setPaginas] = useState('');
    const [paginaActual, setPaginaActual] = useState(10);

    const pokeFunc = async() => {
        let res
        if (dataBool) {
            dataBool = false   
            res = await axios.get(url);
        }

        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemonData(res.data.results);
        setLoading(false);
        setPaginas(res.data.count);
        
        if (res.data.previous != null) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const getPokemonData = async(res) => {
        res.map(async(item)=>{
            const result =  await axios.get(item.url);
            
            setPokeData(state => {
                state = [...state,result.data]
                state.sort((a,b) => a.id>b.id?1:-1)
                return state;
            })
        })
    }

    const handleLogout = () => {
        setUser([])
    }

    useEffect(() => {
        pokeFunc()
    }, [url])

    return(
        <>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand poke-nav" href="#">
                    <img src={logo} width="40" height="40" className="d-inline-block align-top" alt=""/>&nbsp;
                    Pokedex App Prueba
                </a>
                <a className="navbar-brand poke-nav" href="#" onClick={handleLogout} >
                    Logout
                </a>
            </nav>
            <div className="container">
                <Card pokemon={pokeData} loading={loading}></Card>
                <div className="btn-div center-div">
                    <button type="button" disabled={disable} className="btn btn-func" onClick={()=> {
                        setPokeData([])
                        setUrl(prevUrl)
                        setPaginaActual(paginaActual-10)
                    }}>Anterior</button>&nbsp;&nbsp;{paginaActual}&nbsp;&nbsp;de&nbsp;&nbsp;{paginas}&nbsp;&nbsp;
                    <button type="button" className="btn btn-func" onClick={()=>{
                        setPokeData([])
                        setUrl(nextUrl)
                        setPaginaActual(paginaActual+10)
                    }}>Siguiente</button>
                </div>
                
            </div>
        </>
    )
};

export default Main;