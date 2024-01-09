function show_error(url){
    //don't repeat on rescans
    if((typeof $("a[href$='" + url + "']")[0]) == 'undefined'){
    $('#errors').append(` \
        <tr id="${url}">\
        <td><span>Error Capturing: </span><a class="url_link" target="_blank" href="${url}">${url}</a></td>\
        </tr>\
    `);
    }
}

function add_service(service){
    if(service.default_creds == 1){
    default_creds = "checked"
    }else{
    default_creds = ""
    }

    if(service.viewed == 1){
    viewed = "checked"
    }else{
    viewed = ""
    }

    if(service.auth_prompt == 1){
        auth_prompt = "checked"
    } else {
     auth_prompt = ""
    }
    //remove it from the error list if it was there before
    if((typeof $("a[href$='" + service.url + "']")[0]) != 'undefined'){
    $("a[href$='" + service.url + "']")[0].remove()
    }

    //if it has the exact image as another service
    if($(`#image_${service.image_hash}`).length > 0){
        peer_count = $($($(`#image_${service.image_hash}`)[0]).next('table')[0]).children().length
        if(peer_count == 1){
        $($($(`#image_${service.image_hash}`)[0]).next('table')[0]).prepend(` \
            <tr>\
            <td align="right">Modify All</td>\
            <td align="right"><input type="text" class="mass_url_notes"></input></td>\
            <td align="right"><input type="text" class="mass_default_creds"></input></td>\
            <td align="right"><input type="checkbox" class="mass_auth_prompt"></input></td>\
            <td align="right"><input type="checkbox" class="mass_viewed_url"></input></td>\
            </tr>\
        `);
        }
        $($($(`#image_${service.image_hash}`)[0]).next('table')[0]).append(` \
        <tr id="${service.url}">\
            <td><a class="url_link" target="_blank" href="${service.url}">${service.url}</a></td>\
            <td><span>notes:</span><input type="text" class="url_notes" value="${service.notes}"></input></td>\
            <td><span>weak creds:</span><input type="text" class="default_creds" value="${service.default_creds}"></input></td>\
            <td><span>auth prompt:</span><input type="checkbox" class="auth_prompt" ${auth_prompt}></input></td>\
            <td><span>viewed:</span><input type="checkbox" class="viewed_url" ${viewed}></input></td>\
        </tr>\
    `);
    //else if it also doesn't have the same html then it is unique
    } else if($(`#${service.text_hash}`).length == 0){
    $("#report").append(` \
        <div id="service_${service.text_hash}">\
        <img id="image_${service.image_hash}" src="${service.image_path}"></img>\
        <table id="${service.text_hash}">\
            <tr id="${service.url}">\
            <td><a class="url_link" target="_blank" href="${service.url}">${service.url}</a></td>\
            <td><span>notes:</span><input type="text" class="url_notes" value="${service.notes}"></input></td>\
            <td><span>weak creds:</span><input type="text" class="default_creds" value="${service.default_creds}"></input></td>\
            <td><span>auth prompt:</span><input type="checkbox" class="auth_prompt" ${auth_prompt}></input></td>\
            <td><span>viewed:</span><input type="checkbox" class="viewed_url" ${viewed}></input></td>\
            </tr>\
        </table>\
        </div>\
    `);
    //otherwise it is not unique based on having the exact same html as another service
    } else {
    peer_count = $(`#${service.text_hash}`).children().length
    if(peer_count == 1){
        $(`#${service.text_hash}`).prepend(` \
        <tr>\
            <td align="right">Modify All</td>\
            <td align="right"><input type="text" class="mass_url_notes"></input></td>\
            <td align="right"><input type="text" class="mass_default_creds"></input></td>\
            <td align="right"><input type="checkbox" class="mass_auth_prompt"></input></td>\
            <td align="right"><input type="checkbox" class="mass_viewed_url"></input></td>\
        </tr>\
        `);
    }
    $(`#${service.text_hash}`).append(` \
        <tr id="${service.url}">\
            <td><a class="url_link" target="_blank" href="${service.url}">${service.url}</a></td>\
            <td><span>notes:</span><input type="text" class="url_notes" value="${service.notes}"></input></td>\
            <td><span>weak creds:</span><input type="text" class="default_creds" value="${service.default_creds}"></input></td>\
            <td><span>auth prompt:</span><input type="checkbox" class="auth_prompt" ${auth_prompt}></input></td>\
            <td><span>viewed:</span><input type="checkbox" class="viewed_url" ${viewed}></input></td>\
        </tr>\
    `);
    }
}