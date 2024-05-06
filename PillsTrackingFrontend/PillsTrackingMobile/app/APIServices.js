export const login = async (phoneNumber) => {
    const response = await fetch(`https://localhost:7137/api/Account/login/patient?phoneNumber=${phoneNumber}`, {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
        },
        body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.text();
    return data;
};