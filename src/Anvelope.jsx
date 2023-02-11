import * as React from 'react';
import ReadAnvelope from './Controlere/Crud_Anvelope/Read_Anvelope';


export function Anvelope() {
  return (
    <div className="main">
          
      {/* <div className="container_coperta">
        <img src="https://www.freewebheaders.com/wp-content/gallery/football//world-cup-goal-keeper-sport-website-header.jpg" alt="imagine jucatori" id="poza_coperta"/>
        <div className="centered"> &#x2605;    LISTA JUCATORI    &#x2605; </div>
      </div>   */}

      <div className="pls">
        <ReadAnvelope/>
      </div>

    </div>
  );
}