import React from 'react';
import {Preloader} from "../../icons";

const Loader = () => {
    return (
        <div style={{height: "60vh"}} className={"w-100p h-100 f-c-col f-1"}>
            <div className="f-c-col infiniteSpin w-content h-content">
                <Preloader height={100} width={100}/>
            </div>

        </div>
    );
};

export default Loader;