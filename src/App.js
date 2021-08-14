import React, { useEffect, useState } from 'react'
import 'bootswatch/dist/lumen/bootstrap.min.css';

import Formulario from './components/Formulario';
import ListImages from './components/ListImages';
import Footer from './components/Footer';
// import Error from './components/Error';



function App() {
    
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [footer, setFooter] = useState(false);
    
    //pagination
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageTotal, setPageTotal] = useState(1);

    useEffect(() => {
        
        const goAPI = async () => {

            //prevent first search to api until people make his search
            if(search === '') return;
            
            const { name, typeImage, order } = search;
    
            const imagesPerPages = 30;
            const key = `21160494-753dfc790789145f6f27b9066`;
            const url = `https://pixabay.com/api/?key=${ key }&q=${ name }&image_type=${ typeImage }&order=${ order }&per_page=${ imagesPerPages }&page=${ pageCurrent }`
            
            
            const resp = await fetch(url);
            const result = await resp.json();

            if (result.total === 0) {
                setSearch('')
                setError(true);
                setImages([]);
                setFooter( false );
                return 
            }
            setFooter( true );
            setError(false);

            setImages(result.hits);

            // Page total
            const howManyPages = Math.ceil( result.totalHits / imagesPerPages);
            setPageTotal( howManyPages );


            //move screen up
            const screenUp = document.querySelector('#mainText');
            screenUp.scrollIntoView(true)
            window.scroll(0, 0)
        }
        
        goAPI();

    }, [search, pageCurrent, error]);


    // pages

    const handlePageBefore = () => {
        const newPageCurrent = pageCurrent - 1;

        if(newPageCurrent === 0) return;
        
        setPageCurrent( newPageCurrent );
        setFooter( true );
    }

    const handlePageAfter = () => {
        const newPageCurrent = pageCurrent + 1;

        if(newPageCurrent > pageTotal ) return;

        setPageCurrent( newPageCurrent );
        setFooter ( true );
    }

    return (
        <>
        {/* hacer el nav como a href al inicio para que borre todo */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-5">
                <div className="container-fluid justify-content-center">
                    <h1 id="mainText" className="display-4">Buscador Imagenes Pixabay React</h1>
                </div>
            </nav>
            <Formulario 
                setSearch={ setSearch }
                setPageCurrent={ setPageCurrent }
                error={ error }
                setError={ setError }
            />

            <div className="ms-4 justify-content-center">
                <ListImages images={ images }/>
            </div>

            <div className="text-center">

                {
                    (pageCurrent === 1) ? null : (
                        <button
                            className="btn btn-primary m-1 my-4"
                            onClick={ handlePageBefore }
                            >
                            &laquo; Anterior
                        </button>
                    )
                }


                {
                    (pageCurrent === pageTotal || images.length === 0 ) ? null : (
                        <button
                            className="btn btn-primary m-1 my-4"
                            onClick={ handlePageAfter }
                            >
                            &raquo; Siguiente
                        </button>
                    )
                }

                {
                    (footer &&  <Footer />)
                }

            </div>
        </>
    );
}

export default App;
/////agregar un footer