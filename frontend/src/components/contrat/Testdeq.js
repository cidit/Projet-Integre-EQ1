import React, { useState, useEffect } from "react";
import { DropzoneArea } from 'material-ui-dropzone';

function SauvegarderContrat(params) {

    const file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });



    return (
<div>
<div className="container">
            <DropzoneArea
                //initialFiles={[file]}
                onChange={(files) => console.log('Files:', files)}
            />
        </div>


</div>

        
    );

}

export default SauvegarderContrat;