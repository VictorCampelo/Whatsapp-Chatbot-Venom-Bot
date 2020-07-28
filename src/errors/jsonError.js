function getErrorName(status) {
    switch (status) {
        case 200:
            return 'OK';
        case 400:
            return 'Bad Request';
        case 404:
            return 'Not Found';
        case 500:
            return 'Internal Server Error';
        default:
            return 'Undefined';
    }
}

function JsonError(request, response, message) {
    const error = {
        timestamp: new Date().toISOString(),
        status: response.statusCode,
        error: getErrorName(response.statusCode),
        message,
        path: request.path,
        method: request.method
    };
    return error;
}

module.exports = JsonError;