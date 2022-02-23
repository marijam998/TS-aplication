import React, { useEffect, useState } from 'react';
import { User, getUsers, deleteUser } from './api';
import Form from './Form';
import Table from './Table';


const Home: React.FunctionComponent = () => {
    const [name, setName] = useState('')
    const [userType, setUserType] = useState('')
    const [data, setData] = useState<Array<User>>([])
    const [filterData, setFilterData] = useState<Array<User>>([])

    useEffect(() => {
        getUsers().then(data => {
            setData(data)
            setFilterData(data)
        }).catch(e => console.log("ERROR"))
    }, [])
    const filterUsers = (): void => {
        setFilterData(
            data.filter((data) => {
                if (name && userType) {
                    return data.name.toLowerCase().startsWith(name.toLowerCase())
                        && data.userType === userType
                }
                if (name) {
                    return data.name.toLowerCase().startsWith(name.toLowerCase())
                }
                if (userType) {
                    return data.userType === userType
                }
                return data
            }
            ))
    }
    const clearFilter = (): void => {
        setName('')
        setUserType('')
        setFilterData(data)
    }
    const deleteData = (id: number): void => {
        deleteUser(id).then(() => getUsers()).then(data => {
            setData(data)
            setFilterData(data)
        }).catch(err => { console.log("Greska", err) })
    }

    return (
        <div className='body'>
            <Form />
            <Table />
        </div>
    )
}

export default Home