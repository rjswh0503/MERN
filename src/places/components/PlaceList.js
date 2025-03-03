import React from "react";

import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";
import './PlaceList.css';
import PlaceItem from "./PlaceItem";

const PlaceList = props => {

    if(props.items.length === 0){
        return <div className="place-list center">
            <Card>
                <h2>장소를 찾을 수 없습니다. </h2>
                <Button to="/places/new">장소 공유</Button>
            </Card>

        </div>
    }


    return <ul className="place-list">
        {props.items.map(place => <PlaceItem 
        key={place.id} 
        id={place.id} 
        image={place.image} 
        title ={place.title} 
        description = {place.description} 
        address ={place.address} 
        creatorId={place.creator} 
        coordinates={place.location}
         />
          )}
    </ul>
}

export default PlaceList;