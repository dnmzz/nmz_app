function send_response(request, response) {
    response.send(request.finalResponse);
}

module.exports = {
    send_response: send_response
};