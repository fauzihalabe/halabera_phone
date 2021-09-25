local Tunnel = module('vrp', 'lib/Tunnel')
local Proxy = module('vrp', 'lib/Proxy')
vRP = Proxy.getInterface('vRP')

vRPclient = Tunnel.getInterface('vRP')
halaberaphone = Tunnel.getInterface('halabera_phone')

local display = false
local foto = false
local fotodate 
local uuid
local type
-- ======================================= GALERIA ========================================--
RegisterNUICallback(
    'listargaleria',
    function(data)
        local query = halaberaphone.listargaleria()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'listargaleria',
                query = query
            }
        )
    end
)
RegisterNUICallback(
    'apagarimagem',
    function(data)
        local query = halaberaphone.apagarimagem(data.imagem)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'apagarimagem',
                query = query
            }
        )
    end
)
RegisterNUICallback(
    'publicarinstagram',
    function(data)
        halaberaphone.publicarinstagram(data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'publicacaoinstagram'
            }
        )
    end
)
RegisterNUICallback(
    'getfeed',
    function(data)
        local feed = halaberaphone.getfeed()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'feedinstagram',
                feed = feed
            }
        )
    end
)


-- ======================================= CÂMERA ========================================--
frontCam = false
function CellFrontCamActivate(activate)
	return Citizen.InvokeNative(0x2491A93618B7D838, activate)
end


Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(1)
            if IsControlJustPressed(0, 27) then -- Insert
                if foto then
                   
                    if frontCam then
                        frontCam = false
                        CellFrontCamActivate(frontCam)
                    else
                        frontCam = true
                        CellFrontCamActivate(frontCam)
                    end
                    
                end
            end
        end
    end
)


RegisterNUICallback(
    'tirarfoto',
    function(data)
        CreateMobilePhone(1)
        CellCamActivate(true, true)
        CellFrontCamActivate(false)
        SetNuiFocus(true, false)
        foto = true
        fotodate = data.data
        uuid = data.uuid
        type = 'galeria'
    end
)
RegisterNUICallback(
    'resetarcamera',
    function(data)
        DestroyMobilePhone()
        CellCamActivate(false, false)
        -- SetFollowPedCamViewMode(1)
        SetNuiFocus(true, true)
    end
)
Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(1)
            if IsControlJustPressed(0, 18) then -- Botao esquerdo do mouse
                if foto then
                    foto = false
                    exports['screenshot-basic']:requestScreenshotUpload('https://discord.com/api/webhooks/852400104728035338/bF8Zaca8mQGyEKvM8G6JHbxiLyVCXxD6OgixH4okUFQ79bK-vkfcKTlbIrB0CgY6EEW5', 'file',
                        function(data)
                            local image = json.decode(data)
                            local url = image.attachments[1].proxy_url 
                            SetFollowPedCamViewMode(1)
                            SetNuiFocus(true, true)

                            if type == 'galeria' then
                                halaberaphone.adicionargaleria(url, fotodate, uuid) 
                                SendNUIMessage(
                                    {
                                        type = 'acao',
                                        executar = 'resetarphone'
                                    }
                                )
                            elseif type == 'instagram2' then
                                SendNUIMessage(
                                    {
                                        type = 'acao',
                                        executar = 'uparperfil',
                                        url = url
                                    }
                                )
                            elseif type == 'instagram' then
                                SendNUIMessage(
                                    {
                                        type = 'acao',
                                        executar = 'callbackfotoinsta',
                                        url = url
                                    }
                                )
                            
                            end
                            
                        end
                    )                   
                end
            end
        end
    end
)

-- ======================================= INSTAGRAM ========================================--

RegisterNUICallback(
    'uparperfil',
    function(data)
        halaberaphone.uparperfil(data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = ''
            }
        )
    end
)
RegisterNUICallback(
    'novocomentario_instagram',
    function(data)
        halaberaphone.novocomentario(data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = ''
            }
        )
    end
)
RegisterNUICallback(
    'novacurtida_instagram',
    function(data)
        halaberaphone.novacurtida(data.uuid, data.data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = ''
            }
        )
    end
)
RegisterNUICallback(
    'removercurtida_instagram',
    function(data)
        halaberaphone.removercurtida(data.uuid)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = ''
            }
        )
    end
)

RegisterNUICallback(
    'deixarseguir',
    function(data)
        local posts = halaberaphone.deixarseguir(data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                -- executar = 'feedpessoal2',
                feed = posts
            }
        )
    end
)
RegisterNUICallback(
    'seguir',
    function(data)
        local posts = halaberaphone.seguir(data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                -- executar = 'feedpessoal2',
                feed = posts
            }
        )
    end
)
RegisterNUICallback(
    'feeddetalhado',
    function(data)
        local posts = halaberaphone.getfeedpessoal2(data.uuid)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'feedpessoal2',
                feed = posts
            }
        )
    end
)
RegisterNUICallback(
    'getfeedpessoal',
    function(data)
        local posts = halaberaphone.getfeedpessoal(data.uuid)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'feedpessoal',
                feed = posts
            }
        )
    end
)

RegisterNUICallback(
    'tirarfotoperfil',
    function(data)
        CreateMobilePhone(1)
        CellCamActivate(true, true)
        CellFrontCamActivate(false)
        SetNuiFocus(true, false)
        foto = true
        type = 'instagram2'
    end
)
RegisterNUICallback(
    'novafotoinsta',
    function(data)
        CreateMobilePhone(1)
        CellCamActivate(true, true)
        CellFrontCamActivate(false)
        SetNuiFocus(true, false)
        foto = true
        type = 'instagram'
    end
)
RegisterNUICallback(
    'novousuarioinsta',
    function(data)
        halaberaphone.instacadastarusuario(data.usuario)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'cadastrousuarioinstaconcluido'
            }
        )
    end
)
RegisterNUICallback(
    'verificarusuarioinsta',
    function()
        local usuarios = halaberaphone.verificarusuarioinsta()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'verificarusuarioinsta',
                usuarios = usuarios
            }
        )
    end
)
RegisterNUICallback(
    'todosusuarios',
    function()
        local usuarios = halaberaphone.todosusuarios()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'todosusuarios',
                usuarios = usuarios
            }
        )
    end
)
-- ======================================= NOTAS ========================================--
RegisterNUICallback(
    'novanota',
    function(data)
        halaberaphone.cadastrarNota(data.titulo, data.nota, data.uuid, data.data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'cadastronotaconcluido'
            }
        )
    end
)
RegisterNUICallback(
    'atualizarnota',
    function(data)
        halaberaphone.atualizarnota(data.titulo, data.nota, data.uuid, data.data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'cadastronotaconcluido'
            }
        )
    end
)
RegisterNUICallback(
    'listarnotas',
    function(data)
        local query = halaberaphone.listarnotas()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'listarnotas',
                query = query
            }
        )
    end
)
RegisterNUICallback(
    'excluirnota',
    function(data)
        halaberaphone.excluirnota(data.uuid)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'excluirnota'
            }
        )
    end
)
RegisterNUICallback(
    'detalhesnota',
    function(data)
        local query = halaberaphone.detalhesnota(data.uuid)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'detalhesnota',
                query = query
            }
        )
    end
)

-- ======================================= CONTATOS ========================================--

RegisterNUICallback(
    'listarconversas',
    function()
       local conversasde, conversaspara, query3 = halaberaphone.listarconversas()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'listarconversas',
                de = conversasde,
                para = conversaspara,
                contatos = query3
            }
        )
    end
)
RegisterNUICallback(
    'novamensagem',
    function(data)
        halaberaphone.novamensagem(data)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = ''
            }
        )
    end
)
RegisterNUICallback(
    'novocontato',
    function(data)
        halaberaphone.cadastrarContato(data.nome, data.numero)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'cadastrocontatoconcluido'
            }
        )
    end
)
RegisterNUICallback(
    'listarcontatos',
    function(data)
        query = halaberaphone.listarcontatos()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'listarcontatos',
                query = query
            }
        )
    end
)
RegisterNUICallback(
    'listarcontatoszap',
    function(data)
        query = halaberaphone.listarcontatos()

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'listarcontatoszap',
                query = query
            }
        )
    end
)
RegisterNUICallback(
    'excluircontato',
    function(data)
        halaberaphone.excluircontato(data.numero)

        -- Enviar mensagem de sucesso
        SendNUIMessage(
            {
                type = 'acao',
                executar = 'excluircontato'
            }
        )
    end
)

Citizen.CreateThread(
    function()
        SetNuiFocus(false, false)
        while true do
            Citizen.Wait(1)
            if IsControlJustPressed(0, 311) then -- K
                if halaberaphone.checkCelular() then
                    vRP._CarregarObjeto(
                        'anim@cellphone@in_car@ds',
                        'cellphone_text_read_base',
                        'prop_amb_phone',
                        50,
                        28422
                    )
                    
                    SetDisplay(not display)

                    -- SendNUIMessage(
                    --     {
                    --         type = 'acao',
                    --         executar = 'resetarphone'
                    --     }
                    -- )
                end
            end
        end
    end
)


-- RegisterCommand(
--     'celular',
--     function(source)
--         vRP._CarregarObjeto(
--             'anim@cellphone@in_car@ds',
--             'cellphone_text_read_base',
--             'prop_amb_phone',
--             50,
--             28422
--         )
--     end
-- )
-- RegisterCommand(
--     'celular2',
--     function(source)
--         SetDisplay(false)
--         vRP._stopAnim(false)
--         vRP._DeletarObjeto()
        
--     end
-- )

RegisterNUICallback(
    'exit',
    function(data)
        SetDisplay(false)
        vRP._stopAnim(false)
        vRP._DeletarObjeto()
    end
)

RegisterNUICallback(
    'error',
    function(data)
        SetDisplay(false)
        vRP._stopAnim(false)
        vRP._DeletarObjeto()
        TriggerEvent('Notify', 'negado', 'Algo deu errado')
    end
)

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage(
        {
            type = 'ui',
            status = bool
        }
    )
end

Citizen.CreateThread(
    function()
        while display do
            Citizen.Wait(0)
            DisableControlAction(0, 1, display) -- LookLeftRight
            DisableControlAction(0, 2, display) -- LookUpDown
            DisableControlAction(0, 142, display) -- MeleeAttackAlternate
            DisableControlAction(0, 18, display) -- Enter
            DisableControlAction(0, 322, display) -- ESC
            DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
        end
    end
)
