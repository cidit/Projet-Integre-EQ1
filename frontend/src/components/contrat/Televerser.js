import React, { useState, useEffect } from "react";
import { DropzoneAreaBase } from 'material-ui-dropzone';

function Televerser() {

    const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
    });

    return (
        <div>
            <DropzoneAreaBase
                //initialFiles={[file]}
                onChange={(files) => console.log('Files:', files)}
                
            >

                televerser votre doc
            </DropzoneAreaBase>
        </div>
    )

}

export default Televerser
