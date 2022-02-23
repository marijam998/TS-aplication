import { User } from './types'

export const getUsers = (): Promise<Array<User>> => {
    return fetch('http://localhost:3001/person')
        .then(response => response.json())
        .then(content => content)
}

export const deleteUser = (id: number): Promise<void> => {
    return fetch(`http://localhost:3001/person/${id}`, {
        method: 'DELETE',
    }).then(_ => undefined)
}

// export const saveUser = (user: User): Promise<void> => {
//     return fetch('http://localhost:3001/person', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     }).then(_ => undefined)

// }