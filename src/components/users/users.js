import { useEffect, useState } from 'react'
import './users.css'
import UsersList from './userslist';
import UsersForm from './usersform';

let Users = (props) => {
    const [usersFormState, setUsersFormState] = useState("list")
    const changeContentUsers = () => {
        if (usersFormState === "list") {
            setUsersFormState('form');
        } else if (usersFormState === "form") {
            setUsersFormState("list");
        }
    }
    useEffect(() => {
        props.getUsers();
    }, [])
    const addUserClick = () => {
        setUsersFormState('form')
    }

    return (
        <>
            <div>
                {usersFormState === "list" ? (
                        <UsersList
                            changeContent={changeContentUsers}
                            addUserClick={addUserClick}
                            customerData={props.customerData}
                            usersList={props.usersList}
                            getUsers={props.getUsers}
                        />)
                        : (
                            <UsersForm
                                changeContent={changeContentUsers}
                                customerData={props.customerData}
                                getUsers={props.getUsers}
                            />)
                }
            </div>
        </>
    );
}

export default Users;