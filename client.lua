local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
local gtn = Tunnel.getInterface("vrp_producao")

local config = module('vrp_producao','config')

local Open = false
function ToggleActionMenu(dom)
	Open = not Open
	if Open then
		SetNuiFocus(true,true)
		SendNUIMessage({ Open = dom, resource = GetCurrentResourceName()})
	else
		SetNuiFocus(false)
		SendNUIMessage({ Open = false, resource = GetCurrentResourceName() })
	end
end

RegisterNUICallback("close",function ()
    Open = false
    SetNuiFocus(false)
    SendNUIMessage({ Open = false })
end)

RegisterCommand("produzir",function (source)
    local group = ""
    if gtn.checkGroup then
        group = gtn.checkGroup()
        local ped = PlayerPedId()
        local cds = GetEntityCoords( ped )
        local distance = #(  vector3(config.producao[group].x,config.producao[group].y,config.producao[group].z)  - cds )
        if distance <= 5 then
            if group == "vagos.permissao" then
                ToggleActionMenu("vagos")
            elseif group == "ballas.permissao" then
                ToggleActionMenu("ballas")
            elseif group == "groove.permissao" then
                ToggleActionMenu("groove")
            end
        end
    end
end)