import React, {useState, useContext} from "react";


import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import './PlaceItem.css';


const PlaceItem = props => {

    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);

    const [showComfirmModal, setShowComfirmModal] = useState(false);


    const openMapHandler = () =>  setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const ShowDeleteWaringHandler = () =>{
        setShowComfirmModal(true);
    }    

    const cancelDeleteHandler = () => {
        setShowComfirmModal(false);
    }

    const confirmDeleteHandler = () => {
        setShowComfirmModal(false);
        console.log('DELETEING...')
    }


    return ( 
        <React.Fragment>
            <Modal 
                show={showMap}
                onCancel={closeMapHandler}
                header={props.title}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>닫기</Button>}
            >
                {/*Modal창 내용 */}
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal

            show={showComfirmModal}
            onCancel={cancelDeleteHandler}
            header="확실합니까?" 
            footerClass="place-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>취소</Button>
                    <Button danger onClick={confirmDeleteHandler}>삭제</Button>
                </React.Fragment>
                } 
            >
                <p>
                    삭제하시겠습니까? 삭제 후에는 취소할 수 없습니다.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>

                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>지도 보기</Button>
                        {auth.isLoggedIn && (
                            <Button  to={`/places/${props.id}`}>수정</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={ShowDeleteWaringHandler}>삭제</Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;