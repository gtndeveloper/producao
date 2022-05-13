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

function actNui(dom) {
    gtn.Anim('.square', 250)
    $("main").hide()
    $(dom).fadeIn()
}

function GetJSON(domJSON,mainAppend) {
    $('.square').remove()
    $.getJSON('./components/config/config.json', data => {
        $('.title img').attr('src', data.logo != undefined ? data.logo : ' ./components/imgs/logo.png ')
        for (i = 0; i < data[domJSON].length; i++) {
            const html =
                `
            <div class =  ' square ' >
                <p>
                    ${data[domJSON][i].name}
                </p>

                <img 
                    src =  ' ${data[domJSON][i].img} '  
                />
                
                <img 
                    src =  ' ./components/imgs/seta.svg '  
                    class =  ' seta ' 
                />

                <button onClick = "buy( this )" itemSpawn= ' ${data[domJSON][i].itemSpawn} '  qtdSpawn= ' ${data[domJSON][i].qtdSpawn} ' >
                    PRODUZIR
                </button>
            </div>            
        `
            $(`${mainAppend} .Flex `).append(html)
        }
    })
}

window.addEventListener('message',({data}) => {
    switch (data.Open) {
        case "ballas":
                actNui("#ballas")
                GetJSON("ballas","#ballas")
            break;
        case "vagos":
                actNui("#vagos")
                GetJSON("vagos", "#vagos")
            break;
            case "groove":
                actNui("#groove")
                GetJSON("groove", "#groove")
            break;
    
        default:
            break;
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