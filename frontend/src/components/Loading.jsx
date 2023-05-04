import '../styles/Modal.css'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom';
import load1 from '../assets/LoadingBack.svg'
import load2 from '../assets/Roulete.svg'

/* 

guided in:
https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

*/

const Loading = props =>{

    return ReactDOM.createPortal(
        <CSSTransition
         in={props.show}
         unmountOnExit
         timeout={{enter: 0, exit:300}}
         >
            <div className={'modal'}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <img src={load2}></img>
                    <img src={load1}></img>
                </div>
            </div>
            
         </CSSTransition>,
         document.getElementById('root')
    );
}

export default Loading;