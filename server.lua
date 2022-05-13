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
    print('Permissões checadas, jogador sem permissão')
    return false
end