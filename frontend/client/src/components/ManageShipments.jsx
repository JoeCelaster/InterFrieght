import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ManageShipments = () => {
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const [Profile,setProfile]=useState([])
    const [loading,setLoading]=useState(true)


    useEffect(() => {
        if(loading){
            axios.get(`${apiURL}/shipment/getuploads`)
            .then((res)=>{
                setProfile(res.data.data.uploadedDetails)
                console.log('Details recieved!')
                console.log(res.data.data.uploadedDetails)
            })
            .catch((err)=>{
                console.log(err)
            });
        }
        setLoading(false)
        
        
    }, [loading]);
    return (
        <div>
            <h1>joe</h1>
            <h1>{Profile?.userFirstName}</h1> 
            <h1>{Profile?.userEmail}</h1>
            <h1>{Profile?.letterOfCredit}</h1>
            <h1>{Profile?.packingList}</h1>
            <h1>{Profile?.invoice}</h1>
            <h1>{Profile?.purchaseOrder}</h1>
        </div>
    );
}

export default ManageShipments;
