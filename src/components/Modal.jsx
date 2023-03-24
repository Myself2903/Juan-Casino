import '../styles/Modal.css'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom';

/* 

guided in:
https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

*/

const Modal = props =>{

    return ReactDOM.createPortal(
        <CSSTransition
         in={props.show}
         unmountOnExit
         timeout={{enter: 0, exit:300}}
         >
            <div className={'modal'} onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="modal-title">{props.params['game']}</h2>
                    </div>
                    <div className="modal-body">
                        {props.content}
                    </div>
                    <div className="modal-footer">
                        <button className="button" onClick={props.onClose} >Cerrar</button>
                        <a className="button play" onClick={props.game}>Jugar</a>
                    </div>
                </div>
            </div>
            
         </CSSTransition>,
         document.getElementById('root')
    );
}

export default Modal;