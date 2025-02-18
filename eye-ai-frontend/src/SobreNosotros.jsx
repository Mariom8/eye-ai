import './SobreNosotros.css';
import { NavBar } from './NavBar';

export function SobreNosotros(){

    return(
        <div>
            <NavBar/>
            <h1>SOBRE NOSOTROS</h1>
            <p>Somos Mario González y David Navarro, dos estudiantes de desarrollo de aplicaciones multiplataforma. <br></br>
            Hemos querido usar este proyecto para aprender nuevas tecnologías, iniciarnos en la inteligencia artificial <br></br> y seguir formándonos como desarrolladores de software. <br></br>
            A continuación os dejamos nuestros correos y enlaces a LinkedIn, no dudéis en contactar con nosotros <br></br> para cualquier cosa.</p>

            <div className="contacto">
                <div className="gmail">
                    <img className="logo-gmail" src="https://firebasestorage.googleapis.com/v0/b/eye-ai-2a78d.appspot.com/o/resources%2Fgmail.png?alt=media&token=8e395cb9-bfdd-46ec-92a1-7ebee8e98a9e" alt="" />
                    <p className="correos">gonzalez.mario16@gmail.com <br /> daavidnch@gmail.com</p>
                </div>
                
                <div className="linkedin">
                    <img className="logo-link" src="https://firebasestorage.googleapis.com/v0/b/eye-ai-2a78d.appspot.com/o/resources%2Flinkedin.png?alt=media&token=bfdee481-91de-4420-96ad-48fc29706768" alt="" />
                    <div className="nombres">
                        <ul>
                       <li> <a href="https://www.linkedin.com/in/mario-gonz%C3%A1lez-romo/">Mario Gonzalez</a> </li>
                         
                       <li> <a href="https://www.linkedin.com/in/david-navarro-chajma-0109ba256/">David Navarro</a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )

}

