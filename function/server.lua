local Tunnel = module('vrp', 'lib/Tunnel')
local Proxy = module('vrp', 'lib/Proxy')
vRP = Proxy.getInterface('vRP')
vRPclient = Tunnel.getInterface('vRP')

halaberaphone = {}
Tunnel.bindInterface('halabera_phone', halaberaphone)
local cfg = module('halabera_phone', 'config/creditos')

-- ======================================= INSTAGRAM ========================================--
vRP._prepare("vRP/criar_insta_usuario","INSERT INTO halaberaphone_usuarios_instagram(user_id,usuario,verificado) VALUES(@user_id,@usuario,@verificado)")
vRP._prepare("vRP/verificar_insta_usuario","SELECT * FROM halaberaphone_usuarios_instagram WHERE user_id = @user_id")
vRP._prepare("vRP/insta_users","SELECT * FROM halaberaphone_usuarios_instagram")
vRP._prepare("vRP/criar_insta_publicacao","INSERT INTO halaberaphone_feed_instagram(user_id,filtro,legenda,data,usuario,usuariodata,imagem,uuid) VALUES(@user_id,@filtro,@legenda,@data,@usuario,@usuariodata,@imagem,@uuid)")
vRP._prepare("vRP/feed_instagram","SELECT * FROM halaberaphone_feed_instagram ORDER BY data DESC LIMIT 100")
vRP._prepare("vRP/feed_instagram2","SELECT * FROM halaberaphone_feed_instagram WHERE user_id = @user_id ORDER BY data DESC ")
vRP._prepare("vRP/feed_instagram3","SELECT * FROM halaberaphone_feed_instagram WHERE usuario = @usuario ORDER BY data DESC ")
vRP._prepare("vRP/nova_curtida","INSERT INTO halaberaphone_curtidas_instagram(user_id,publicacao,data) VALUES(@user_id,@publicacao,@data)")
vRP._prepare("vRP/novo_comentario","INSERT INTO halaberaphone_comentarios_instagram(user_id,publicacao,data, comentario) VALUES(@user_id,@publicacao,@data, @comentario)")
vRP._prepare("vRP/curtidas_publicacao","SELECT * FROM halaberaphone_curtidas_instagram WHERE publicacao = @publicacao")
vRP._prepare("vRP/pegar_seguidores","SELECT * FROM halabera_seguidores WHERE seguindo = @usuario")
vRP._prepare("vRP/pegar_seguindo","SELECT * FROM halabera_seguidores WHERE seguidor = @usuario")
vRP._prepare("vRP/comentarios_publicacao","SELECT * FROM halaberaphone_comentarios_instagram WHERE publicacao = @publicacao ORDER BY data")
vRP._prepare("vRP/remover_curtida","DELETE FROM halaberaphone_curtidas_instagram WHERE publicacao=@publicacao AND user_id = @user_id")
vRP._prepare("vRP/donodapublicacao","SELECT * FROM halaberaphone_feed_instagram WHERE uuid = @uuid")
vRP._prepare("vRP/novo_seguidor","INSERT INTO halabera_seguidores(seguindo,seguidor) VALUES(@seguindo,@seguidor)")
vRP._prepare("vRP/remover_seguidor","DELETE FROM halabera_seguidores WHERE seguindo=@seguindo AND seguidor = @seguidor")
vRP._prepare("vRP/uparinsta","UPDATE halaberaphone_usuarios_instagram SET avatar=@avatar,bio=@bio WHERE user_id=@user_id")
vRP._prepare("vRP/nova_mensagem","INSERT INTO halaberaphone_mensagens(de,para,mensagem, data) VALUES(@de,@para,@mensagem, @data)")
vRP._prepare("vRP/listar_conversas","SELECT * FROM halaberaphone_mensagens  WHERE de = @de")
vRP._prepare("vRP/listar_conversas2","SELECT * FROM halaberaphone_mensagens  WHERE para = @para")
vRP._prepare("vRP/listar_contatos2","SELECT * FROM halaberaphone_contatos WHERE id = @user_id")
vRP.prepare("vRP/get_userbyphone2","SELECT user_id FROM vrp_user_identities WHERE telefone = @telefone")

function halaberaphone.listarconversas()
    local source = source
    local user_id = vRP.getUserId(source)
    local identidade = vRP.getUserIdentity(user_id)
    local numero = identidade.telefone
	local query = vRP.query("vRP/listar_conversas", {de = numero})
    local query2 = vRP.query("vRP/listar_conversas2", {para = numero})
    local query3 = vRP.query("vRP/listar_contatos2", {user_id = user_id})
	return query, query2, query3
end

function halaberaphone.novamensagem(data2)
    local source = source
    local user_id = vRP.getUserId(source)
    local identidade = vRP.getUserIdentity(user_id)
    local numero = identidade.telefone
    local user2 = vRP.query("vRP/get_userbyphone2", {telefone = data2.contato})
    if user2 then
        local us2
        for k,v in pairs(user2) do
            us2 = v.user_id
        end

        local sourceDonodapublicacao = vRP.getUserSource(parseInt(us2))
        if sourceDonodapublicacao then
            TriggerClientEvent('Notify', sourceDonodapublicacao, 'sucesso', 'Você recebeu uma nova mensagem.')
        end

        vRP.execute("vRP/nova_mensagem", {de = numero, para = data2.contato,mensagem = data2.mensagem,data=data2.data })
    end

	
end
function halaberaphone.uparperfil(data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/uparinsta", {user_id = user_id, avatar = data.foto,  bio = data.bio})
end
function halaberaphone.deixarseguir(data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/remover_seguidor", {seguindo = data.seguindo, seguidor = data.seguidor})
end
function halaberaphone.seguir(data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/novo_seguidor", {seguindo = data.seguindo, seguidor = data.seguidor})
end
function halaberaphone.getfeedpessoal2(uuid)
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/feed_instagram3", {usuario = uuid})
    for k,v in pairs(query) do
        -- Pegar user atualizado
        local usuarioatualizado = vRP.query("vRP/verificar_insta_usuario", {user_id = v.user_id})
        query[k]['usuarioatualizado'] = usuarioatualizado

        -- Pegar curtidas
        local curtidas = vRP.query("vRP/curtidas_publicacao", {publicacao = v.uuid})
        -- query[k]['curtidas'] = curtidas
        for kk,vv in pairs(curtidas) do
            local usuarioatualizadoc = vRP.query("vRP/verificar_insta_usuario", {user_id = vv.user_id})
            curtidas[kk]['usuario'] = usuarioatualizadoc
        end
        query[k]['curtidas'] = curtidas

        -- Pegar seguidores
        local seguidores = vRP.query("vRP/pegar_seguidores", {usuario =  uuid})
        query[k]['seguidores'] = seguidores

        -- Pegar seguindo
        local seguindo = vRP.query("vRP/pegar_seguindo", {usuario = uuid})
        query[k]['seguindo'] = seguindo

         -- Pegar comentarios
         local comentarios = vRP.query("vRP/comentarios_publicacao", {publicacao = v.uuid})
         for k2,v2 in pairs(comentarios) do
            local comentariouseratualizado = vRP.query("vRP/verificar_insta_usuario", {user_id = v2.user_id})
            v2['useratualizado'] = comentariouseratualizado
         end
         query[k]['comentarios'] = comentarios

    end
	return query
end
function halaberaphone.getfeedpessoal(uuid)
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/feed_instagram2", {user_id = user_id})
    for k,v in pairs(query) do
        -- Pegar user atualizado
        local usuarioatualizado = vRP.query("vRP/verificar_insta_usuario", {user_id = v.user_id})
        query[k]['usuarioatualizado'] = usuarioatualizado

        -- Pegar curtidas
        local curtidas = vRP.query("vRP/curtidas_publicacao", {publicacao = v.uuid})
        -- query[k]['curtidas'] = curtidas
        for kk,vv in pairs(curtidas) do
            local usuarioatualizadoc = vRP.query("vRP/verificar_insta_usuario", {user_id = vv.user_id})
            curtidas[kk]['usuario'] = usuarioatualizadoc
        end
        query[k]['curtidas'] = curtidas

            -- Pegar seguidores
            local seguidores = vRP.query("vRP/pegar_seguidores", {usuario =  uuid})
            query[k]['seguidores'] = seguidores
    
            -- Pegar seguindo
            local seguindo = vRP.query("vRP/pegar_seguindo", {usuario = uuid})
            query[k]['seguindo'] = seguindo

         -- Pegar comentarios
         local comentarios = vRP.query("vRP/comentarios_publicacao", {publicacao = v.uuid})
         for k2,v2 in pairs(comentarios) do
            local comentariouseratualizado = vRP.query("vRP/verificar_insta_usuario", {user_id = v2.user_id})
            v2['useratualizado'] = comentariouseratualizado
         end
         query[k]['comentarios'] = comentarios

    end
	return query
end
function halaberaphone.getfeed()
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/feed_instagram")
    for k,v in pairs(query) do
        -- Pegar user atualizado
        local usuarioatualizado = vRP.query("vRP/verificar_insta_usuario", {user_id = v.user_id})
        query[k]['usuarioatualizado'] = usuarioatualizado

        -- Pegar curtidas
        local curtidas = vRP.query("vRP/curtidas_publicacao", {publicacao = v.uuid})
        -- query[k]['curtidas'] = curtidas
        for kk,vv in pairs(curtidas) do
            local usuarioatualizadoc = vRP.query("vRP/verificar_insta_usuario", {user_id = vv.user_id})
            curtidas[kk]['usuario'] = usuarioatualizadoc
        end
        query[k]['curtidas'] = curtidas

         -- Pegar comentarios
         local comentarios = vRP.query("vRP/comentarios_publicacao", {publicacao = v.uuid})
         for k2,v2 in pairs(comentarios) do
            local comentariouseratualizado = vRP.query("vRP/verificar_insta_usuario", {user_id = v2.user_id})
            v2['useratualizado'] = comentariouseratualizado
         end
         query[k]['comentarios'] = comentarios

    end
	return query
end
function halaberaphone.instacadastarusuario(usuario)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/criar_insta_usuario", {user_id = user_id, usuario = usuario, verificado = 0})
end
function halaberaphone.verificarusuarioinsta()
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/verificar_insta_usuario", {user_id = user_id})
	return query
end
function halaberaphone.todosusuarios()
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/insta_users")
	return query
end
function halaberaphone.publicarinstagram(data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/criar_insta_publicacao", {user_id = user_id, filtro = data.filtro,legenda = data.legenda,usuario = data.usuario, data=data.data,usuariodata = data.usuariodata, imagem = data.imagem, uuid= data.uuid })
end
function halaberaphone.novacurtida(uuid,data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/nova_curtida", {user_id = user_id, publicacao = uuid, data = data})

    -- Notificar dono da publicação sobre a nova curtida
    local publi = vRP.query("vRP/donodapublicacao", {uuid = uuid})
    local publicacao = publi[1]
    local sourceDonodapublicacao = vRP.getUserSource(publicacao.user_id)
    TriggerClientEvent('Notify', sourceDonodapublicacao, 'sucesso', 'Você recebeu uma nova curtida.')

end
function halaberaphone.novocomentario(data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/novo_comentario", {user_id = user_id, publicacao = data.publicacao, data = data.data, comentario = data.comentario})

    -- Notificar dono da publicação sobre a nova curtida
    local publi = vRP.query("vRP/donodapublicacao", {uuid = uuid})
    local publicacao = publi[1]
    local sourceDonodapublicacao = vRP.getUserSource(publicacao.user_id)
    TriggerClientEvent('Notify', sourceDonodapublicacao, 'sucesso', 'Você recebeu um novo comentário.')
end
function halaberaphone.removercurtida(uuid)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/remover_curtida", {publicacao = uuid, user_id = user_id})
end
-- ======================================= CAMERA/GALERIA ========================================--
vRP._prepare("vRP/criar_galeria","INSERT INTO halaberaphone_galeria(user_id,image,data,uuid) VALUES(@user_id,@image,@data,@uuid)")
vRP._prepare("vRP/listar_galeria","SELECT * FROM halaberaphone_galeria WHERE user_id = @user_id ORDER BY data DESC")
vRP._prepare("vRP/excluir_imagem","DELETE FROM halaberaphone_galeria WHERE uuid=@uuid AND user_id = @user_id")
function halaberaphone.adicionargaleria(url, fotodate, uuid)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/criar_galeria", {user_id = user_id,image = url, data = fotodate, uuid = uuid})
end
function halaberaphone.listargaleria()
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/listar_galeria", {user_id = user_id})
	return query
end
function halaberaphone.apagarimagem(img)
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/excluir_imagem", {uuid = img, user_id = user_id})
	return query
end

-- ======================================= NOTAS ========================================--
vRP._prepare("vRP/criar_nota","INSERT INTO halaberaphone_notas(user_id,titulo,nota,uuid,data) VALUES(@user_id,@titulo,@nota,@uuid,@data)")
vRP._prepare("vRP/atualizar_nota","UPDATE halaberaphone_notas SET titulo=@titulo,nota=@nota,data=@data WHERE uuid=@uuid AND user_id=@user_id")
vRP._prepare("vRP/listar_notas","SELECT * FROM halaberaphone_notas WHERE user_id = @user_id ORDER BY data DESC")
vRP._prepare("vRP/excluir_nota","DELETE FROM halaberaphone_notas WHERE uuid=@uuid AND user_id=@user_id;")
vRP._prepare("vRP/detalhes_nota","SELECT * FROM halaberaphone_notas WHERE uuid=@uuid AND user_id=@user_id")
function halaberaphone.cadastrarNota(titulo, nota, uuid, data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/criar_nota", {user_id = user_id, titulo = titulo, nota = nota, uuid= uuid, data = data})
end
function halaberaphone.atualizarnota(titulo, nota, uuid, data)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/atualizar_nota", {user_id = user_id, titulo = titulo, nota = nota, uuid= uuid, data = data})
end
function halaberaphone.listarnotas()
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/listar_notas", {user_id = user_id})
	return query
end
function halaberaphone.excluirnota(uuid)
    local source = source
    local user_id = vRP.getUserId(source)
    vRP.execute("vRP/excluir_nota", {user_id = user_id, uuid = uuid})
end
function halaberaphone.detalhesnota(uuid)
    local source = source
    local user_id = vRP.getUserId(source)
    local query = vRP.query("vRP/detalhes_nota", {user_id = user_id, uuid = uuid})
    return query
end

-- ======================================= CONTATOS ========================================--
vRP._prepare("vRP/criar_contato","INSERT INTO halaberaphone_contatos(id,nome,numero) VALUES(@id,@nome,@numero)")
vRP._prepare("vRP/listar_contatos","SELECT * FROM halaberaphone_contatos WHERE id = @user_id")
vRP._prepare("vRP/excluir_contato","DELETE FROM halaberaphone_contatos WHERE numero=@numero AND id=@id;")
function halaberaphone.cadastrarContato(nome, numero)
    local source = source
    local user_id = vRP.getUserId(source)
	vRP.execute("vRP/criar_contato", {id = user_id, nome = nome, numero = numero})
	-- local query = vRP.query("vRP/listar_contatos", {user_id = user_id})
	-- local usuario = query[1]
end

function halaberaphone.listarcontatos()
    local source = source
    local user_id = vRP.getUserId(source)
	local query = vRP.query("vRP/listar_contatos", {user_id = user_id})
	return query
end

function halaberaphone.excluircontato(numero)
    local source = source
    local user_id = vRP.getUserId(source)
    vRP.execute("vRP/excluir_contato", {id = user_id, numero = numero})
end

function halaberaphone.checkCelular()
    local source = source
    local user_id = vRP.getUserId(source)
    local player = vRP.getUserSource(user_id)
    if vRP.getInventoryItemAmount(user_id, cfg.item_necessario) >= 1 then
        return true
    else
        TriggerClientEvent('Notify', source, 'negado', 'Você não tem ' .. cfg.item_necessario)
        return false
    end
end
