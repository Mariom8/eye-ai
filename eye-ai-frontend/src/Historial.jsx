import './Historial.css';
import { NavBar } from './NavBar';

//MOCKED----FUTURE IMPLEMENTATION

export function Historial(){

    return(
        <div class="main">
           <NavBar/> 
         <div class="title">
         <h1>OBJETOS MÁS VISTOS</h1>
         </div> 
         <div class="top">
            <div class="top-global">
            <h2></h2>
            <table>
              <tr>
                <td class="object">Persona</td>
                <td class="times-seen">35</td>
              </tr>
              <tr>
                <td class="object">Perro</td>
                <td class="times-seen">12</td>
              </tr>
              <tr>
                <td class="object">Coche</td>
                <td class="times-seen">20</td>
              </tr>
              <tr>
                <td class="object">Pajaro</td>
                <td class="times-seen">10</td>
              </tr>
              <tr>
                <td class="object">Mesa</td>
                <td class="times-seen">5</td>
              </tr>
              <tr>
                <td class="object">Ratón</td>
                <td class="times-seen">3</td>
              </tr>
              <tr>
                <td class="object">Teclado</td>
                <td class="times-seen">3</td>
              </tr>
              <tr>
                <td class="object">Edificio</td>
                <td class="times-seen">5</td>
              </tr>
              <tr>
                <td class="object">Señal de trafico</td>
                <td class="times-seen">2</td>
              </tr>
              <tr>
                <td class="object">Paso de cebra</td>
                <td class="times-seen">4</td>
              </tr>
              <tr>
                <td class="object">Bici</td>
                <td class="times-seen">7</td>
              </tr>
              <tr>
                <td class="object">Vaso</td>
                <td class="times-seen">2</td>
              </tr>
              <tr>
                <td class="object">Silla</td>
                <td class="times-seen">8</td>
              </tr>
              
          </table>
            </div>
           
            
         </div>
       </div>

    )

}