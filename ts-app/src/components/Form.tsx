import React from "react";
import { User } from '../api';
import { Link, useNavigate } from 'react-router-dom'

type Props = {
    data: Array<User>,
    name: string | undefined,
    date: string | undefined,
    userType: string | undefined,
    filterUsers: () => void,
    clearFilter: () => void,
    changeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeUserType: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    changeDate: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const getUserType = (data: Array<User>): Array<string> => {
    return data.reduce((typeUsers: Array<string>, user: User) => {
        if (!typeUsers.includes(user.userType)) {
            typeUsers.push(user.userType)
            return typeUsers
        } else {
            return typeUsers
        }
    }, [])
}

const Form: React.FunctionComponent<Props> = ({ data, name, date, userType, filterUsers, clearFilter, changeName, changeUserType, changeDate }) => {
    const navigate = useNavigate()

    const search = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        filterUsers()
    }
    const clear = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        clearFilter();
    }
    return (
        <div>
            <div className='searchdiv'>
                <label className='label'>
                    Name:
                    <input className="inputName" placeholder="Type name..." type="text" value={name} onChange={changeName} />
                </label>
                <label className='label'>
                    User type:
                    <select className='select' value={userType} onChange={changeUserType}>
                        <option className='select' key="default" value=''>Choose type...</option>
                        {getUserType(data).map((typeUser, i) => <option className='select' key={`${i}`} value={typeUser}>{typeUser}</option>)}
                    </select>
                </label>
                <label className='label'>
                    Date:
                    <input className="inputDate" type="date" value={date} onChange={changeDate} />
                </label>
                <button className='btnSearch' onClick={search}>Search</button>
                <button className='btnClear' onClick={clear}>Clear</button>
                <button className='btnAddUser' onClick={() => (navigate('/add', { state: data }))}>Add User</button>
            </div>
        </div>
    )
}

export default Form