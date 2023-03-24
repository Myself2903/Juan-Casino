import '../styles/Presentation.css'
import logo from '../assets/Juan_Logo.svg'


const Presentation = ()=>{
    return(
        <section id="main_page">
            <img alt="logo" src={logo} /> 
            <a id="play_now">¡Juega ahora!</a>
        </section>
    );
}

export default Presentation;