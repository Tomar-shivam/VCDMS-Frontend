import React from 'react'
import './content.css'

let Content = (props) => {
    
    return <div className="move">
        {props.topinfo}
        {props.content}
     </div>
}

export default Content