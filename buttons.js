// TODO: Add error handling for null csv and report exports
// TODO: Figure out how I want to show the server messages and errors
// TODO: Display the results in a grid pattern instead of a list with the just the image as a preview and a dropdown for the rest of the info
// TODO: Add Dark Mode

// if use proxy is checked, show and enable the proxy input
$('#proxy_checkbox').on('change', function() {
    if (this.checked) {
        $('#proxy_input').prop('hidden', false)
        $('#proxy_input').prop('disabled', false)
        }
    else {
        $('#proxy_input').prop('hidden', true)
        $('#proxy_input').prop('disabled', true)
    }
});

$(document).on('click', '.url_link', function () {
    //fix an issue for Greg
    is_checked = $($(this).parent().parent().find(".viewed_url")[0]).is(':checked')
    if(!is_checked){
    $(this).parent().parent().find(".viewed_url")[0].click()
    }
});

$(document).on('click', '.viewed_url', function () {
    is_checked = $(this).is(':checked')
    url = $(this).parent().parent()[0].id
    if(is_checked){
    socket.emit("update_record", {"url": url, "key": "viewed", "value": 1})
    }else{
    socket.emit("update_record", {"url": url, "key": "viewed", "value": 0})
    }
});

$(document).on('click', '.mass_viewed_url', function () {
    is_checked = $(this).is(':checked')
    other_checkboxes = $(this).parent().parent().parent().find('.viewed_url')
    $.each( other_checkboxes, function() {
    if(($(this).is(':checked')) != is_checked){
        $(this).click()
    }
    })
});

$(document).on('focusout', '.default_creds', function () {
    creds = $(this).val()
    url = $(this).parent().parent()[0].id
    socket.emit("update_record", {"url": url, "key": "default_creds", "value": creds})
});

$(document).on('focusout', '.mass_default_creds', function () {
    creds = $(this).val()
    other_inputs = $(this).parent().parent().parent().find('.default_creds')
    $.each( other_inputs, function() {
    $(this).val(creds)
    url = $(this).parent().parent()[0].id
    socket.emit("update_record", {"url": url, "key": "default_creds", "value": creds})
    })
});

$(document).on('click', '.auth_prompt', function () {
    is_checked = $(this).is(':checked')
    url = $(this).parent().parent()[0].id
    if(is_checked){
    socket.emit("update_record", {"url": url, "key": "auth_prompt", "value": 1})
    }else{
    socket.emit("update_record", {"url": url, "key": "auth_prompt", "value": 0})
    }
});

$(document).on('click', '.mass_auth_prompt', function () {
    is_checked = $(this).is(':checked')
    other_checkboxes = $(this).parent().parent().parent().find('.auth_prompt')
    $.each( other_checkboxes, function() {
    if(($(this).is(':checked')) != is_checked){
        $(this).click()
    }
    })
});

$(document).on('focusout', '.url_notes', function () {
    notes = $(this).val()
    url = $(this).parent().parent()[0].id
    socket.emit("update_record", {"url": url, "key": "notes", "value": notes})
});

$(document).on('focusout', '.mass_url_notes', function () {
    notes = $(this).val()
    other_inputs = $(this).parent().parent().parent().find('.url_notes')
    $.each( other_inputs, function() {
    $(this).val(notes)
    url = $(this).parent().parent()[0].id
    socket.emit("update_record", {"url": url, "key": "notes", "value": notes})
    })
});

$("#select_file").on('click', function(){
    use_proxy = $('#proxy_checkbox').is(':checked')
    use_no_sandbox = $('#sandbox_checkbox').is(':checked')
    scrape_emails = $('#scrape_emails_checkbox').is(':checked')
    proxy_setting = $('#proxy_input').val()
    delay_setting = $('#delay_input').val()
    // prompt the user for a file path if they press cancel then don't do anything
    file_path = $("#file_path").val()
    if(file_path == null){
    return
    }
    socket.emit('process_file', {"file_path": file_path, "use_proxy": use_proxy, "proxy_setting": proxy_setting, "delay_setting": delay_setting, "scrape_emails": scrape_emails, "use_no_sandbox": use_no_sandbox})
});

$("#pause_scan").on('click', function(){
    socket.emit('pause_scan')
});

$("#resume_scan").on('click', function(){
    use_proxy = $('#proxy_checkbox').is(':checked')
    use_no_sandbox = $('#sandbox_checkbox').is(':checked')
    scrape_emails = $('#scrape_emails_checkbox').is(':checked')
    proxy_setting = $('#proxy_input').val()
    delay_setting = $('#delay_input').val()
    socket.emit('resume_scan', {"use_proxy": use_proxy, "proxy_setting": proxy_setting, "delay_setting": delay_setting, "scrape_emails": scrape_emails, "use_no_sandbox": use_no_sandbox})
});

$("#scan_errors").on('click', function(){
    use_proxy = $('#proxy_checkbox').is(':checked')
    use_no_sandbox = $('#sandbox_checkbox').is(':checked')
    scrape_emails = $('#scrape_emails_checkbox').is(':checked')
    proxy_setting = $('#proxy_input').val()
    delay_setting = $('#delay_input').val()
    socket.emit('scan_errors', {"use_proxy": use_proxy, "proxy_setting": proxy_setting, "delay_setting": delay_setting, "scrape_emails": scrape_emails, "use_no_sandbox": use_no_sandbox})
});

$("#auth_prompts_only").on('click', function(){
    $("#errors").empty()
    $("#report").empty()
    $.getJSON( "/auth_prompts", function( data ) {
    $.each( data, function(key, val ) {
        add_service(val)
    });
    });
});

$("#unviewed_only").on('click', function(){
    $("#errors").empty()
    $("#report").empty()
    $.getJSON( "/unviewed_services", function( data ) {
    $.each( data, function(key, val ) {
        add_service(val)
    });
    });
});

$("#notes_only").on('click', function(){
    $("#errors").empty()
    $("#report").empty()
    $.getJSON( "/notes_services", function( data ) {
    $.each( data, function(key, val ) {
        add_service(val)
    });
    });
});

$("#show_all").on('click', function(){
    location.reload();
});

$("#csv_export").on('click', function(){
    csv_name = prompt("Provide a base name for your results .csv file:")
    socket.emit('csv_export', {"csv_name": csv_name + ".csv"})
});

$("#report_export").on('click', function(){
    zip_name = prompt("Provide a base name for your results .zip file:")
    socket.emit('report_export', {"zip_name": zip_name + ".zip"})
});

$.getJSON( "/all_services", function( data ) {
    $.each( data, function(key, val ) {
    if(val.captured == 1){
        add_service(val)
    }else{
        show_error(val.url)
    }
    });
});