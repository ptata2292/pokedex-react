import axios from 'axios'
import './style.css'
import { useEffect, useState } from 'react'
import logo from '../poke-logo.jpeg';

export function Formulario({setUser}) {
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(false)
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(false)
    const [shown, setShown] = useState(false);

    useEffect(() => {
        axios.get('json/usuarios.json').then(response =>
            {
                setUsuarios(response.data)
            })
    }, [] )

    const switchShown = () => setShown(!shown);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email === '' || contraseña === '') {
            setError(true)
            return
        }

        else
        {
            let usuario = usuarios.find(x => x.email === email)
            
            if (usuario) {
                if (usuario.passwork === contraseña) {
                    setError(false)
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setUser([email])
                    }, 2000);
                    
                }
                else
                {
                    setError(true)
                    return
                }
            }
            else
            {
                setError(true)
                return
            }
        }
    }

    return (
        
        <section>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand poke-nav" href="#">
                    <img src={logo} width="40" height="40" className="d-inline-block align-top" alt=""/>&nbsp;
                    Poke App Prueba
                </a>
            </nav>
            <h1 className='margen'>Login</h1>

            <form className='formualrio' onSubmit={handleSubmit}>
                <input type="text" onChange={e => setEmail(e.target.value)} value={email} required disabled={loading}/>
                <input type={shown ? 'text' : 'password'} onChange={e => setContraseña(e.target.value)} value={contraseña} required disabled={loading}/>
                {/* <input type='checkbox' className='check' onClick={switchShown}
                    value={!shown ? 'Ocultar' : 'Mostrar'} /> */}

                <a onClick={switchShown}><input type='checkbox'/>{shown ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}</a>
                
                <button className='btn btn-func' disabled={loading}>Iniciar sesion</button>
                { error &&

                    <div className="alert center-div">
                    Datos de Usuario incorrecto
                    </div>

                    }
            
            </form>
            
            {loading && <h1 className='center-div margen'>Loading...</h1>}
        
        </section>
    )
}