local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

local Open = false
function ToggleActionMenu()
	open = not open
	if open then
		SetNuiFocus(true,true)
		SendNUIMessage({ Open = true })
	else
		SetNuiFocus(false)
		SendNUIMessage({ Open = false })
	end
end