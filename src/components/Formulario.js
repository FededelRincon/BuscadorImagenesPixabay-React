import React, { useState } from 'react';
import Error from './Error';


const Formulario = ({ setSearch, setPageCurrent, error, setError }) => {

    const [quest, setQuest] = useState({
        name : '',
        typeImage : 'all',
        order : 'popular'
    });
    
    const handleInputChange = (e) => {
        // console.log(e.target.name)
        setQuest({
            ...quest,
            [e.target.name] : e.target.value
        })
    }


    const handleFormChange = (e) => {
        e.preventDefault();

        //validate quest
        if( quest.name.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        //send quest to app component
        setSearch(quest)

        // reset Pages
        setPageCurrent( 1 );
    }

    return (
        <>
            <form
                onSubmit = { handleFormChange }
            >
                <div className="container mt-2 p-2">
                    <div className="row">
                        {/* busqueda */}
                        <div className="form-group col-md-3">
                            <label htmlFor="InputName" className="form-label mt-3">Busqueda:</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Ej: Cafe, F1, rock, Cerveza..."
                                autoComplete="off"
                                id="InputName"
                                name="name"
                                onChange={ handleInputChange }
                            />
                        </div>

                        {/* tipo de imagen */}
                        <div className="form-group col-md-3">
                            <label htmlFor="InputTypeImage" className="form-label mt-3">Formato de imagen:</label>
                                <select 
                                    className="form-select form-select-lg" 
                                    id="InputTypeImage"
                                    name="typeImage"
                                    onChange={ handleInputChange }    
                                >
                                    <option value="all">Todos los tipos</option>
                                    <option value="photo">Fotos</option>
                                    <option value="illustration">Dibujos</option>
                                    <option value="vector">svg</option>
                                </select>
                        </div>

                        {/* ordenar segun... */}
                        <div className="form-group col-md-3">
                            <label htmlFor="InputOrder" className="form-label mt-3">Ordenar segun:</label>
                                <select 
                                    className="form-select form-select-lg" 
                                    id="InputOrder"
                                    name="order" 
                                    onChange={ handleInputChange }
                                >
                                    <option value="popular">Popular</option>
                                    <option value="latest">Recientes</option>
                                </select>
                        </div>

                        {/* boton */}
                        <div className="form-group col-md-3">
                            <div className="d-grid gap-2 mt-5">
                                <button 
                                    className="btn btn-lg btn-primary"
                                    >
                                    Buscar
                                </button>
                            </div>


                        </div>
                    </div>
                </div>

                {
                    error && <Error msg='La busqueda no es correcta, intente nuevamente por favor' />
                }
                
            </form>

        </>
    );
}
 
export default Formulario;