const Post = function(options) {
    let params = options.data ? options.data : "",
        headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (lStore.get("token") || "")
        };
    return new Promise((resolve, reject) => {
        axios({
            headers: headers,
            url: options.url,
            method: "post",
            baseURL: options.pro ? baseApi : httpApiTest,
            timeout: 5000,
            data: params
        })
            .then(response => {
                if (response.status === 200) {
                    let res = response.data;
                    resolve(res);
                    console.log(res, options.name);
                } else {
                    reject(response.data);
                }
            })
            .catch(err => {
                console.log(err);
                reject(err.response);
            });
    });
};
const Get = function(options) {
    let params = options.data ? options.data : "",
        headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (lStore.get("token") || "")
        };
    return new Promise((resolve, reject) => {
        axios({
            headers: headers,
            url: options.url,
            method: "get",
            baseURL: options.pro ? baseApi : httpApiTest,
            timeout: 5000,
            params: params
        })
            .then(response => {
                if (response.status === 200) {
                    let res = response.data;
                    resolve(res);
                    console.log(res, options.name);
                } else {
                    reject(response);
                }
            })
            .catch(err => {
                console.log(err);
                reject(err.response);
            });
    });
};
