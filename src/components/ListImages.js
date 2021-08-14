import React from 'react';
import Image from './Image';


const ListImages = ({ images }) => {
    return (
        <>
            <div className="col-12 pt-4 row">
                {images.map(imagen => (
                    <Image 
                        key={imagen.id}
                        imagen={imagen}
                    />
                ))}
            </div>
        </>
    );
}
 
export default ListImages;