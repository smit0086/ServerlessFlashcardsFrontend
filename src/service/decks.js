const GET_LAMBDA_ENDPOINT = 'https://55il76lkadjlirpjswec4seava0uxnak.lambda-url.us-east-1.on.aws/'
export const getDecks = async () => {
    const response = await fetch(GET_LAMBDA_ENDPOINT)
    const data = await response.json()
    return data
}

const ADD_LAMBDA_ENDPOINT = 'https://wfp4t57qxackgfsw6a5jlujgna0eidzo.lambda-url.us-east-1.on.aws/'
export const addDeck = async (data) => {
    const response = await fetch(ADD_LAMBDA_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const resp = await response.json()
    return resp
}

const DELETE_LAMBDA_ENDPOINT = 'https://spihsqrxbtu7uz3uyhjeb2z4240hnzcx.lambda-url.us-east-1.on.aws/'
export const deleteDeck = async (id) => {
    const response = await fetch(DELETE_LAMBDA_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ id })
    })
    const resp = await response.json()
    return resp
}