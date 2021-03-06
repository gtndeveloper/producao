local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
local gtn = {}
Tunnel.bindInterface("vrp_producao",gtn)

local permissions = {
    { perm = "vagos.permissao" },
    { perm = "groove.permissao" },
    { perm = "ballas.permissao" }
}

function gtn.checkGroup()
    local source = source
    local user_id = vRP.getUserId(source)
    for i=1, #permissions do
        local check = permissions[i]
        if vRP.hasPermission(user_id, check.perm) then
            print('Checando permissão: '..check.perm)
            return check.perm
        end
    end
    TriggerClientEvent("Notify",source,"aviso","Você não tem permissão")
    return false
end

function gtn.buy(item,quantidade,qtdRem,ItemRem)
    local source = source
    local userid = vRP.getUserId(source)
    if vRP.getInventoryWeight(userid)+vRP.getInventoryItemAmount(userid,item) < vRP.getInventoryMaxWeight(userid) then
        if vRP.tryGetInventoryItem(userid,ItemRem,qtdRem) then
            TriggerClientEvent("progress",source,10000)
            vRPclient._playAnim(source,false,{{"amb@prop_human_parking_meter@female@idle_a","idle_a_female"}},true)

            SetTimeout(10000,function()
                vRPclient._stopAnim(source,false)
                vRP.giveInventoryItem(userid,item,quantidade)
                TriggerClientEvent("Notify",source,"sucesso","Você produziu <b> "..item.." </b>.")
            end)
        else
            TriggerClientEvent("Notify",source,"aviso",ItemRem.." insuficiente")
        end
    else 
        TriggerClientEvent("Notify",source,"aviso","Espaço na mochila insuficiente")
    end
end