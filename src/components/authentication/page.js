import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useRef } from 'react'
const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
}

let Page = (props) => {
    const [redirect, setRedirect] = useState(false)
    useConstructor(() => {
        if (localStorage.session) {
            setRedirect(true)
        }
    })

    return <div>
        {redirect ? <Redirect to="/content" /> : props.contentData}
    </div>
}

export default Page