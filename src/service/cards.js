const GET_LAMBDA_ENDPOINT = 'https://73buqek2o7neus5xkb7zrmgz2y0drouk.lambda-url.us-east-1.on.aws/'
export const getCards = async () => {
    const response = await fetch(GET_LAMBDA_ENDPOINT)
    const data = await response.json()
    return data
}

const ADD_LAMBDA_ENDPOINT = 'https://4r37b464feget6i4zja7hocit40nscvu.lambda-url.us-east-1.on.aws/'
export const addCard = async (data) => {
    const response = await fetch(ADD_LAMBDA_ENDPOINT, {
        method: 'POST',
        body: data
    })
    const resp = await response.json()
    return resp
}

const DELETE_LAMBDA_ENDPOINT = 'https://ksr3trsmn4qii5axbbkwrhc33a0qqqzs.lambda-url.us-east-1.on.aws/'
export const deleteCard = async (id) => {
    const response = await fetch(DELETE_LAMBDA_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ id })
    })
    const resp = await response.json()
    return resp
}

const UPDATE_LAMBDA_ENDPOINT = 'https://xfavvco5gnovciz3lljpleognq0jaris.lambda-url.us-east-1.on.aws/'
export const updateCard = async (data) => {
    const response = await fetch(UPDATE_LAMBDA_ENDPOINT, {
        method: 'POST',
        body: data
    })
    const resp = await response.json()
    return resp
}