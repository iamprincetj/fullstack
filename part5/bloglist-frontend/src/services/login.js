import axios from 'axios'
const baseUrl = '/api/login'


const loginPerson  = async (credential) => {
    const request = await axios.post(baseUrl, credential)

    return request.data
}

export default { loginPerson }