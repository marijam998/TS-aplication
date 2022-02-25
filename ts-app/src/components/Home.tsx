import React, { useEffect, useState } from 'react';
import { User, getUsers, deleteUser } from '../api';
import Form from './Form';
import Table from './Table';
import Message from './Message';

const Home: React.FunctionComponent = ({ }) => {
    const [name, setName] = useState<string | undefined>()
    const [date, setDate] = useState<string | undefined>()
    const [userType, setUserType] = useState<string | undefined>('')
    const [data, setData] = useState<Array<User>>([])
    const [filterData, setFilterData] = useState<Array<User>>([])

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const changeUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserType(e.target.value)
    }
    const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }
    useEffect(() => {
        getUsers().then(data => {
            setData(data)
            setFilterData(data)
        }).catch(e => console.log("ERROR", e))
    }, [])
    const filterUsers = (): void => {
        setFilterData(
            data.filter((data) => {
                if (name && userType && date) {
                    return data.name.toLowerCase().startsWith(name.toLowerCase())
                        && data.userType === userType && data.date <= date
                }
                if (name && userType) {
                    return data.name.toLowerCase().startsWith(name.toLowerCase())
                        && data.userType === userType
                }
                if (name && date) {
                    return data.name.toLowerCase().startsWith(name.toLowerCase())
                        && data.date <= date
                }
                if (userType && date) {
                    return data.userType === userType
                        && data.date <= date
                }
                if (name) {
                    return data.name.toLowerCase().startsWith(name.toLowerCase())
                }
                if (userType) {
                    return data.userType === userType
                }
                if (date) {
                    return data.date <= date
                }
                return data
            }
            ))
    }
    const clearFilter = (): void => {
        setName('')
        setUserType('')
        setFilterData(data)
        setDate('')
    }
    const onDelete = (id: number): void => {
        deleteUser(id).then(() => getUsers()).then(data => {
            setData(data)
            setFilterData(data)
        }).catch(err => { console.log("Greska", err) })
    }

    return (
        <div className='body'>
            <Form
                data={data}
                date={date}
                name={name}
                userType={userType}
                filterUsers={filterUsers}
                clearFilter={clearFilter}
                changeName={changeName}
                changeUserType={changeUserType}
                changeDate={changeDate}
            />
            {filterData.length === 0
                ? <Message />
                : <Table
                    filterData={filterData}
                    onDelete={onDelete}
                />
            }
        </div>
    )
}

export default Home