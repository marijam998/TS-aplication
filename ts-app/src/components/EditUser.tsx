import React, { useState, useEffect } from 'react';
import { User, getUser, saveEditData } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Message from './Message';

const EditUser: React.FunctionComponent = () => {
    const isEqual = require("react-fast-compare");

    const [user, setUser] = useState<User | null>(null)
    const [original, setOriginal] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getUser(id).then(data => {
                setOriginal(data)
                setUser(data)
            }).catch(e => console.log("ERROR", e))
        }
    }, [id]);

    const handleChange = (e: any) => {
        if (user) {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }
    const onSave = (): void => {
        if (id && user) {
            saveEditData(id, user).then(() => navigate('/'))
        }
    }

    return (
        <div>
            {Object.keys(user ? user : 0).length === 0 ? <Message /> :
                <div>
                    <div><p>Edit user</p></div>
                    <form className="addForm">
                        <label className='labelForm'>Name:</label>
                        <input className="inputForm" name='name' type="text" value={user ? user.name : ''} onChange={handleChange} />
                        <label className='labelForm'>Surename:</label>
                        <input className="inputForm" name='sureName' type="text" defaultValue={user ? user.sureName : ''} onChange={handleChange} />
                        <label className='labelForm'>User type:</label>
                        <input className="inputForm" name='userType' type="text" defaultValue={user ? user.userType : ''} onChange={handleChange} />
                        <label className='labelForm'> Created at:</label>
                        <input className="inputForm" name='date' type="date" defaultValue={user ? user.date : ''} onChange={handleChange} />
                        <label className='labelForm'>City:</label>
                        <input className="inputForm" name='city' type="text" defaultValue={user ? user.city : ''} onChange={handleChange} />
                        <label className='labelForm'>Adress:</label>
                        <input className="inputForm" name='adress' type="text" defaultValue={user ? user.adress : ''} onChange={handleChange} />
                        <div className='buttons'>
                            <button className='btnSave' type="submit" disabled={isEqual(user, original)} onClick={(ev) => { ev.preventDefault(); onSave() }}>Save</button>
                            <Link to='/'>
                                <button className='btnBack' type="submit">Back</button>
                            </Link>
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default EditUser