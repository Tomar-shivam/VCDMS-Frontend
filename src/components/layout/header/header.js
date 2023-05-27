import React, { useEffect, useState } from 'react'
import httpService from '../../../services/http.service'
import './header.css'
import NavElement from './navbar'
import { CHECK_KEYLOK } from '../../../config'

const Header = (props) => {
    const [license, setLicense] = useState(0);
    useEffect(() => {
        async function fetchLicense() {
            if(CHECK_KEYLOK) {
                let licenseCount = await httpService.get('getlicenses').then(res => res.data); 
                if(licenseCount!==undefined && licenseCount['output'] === "") setLicense(0);
                else if(licenseCount !==undefined) setLicense(parseInt(licenseCount['output'])) 
            }
        }
        fetchLicense();
    }, [])
    return(
        <NavElement
            setContent={props.setContent} 
            indexSelected={props.indexSelected}
            setIndexSelected={props.setIndexSelected} 
            regionList={props.regionList} 
            customerData={props.customerData}  
            addElementClick={props.addElementClick} 
            deviceList={props.deviceList}
            dashboardClick={props.dashboardClick} 
            logoutClick={props.logoutClick} 
            username={props.username} 
            handleDeviceClick={props.handleDeviceClick} 
            setDeviceFormState={props.setDeviceFormState}
            licenses={license}
        />
    )
    
}
export default Header
