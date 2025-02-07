import React from "react";

import Card from '../../shared/components/UIElements/Card';
import './PlaceList.css';
import PlaceItem from "./PlaceItem";

const PlaceList = props => {

    if(props.items.length === 0){
        return <div className="place-list center">
            <Card>
                <h2>장소를 찾을 수 없습니다. </h2>
                <button>장소 공유</button>
            </Card>

        </div>
    }


    return <ul className="place-list">
        {props.items.map(place => <PlaceItem 
        key={place.id} 
        id={place.id} 
        image={place.imageUrl} 
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