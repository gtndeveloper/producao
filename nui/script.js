var resource;

function ActionNUI(act, postOptions, post, dom) {
    switch (act) {
        case 'close':
            $(dom).fadeOut()
            if (postOptions == true) {
                resource = resource = $('body').attr('resource')
                $.post(`https://${resource}/${post}`)
            }
            break;
        case 'show':
            $(dom).fadeIn(100)
            break

        default:
            break;
    }
}

function logAppend(data) {
    const Hour = new Date().getHours() + ':' + new Date().getMinutes();
    const html = 
    `
        <div class = 'squareLog'>
            <p>${data.nome}</p>
            <div class = 'endElements'>
                <p>${data.qtd}</p>
                <p>${Hour}</p>
            </div>
        </div>
    `
    $( html ).appendTo(' .mainLog ')
}

window.addEventListener('message',({data}) => {
    if (data.Open) {
        ActionNUI('show', false, false, 'main') 
        gtn.Anim('.square',250)
    }
    if (data.dataLog != undefined) {
        logAppend(data.dataLog)
    }
    gtn.ReceberCallbackAdicionarAtributo(data.resource,'body')
})

$(document).on('keyup',(event) => {
    if (event.which == 27) {
        ActionNUI('close', true, 'close', 'main') 
    }
})

$.getJSON('./components/config/config.json',data => {
    $('.title img').attr('src', data.logo != undefined ? data.logo :  ' ./components/imgs/logo.png '  )
    for (i = 0; i < data.products.length; i++) {
        const html = 
        `
            <div class =  ' square ' >
                <p>
                    ${data.products[i].name}
                </p>

                <img 
                    src =  ' ${data.products[i].img} '  
                />
                
                <img 
                    src =  ' ./components/imgs/seta.svg '  
                    class =  ' seta ' 
                />

                <button onClick = "buy( this )" itemSpawn= ' ${data.products[i].itemSpawn} '  qtdSpawn= ' ${data.products[i].qtdSpawn} ' >
                    PRODUZIR
                </button>
            </div>            
        `
        $( ' .Flex ' ).append(html)
    }
})

const buy = (data) => {
    resource = resource = $(' body ').attr('resource')
    $.post(
        `https://${resource}/buy`,
        JSON.stringify({
            item: $(data).attr('itemSpawn'),
            quantidade: $(data).attr('qtdSpawn')
        })
    )
}