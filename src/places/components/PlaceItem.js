import React, {useState} from "react";


import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import './PlaceItem.css';


const PlaceItem = props => {

    const [showMap, setShowMap] = useState(false);


    const openMapHandler = () =>  setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    
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
                        <Button to={`/places/${props.id}`}>수정</Button>
                        <Button danger >삭제</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;