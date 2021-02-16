import Axios from 'axios';
import serverConfig from '../configurations/server';

async function SPOC_API(method, url, data = {}) {
    const baseURL = serverConfig.url

    if (method === undefined)
        return console.error(`Method can't be -> ${method}`);

    if (url === undefined)
        return console.error(`Method can't be -> ${url}`);

    method = method.toLowerCase();

    return await Axios({ method, url, baseURL, data })
        .then(
            async (res) => {
                return res
            },
            err => {
                const { name, message } = err;
                let error = { 'code': `${name}/${message}` };
                throw error;
            }
        )
}

export default SPOC_API;