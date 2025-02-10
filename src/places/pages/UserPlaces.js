import React, { useParams} from 'react-router-dom';



import PlaceList from "../components/PlaceList";


const DUMMY_PLACES = [
    {
        
        id: 'p1',
        title: '엠파이어 스테이트 빌딩',
        description : '세계에서 가장 유명한 고층 빌딩 중 하나',
        imageUrl : 'https://i.namu.wiki/i/LWDmxnNre1ywCgFNxsnAYqifIUBK6QV653l7CQG-LESmXwPZoGgYgSx5rkgmYlxhDtrom982gM1nnPyjl52hcKHD6hlFjWCVjBVuA4ZbWZN9_utzIzlfsl-sN4HtI7UthpmiWdVVpnTe5vKxOrqCVIczuvRD_in2YZYonx5ZikE.webp',
        address : '20 W 34th St., New York, NY 10001',
        location : {
            lat: 40.7484405,
            lng: -73.9882393
        },
        creator : 'u1'
    },
];

const UserPlaces = () => {

    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);



    return <PlaceList items={loadedPlaces}/>
}

export default UserPlaces;