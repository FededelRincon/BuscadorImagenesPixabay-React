import React from 'react';

const Error = ({ msg }) => {
    return (
        <>
            <div className="container">
                <p className="m-4 p-2 text-center text-white alert alert-danger rounded-pill">
                    { msg }

                </p>
            </div>
        </>
    );
}
 
export default Error;