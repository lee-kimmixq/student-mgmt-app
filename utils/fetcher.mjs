import axios from 'axios';

const fetcher = (url, headers) => axios.get(url, headers).then((res) => res.data);

export default fetcher;
