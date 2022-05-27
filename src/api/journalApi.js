import axios from 'axios'
const journalApi = axios.create({
    baseURL:'https://vue-demos-6ec80-default-rtdb.firebaseio.com'
})
export default journalApi