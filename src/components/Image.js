import React from 'react';
import './Image.css';

const Image = ({imagen}) => {
    
    const { largeImageURL, previewURL, tags }= imagen

    return (
        <>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="columns">
                    <div className="bordeado">
                        <a 
                            href={largeImageURL}
                            target="_blank"
                            rel="noopener noreferrer"    
                        >
                            <img src={ previewURL } alt={tags} className="img-size"/>

                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Image;