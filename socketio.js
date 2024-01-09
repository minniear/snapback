var socket = io();

const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('server_message')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')

    $('#server_log').append(wrapper)
}

socket.on('add_service', function(service){
//          console.log(service)
    add_service(service)
});

socket.on('show_error', function(url){
    show_error(url)
});

socket.on('server_message', function(message, type){
    if($(".server_message").length > 4){
        $(".server_message")[0].remove()   
    }
    console.log($(".server_message").length)
// $('#server_log').append($('<li type="text" class="server_message">').text(message));
    appendAlert(message, type)
});
