import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? `${window.location.origin}/api/v1/` : "http://localhost:3001/api/v1/",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    },
    timeout: 60000*2*1000
})  
