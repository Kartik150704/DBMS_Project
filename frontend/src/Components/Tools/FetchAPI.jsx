async function FetchAPI(url, method, data) {
    
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json', 
        },
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, requestOptions);

        // if (!response.ok) {
        //     throw new Error(`API request failed with status: ${response.status}`);
        // }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('API request error:', error);
        return null;
    }
}

export {FetchAPI};

