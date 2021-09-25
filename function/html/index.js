
$(function () {
    $(document).ready(function () {
        //Mascarar inputs
        $("#c-numero").mask("999-999");
    });

    // //Cadastrar
    // $("#btncadastrar").click(function () {
    //     let nome = $("#inputnome").val();
    //     $.post('http://halabera_phone/cadastrar', JSON.stringify({
    //         nome: nome
    //     }));
    // })
});

//Display
function display(bool) {
    if (bool) {
        $("#container").show();
        fechartudo();
        document.getElementsByClassName('page-home')[0].classList.remove('none');
    } else {
        setTimeout(() => {
            $("#container").hide();
        }, 0)
    }
}
display(false)
// display(true)



//Escutador
var nota_detalhes_uuid = "";
var urlinstagram = "";
var usuarioinstagram;
var publicacaoselecionada = ""
var todosusuariosinsta = []
var usuariosdetalhesselecionado = "";
var abriucomentariosdoperfil = false;
var novafoto = "";
var contatoselecionado = ""
var contatoszap = []
var mensagensquemandei = []
var mensagensquemandaram = []
window.addEventListener('message', function (event) {
    var item = event.data;
    if (item.type === "ui") {
        if (item.status == true) {
            display(true)
        } else {
            document.getElementById('muted').src = ""
            display(false)
        }
    }
    if (item.type === "acao") {
        //Contatos
        if (item.executar == 'cadastrocontatoconcluido') {
            resetarcontatos()
        }
        if (item.executar == 'listarcontatos') {
            carregarcontatos(item)
        }
        if (item.executar == 'listarcontatoszap') {
            carregarcontatoszap(item)
        }

        if (item.executar == 'excluircontato') {
            resetarcontatos()
        }
        //Notas
        if (item.executar == 'cadastronotaconcluido') {
            resetarnotas()
        }
        if (item.executar == 'listarnotas') {
            carregarnotas(item)
        }
        if (item.executar == 'excluirnota') {
            resetarnotas()
        }
        if (item.executar == 'detalhesnota') {
            //Atribuir valor retornado
            nota_detalhes_uuid = item.query[0].uuid;
            document.getElementById('n-titulo-edit').value = item.query[0].titulo
            document.getElementById('n-nota-edit').value = item.query[0].nota
        }
        //Celular
        if (item.executar == 'resetarphone') {
            resetphone()
        }
        //Galeria
        if (item.executar == 'listargaleria') {
            carregargaleria(item)
        }
        if (item.executar == 'apagarimagem') {
            restartgaleria()
        }
        //Instagram
        if (item.executar == 'cadastrousuarioinstaconcluido') {
            document.getElementById('instagram-cadastro').classList.add('none')
            document.getElementById('instagram-feed').classList.remove('none')
            feedinsta()
        }
        if (item.executar == 'verificarusuarioinsta') {
            if (item.usuarios.length > 0) {
                usuarioinstagram = item.usuarios[0]
                if (!usuarioinstagram.avatar) {
                    usuarioinstagram.avatar = "https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm"
                }
                document.getElementById('instagram-cadastro').classList.add('none')
                document.getElementById('instagram-feed').classList.remove('none')
                imageavatarbottommenuinstagram()
            }
        }
        if (item.executar == 'callbackfotoinsta') {
            resetphone()
            urlinstagram = item.url
            document.getElementById('instagram-feed').classList.add('none')
            document.getElementById('instagram-preview').classList.remove('none')
            document.getElementById('img-preview').src = urlinstagram

            //Adicionar filtros
            document.getElementById('resetarfiltros').src = urlinstagram
            document.getElementById('filtro1').src = urlinstagram
            document.getElementById('filtro2').src = urlinstagram
            document.getElementById('filtro3').src = urlinstagram
            document.getElementById('filtro4').src = urlinstagram
            document.getElementById('filtro5').src = urlinstagram
            document.getElementById('filtro6').src = urlinstagram
        }
        if (item.executar == 'publicacaoinstagram') {
            document.getElementById('instagram-cadastro').classList.add('none');
            document.getElementById('instagram-legenda').classList.add('none');
            document.getElementById('instagram-preview').classList.add('none');
            document.getElementById('instagram-comentarios').classList.add('none');
            document.getElementById('instagram-feed').classList.remove('none');
            feedinsta()
        }
        if (item.executar == 'feedinstagram') {
            feedinstamontar(item.feed)
        }
        if (item.executar == 'todosusuarios') {
            todosusuariosinsta = item.usuarios
        }
        if (item.executar == 'feedpessoal') {
            feedinstamontar2(item.feed)
        }
        if (item.executar == 'feedpessoal2') {
            feedinstamontar3(item.feed)
        }
        if (item.executar == 'uparperfil') {
            resetphone()
            urlinstagram = item.url
            document.getElementById('instagram-feed').classList.add('none')
            document.getElementById('instagram-editarperfil').classList.remove('none')
            document.getElementById('updateimageperfil').style.background = "url('" + item.url + "')";
            novafoto = item.url
        }
        if (item.executar == 'listarconversas') {
            montarconversas(item.de, item.para, item.contatos)
        }
    }
})



//Aplicar filtros
var filtro = ""
function resetarfiltros() {
    document.getElementById('img-preview').classList.remove('filtro1');
    document.getElementById('img-preview').classList.remove('filtro2');
    document.getElementById('img-preview').classList.remove('filtro3');
    document.getElementById('img-preview').classList.remove('filtro4');
    document.getElementById('img-preview').classList.remove('filtro5');
    document.getElementById('img-preview').classList.remove('filtro6');
}
$("#resetarfiltros").click(function () {
    filtro = ''
    resetarfiltros()
})
$("#filtro1").click(function () {
    filtro = 'filtro1'
    resetarfiltros()
    document.getElementById('img-preview').classList.add('filtro1');
})
$("#filtro2").click(function () {
    filtro = 'filtro2'
    resetarfiltros()
    document.getElementById('img-preview').classList.add('filtro2');
})
$("#filtro3").click(function () {
    filtro = 'filtro3'
    resetarfiltros()
    document.getElementById('img-preview').classList.add('filtro3');
})
$("#filtro4").click(function () {
    filtro = 'filtro4'
    resetarfiltros()
    document.getElementById('img-preview').classList.add('filtro4');
})
$("#filtro5").click(function () {
    filtro = 'filtro5'
    resetarfiltros()
    document.getElementById('img-preview').classList.add('filtro5');
})
$("#filtro6").click(function () {
    filtro = 'filtro6'
    resetarfiltros()
    document.getElementById('img-preview').classList.add('filtro6');
})


//Fechar
let showing = true;
document.onkeyup = function (data) {
    if (data.which == 27) {
        if (showing) {
            $.post('http://halabera_phone/exit', JSON.stringify({}));
            return
        }
        else {
            resetphone()
        }
    }
};
$("#close").click(function () {
    $.post('http://halabera_phone/exit', JSON.stringify({}));
    return
});

//Resetar contatos
function resetarcontatos() {
    document.getElementById('c-nome').value = ""
    document.getElementById('c-numero').value = ""
    document.getElementById('c-novo').classList.add('none');
    document.getElementById('c-lista').classList.remove('none');
    listarcontatos()
}

//Listar contatos
function listarcontatos() {
    $.post('http://halabera_phone/listarcontatos');
}

function carregarcontatos(item) {
    let existentes = document.querySelectorAll('.itemcontatos');
    let i = 0;
    for (i; i < existentes.length; i++) {
        existentes[i].classList.add('none')
    }

    setTimeout(() => {
        let lista = item.query;
        lista.forEach(it => {
            var row = document.createElement('div');
            row.classList.add('row');
            row.classList.add('w-i');
            row.classList.add('itemcontatos');

            var col12 = document.createElement('div');
            col12.classList.add('col-md-12');

            var witem = document.createElement('div');
            witem.classList.add('w-item2');

            var row2 = document.createElement('div');
            row2.classList.add('row');

            var col4 = document.createElement('div');
            col4.classList.add('col-md-4');

            var num = document.createElement('p');
            num.classList.add('w-preview2');
            num.innerText = it.numero

            var col6 = document.createElement('div');
            col6.classList.add('col-md-6');

            var nome = document.createElement('p');
            nome.classList.add('w-name');
            nome.innerText = it.nome

            var col2 = document.createElement('div');
            col2.classList.add('col-md-2');

            var icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-trash');
            icon.classList.add('trashIcon');
            icon.id = it.numero
            icon.value = it.numero

            //Adicionar a lista
            document.getElementById("c-lista").appendChild(row);
            row.appendChild(col12);
            col12.appendChild(witem);
            witem.appendChild(row2);
            row2.appendChild(col4);
            col4.appendChild(num);
            row2.appendChild(col6);
            col6.appendChild(nome)
            row2.appendChild(col2)
            col2.appendChild(icon)
        });


        //Excluir contato
        $('.trashIcon').click(function (el) {
            let id = el.target.value;
            $.post('http://halabera_phone/excluircontato', JSON.stringify({
                numero: id,
            }));
        })
    }, 0)

}


//Publicar foto instagram
$("#publicarinstagram").click(function () {
    let uuid = uuidv4();
    let data = new Date();

    let legenda = $("#insta-legenda-inp").val();
    $.post('http://halabera_phone/publicarinstagram', JSON.stringify({
        uuid: uuid,
        data: data,
        usuario: usuarioinstagram.usuario,
        usuariodata: JSON.stringify(usuarioinstagram),
        imagem: urlinstagram,
        legenda: legenda,
        filtro: filtro
    }));

    document.getElementById("insta-legenda-inp").value = ""
})

function tdu(str) { //Text decoration underline function
    return "<span style='text-decoration: underline'>" + str + "<span>"
}

//Pesquisa
function montarpesquisa() {
    //Escutar clicks
    let inp = document.getElementById("inppesquisar");
    inp.addEventListener('keydown', function () {
        let legenda = $("#inppesquisar").val();

        //Zerar lista
        document.getElementById('sugestoes-usuarios2').innerHTML = ""

        //Exibir sugestoes
        document.getElementById('sugestoes-usuarios2').classList.remove("none");
        var userparamarcar = legenda;

        todosusuariosinsta.forEach((u) => {
            if ((u.usuario.toLowerCase()).includes(userparamarcar.toLowerCase())) {
                if (!u.avatar) {
                    u.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                }

                document.getElementById('sugestoes-usuarios2').innerHTML += `   
        <div class="row sugestaoitem2"  id="${u.usuario}">
        <div class="col-md-1">
            <div class="avatar-insta2" id="user-avatar-legenda"  style="background-image: url('` + u.avatar + `'); width: 25px; height: 25px"></div>
        </div>

        <div class="col-md-7 ">
            <div  class="fazer-comentario-input "
                style="position: relative; top: 12.5px; cursor: pointer; color: #fff" value="" >${u.usuario}</div>
        </div>
    </div>
        `

            }
        })


        setTimeout(() => {
            const divs = document.querySelectorAll('.sugestaoitem2');
            divs.forEach(el => el.addEventListener('click', event => {
                let clicked = false
                el.classList.forEach((c) => {
                    if (c == 'clicked') {
                        clicked = true
                    }
                })
                if (!clicked) {
                    el.classList.add('clicked')
                    //Zerar lista
                    document.getElementById('sugestoes-usuarios2').innerHTML = ""

                    //Exibir sugestoes
                    document.getElementById('sugestoes-usuarios2').classList.remove("none");
                    //Abrir detalhes
                    $.post('http://halabera_phone/feeddetalhado', JSON.stringify({
                        uuid: el.id,
                    }));

                    document.getElementById('instagram-feed').classList.add('none');
                    document.getElementById('instagram-pesquisar').classList.add('none');
                    document.getElementById('instagram-perfil').classList.remove('none');
                    imageavatarbottommenuinstagram()
                    scrolltotop()

                    document.getElementById('editarperfil').classList.add('none')
                    document.getElementById('seguirperfil').classList.add('none')
                    document.getElementById('deixarseguirperfil').classList.add('none')

                    document.getElementById('loadinginsta2').classList.remove('none')
                    document.getElementById('feedpessoal').innerHTML = ``
                    document.getElementsByClassName("inppesquisar").value = ''
                }
            }))
        }, 500)
    })
}

//Legenda foto instagram
$("#instalegenda").click(function () {
    document.getElementById('instagram-preview').classList.add('none');
    document.getElementById('instagram-legenda').classList.remove('none');
    document.getElementById('img-legenda-insta').style.background = "url('" + urlinstagram + "')";
    document.getElementById('img-legenda-insta').style.backgroundSize = "cover";
    document.getElementById('user-avatar-legenda').style.background = "url('" + usuarioinstagram.avatar + "')";
    document.getElementById('user-avatar-legenda').style.backgroundSize = "cover";

    var filtropreview = filtro + "2"
    document.getElementById('img-legenda-insta').classList.add(filtropreview)


    //Escutar clicks
    let inp = document.getElementById("insta-legenda-inp");
    inp.addEventListener('keydown', function () {
        let legenda = $("#insta-legenda-inp").val();
        if (legenda.includes("@")) {

            // //Separar para marcacao
            // let userparamarcar = (legenda.split('@')[1]).split(" ")[0]

            let arrobas = legenda.split('@');
            let i = 0;
            for (i; i < arrobas.length; i++) {
                console.log('index', i)
                let tosplit = i;
                if (i == 0) {
                    tosplit = i + 1
                }
                if ((legenda.split('@')[tosplit]).split(" ").length < 2) {
                    //Separar para marcacao
                    let userparamarcar = (legenda.split('@')[tosplit]).split(" ")[0]
                    console.log('exibir sugestões', userparamarcar)

                    //Zerar lista
                    document.getElementById('sugestoes-usuarios').innerHTML = ""

                    //Exibir sugestoes
                    document.getElementById('sugestoes-usuarios').classList.remove("none");

                    if (userparamarcar.length > 0) {
                        todosusuariosinsta.forEach((u) => {
                            if ((u.usuario.toLowerCase()).includes(userparamarcar.toLowerCase())) {
                                if (!u.avatar) {
                                    u.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                                }

                                document.getElementById('sugestoes-usuarios').innerHTML += `   
                        <div class="row sugestaoitem"  id="${u.usuario}">
                        <div class="col-md-1">
                            <div class="avatar-insta2" id="user-avatar-legenda"  style="background-image: url('` + u.avatar + `'); width: 25px; height: 25px"></div>
                        </div>
        
                        <div class="col-md-7 ">
                            <div  class="fazer-comentario-input "
                                style="position: relative; top: 12.5px; cursor: pointer; color: #fff" value="" >${u.usuario}</div>
                        </div>
                    </div>
                        `
                            }
                        })

                        setTimeout(() => {
                            const divs = document.querySelectorAll('.sugestaoitem');
                            divs.forEach(el => el.addEventListener('click', event => {
                                let novalegenda = legenda.replace("@" + userparamarcar, "@" + el.id + " ")
                                // legenda = novalegenda
                                document.getElementById("insta-legenda-inp").value = novalegenda
                                //Zerar lista
                                document.getElementById('sugestoes-usuarios').innerHTML = ""
                            }))
                        }, 500)

                    }
                    else {
                        //Zerar lista
                        document.getElementById('sugestoes-usuarios').innerHTML = ""
                    }

                }
            }

            // if ((legenda.split('@')[1]).split(" ").length < 2) {
            //     console.log('exibir sugestões')

            //     //Zerar lista
            //     document.getElementById('sugestoes-usuarios').innerHTML = ""

            //     //Exibir sugestoes
            //     document.getElementById('sugestoes-usuarios').classList.remove("none");

            //     if (userparamarcar.length > 0) {
            //         todosusuariosinsta.forEach((u) => {
            //             if (u.usuario.includes(userparamarcar)) {
            //                 if (!u.avatar) {
            //                     u.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
            //                 }

            //                 document.getElementById('sugestoes-usuarios').innerHTML += `   
            //         <div class="row sugestaoitem"  id="${u.usuario}">
            //         <div class="col-md-1">
            //             <div class="avatar-insta2" id="user-avatar-legenda"  style="background-image: url('` + u.avatar + `'); width: 25px; height: 25px"></div>
            //         </div>

            //         <div class="col-md-7 ">
            //             <div  class="fazer-comentario-input "
            //                 style="position: relative; top: 12.5px; cursor: pointer; color: #fff" value="" >${u.usuario}</div>
            //         </div>
            //     </div>
            //         `
            //             }
            //         })

            //         setTimeout(() => {
            //             const divs = document.querySelectorAll('.sugestaoitem');
            //             divs.forEach(el => el.addEventListener('click', event => {
            //                 let novalegenda = legenda.replace("@" + userparamarcar, "@" + el.id + " ")
            //                 document.getElementById("insta-legenda-inp").value = novalegenda
            //                 //Zerar lista
            //                 document.getElementById('sugestoes-usuarios').innerHTML = ""
            //             }))
            //         }, 500)

            //     }
            //     else {
            //         //Zerar lista
            //         document.getElementById('sugestoes-usuarios').innerHTML = ""
            //     }

            // }

            // if(userparamarcar == "ff"){
            //     let novalegenda = legenda.replace("@ff", "")
            //     console.log(userparamarcar,novalegenda);
            //     document.getElementById("insta-legenda-inp").value = novalegenda
            // }
            // inp.textContent = "";
        }
    });
})

//Nova foto instagram
$("#instanovafoto").click(function () {
    showing = false
    $.get('http://halabera_phone/novafotoinsta');
    document.getElementsByClassName("contt")[0].classList.add('none');
    document.getElementsByClassName("contt2")[0].classList.remove('none');
})

//Criar usuario instagram
$("#criar_instauser").click(function () {
    let usuario = $("#inp_instagram_usuario").val();
    if (usuario) {
        $.post('http://halabera_phone/novousuarioinsta', JSON.stringify({
            usuario: usuario,
        }));
    }
})
//Feed insta
let feed_instagram = []
function feedinsta() {
    document.getElementById('loadinginsta').classList.remove('none')
    document.getElementById('feed-lista').innerHTML = ""
    feed_instagram = [];
    $.get('http://halabera_phone/getfeed')
    imageavatarbottommenuinstagram()
}

function feedinstamontar(feed) {
    document.getElementById('loadinginsta').classList.add('none')
    // console.log(JSON.stringify(feed))
    //Apagar anteriores
    // let existentes = document.querySelectorAll('.iteminstagram');
    // let i = 0;
    // for (i; i < existentes.length; i++) {
    //     existentes[i].classList.add('none')
    // }

    var usuarios = [];


    setTimeout(() => {
        feed.forEach(it => {
            it.usuariodata = it.usuarioatualizado[0];

            //Adicionar no array de users
            let haveinusers = false;
            usuarios.forEach((u) => {
                if (u.usuario == it.usuariodata.usuario) {
                    haveinusers = true;
                }
            })
            if (!haveinusers) {
                usuarios.push(it.usuariodata)
            }


            if (!it.usuariodata.avatar) {
                it.usuariodata.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
            }
            it.usuariodata = it.usuarioatualizado[0];

            //Atualizar array de usuários
            feed_instagram.push(it)

            document.getElementById('feed-lista').innerHTML += `
        <div style="margin-top: 20px;" class=" iteminstagram fadeIn">
        <div class="row instapadding padding10 abrirdetalhesinstagram" id="` + it.usuariodata.usuario + `" >
            <div class="col-md-3">
                <div class="avatar-insta" style="background-image: url('` + it.usuariodata.avatar + `')"></div>
            </div>
            <div class="col-md-9 ">
                <span class="insta-username" id="username` + it.usuariodata.usuario + `">` + it.usuariodata.usuario + ` </span>
            </div>
        </div>

        <img class="w100 mgtopimg `+ it.filtro + `"
            src="`+ it.imagem + `">

        <div class="row instapadding mgtoprowaction">
            <div class="col-md-1 padding0 heartcol">
                <img class="hearticon curtirinstagram" id="` + it.uuid + `" src="./img/heart.png">
            </div>
            <div class="col-md-1 padding0"></div>
            <div class="col-md-1 padding0 mgleftnegative abrir-comentarios" id="${it.uuid}">
                <img class="hearticon" src="./img/comment.png">
            </div>
        </div>

        <div class="row instapadding mgtoprowaction displayblock">
            <span class="insta-username2">`+ it.usuariodata.usuario + `</span>
            <span class="insta-legenda">`+ it.legenda + `</span>
            <p class="insta-comentarios abrir-comentarios" id="${it.uuid}">Ver todos os comentários</p>
        </div>

        <div class="row instapadding padding25 abrir-comentarios" id="${it.uuid}">
            <div class="col-md-3 padding0">
                <div class="avatar-insta-profile" style="background-image: url('` + usuarioinstagram.avatar + `')"></div>
            </div>
            <div class="col-md-9 ">
                <p class="insta-comentarioadd">Adicione um comentário...</p>
            </div>
        </div>
    </div>
    `;

            //Verificar se ja curtiu
            let jacurtiu = false;
            it.curtidas.forEach((curtida) => {
                if (curtida.user_id == usuarioinstagram.user_id) {
                    jacurtiu = true
                }
            })

            //Trocar coração
            if (jacurtiu) {
                // console.log('ja curtiu')
                document.getElementById(it.uuid).src = './img/heart2.png'
            }


        })


        usuarios.forEach((it) => {
            //Add verificado
            if (it.verificado > 0) {
                let vers = document.querySelectorAll("#username" + it.usuario);
                vers.forEach((v) => {
                    let img = document.createElement('img');
                    img.classList.add('verificado');
                    img.src = './img/verificado.png';
                    v.appendChild(img)
                })
            }
        })

        //Abrir insta
        const abrirdetalhesinstagram = document.querySelectorAll('.abrirdetalhesinstagram');
        abrirdetalhesinstagram.forEach(el => el.addEventListener('click', event => {
            //Abrir detalhes
            $.post('http://halabera_phone/feeddetalhado', JSON.stringify({
                uuid: el.id,
            }));

            document.getElementById('instagram-feed').classList.add('none');
            document.getElementById('instagram-pesquisar').classList.add('none');
            document.getElementById('instagram-perfil').classList.remove('none');
            imageavatarbottommenuinstagram()
            scrolltotop()

            document.getElementById('editarperfil').classList.add('none')
            document.getElementById('seguirperfil').classList.add('none')
            document.getElementById('deixarseguirperfil').classList.add('none')

            document.getElementById('loadinginsta2').classList.remove('none')
            document.getElementById('feedpessoal').innerHTML = ``
        }));

        //Curtida instagram
        const divs = document.querySelectorAll('.curtirinstagram');
        divs.forEach(el => el.addEventListener('click', event => {
            //Remover curtida
            if (el.src.includes('heart2.png')) {
                // print('remover curtida')
                el.src = './img/heart.png'
                $.post('http://halabera_phone/removercurtida_instagram', JSON.stringify({
                    uuid: el.id,
                }));
            }
            //Adicionar curtida
            else {
                // print('adicionar curtida')
                el.src = './img/heart2.png'
                $.post('http://halabera_phone/novacurtida_instagram', JSON.stringify({
                    uuid: el.id,
                    data: new Date()
                }));
            }
        }));

        //Abrir comentários
        const comments3 = document.querySelectorAll('.abrir-comentarios');
        comments3.forEach(el => el.addEventListener('click', async event => {
            abriucomentariosdoperfil = false
            document.getElementById('instagram-feed').classList.add('none')
            document.getElementById('instagram-comentarios').classList.remove('none');
            scrolltotop()

            let uuid2 = uuidv4();
            document.getElementById('posicaocurtidas').innerHTML = `
            <div class="row " style="margin-left: -7px !important;">
                <div class="col-md-1 padding0 heartcol">
                    <img class="hearticon curtirinstagram2 heartcomments" id="${uuid2}" src="./img/heart.png">
                </div>
                <div class="col-md-1 padding0"></div>
                <div class="col-md-6 padding0" id="${uuid2}v"><p style="color: #fff; font-size:12px; margin-left: 5px; position:relative;top:2px">Ver curtidas</p></div>

            </div>
                `

            //Atualizar imagem do usuário
            document.getElementById("avatar-insta2").style.backgroundImage = `url('${usuarioinstagram.avatar}')`;

            let uuid = el.id;
            let publicacao;
            feed_instagram.forEach((f) => {
                if (f.uuid == uuid) {
                    publicacao = f;
                }
            });
            publicacaoselecionada = publicacao.uuid
            let comentarios = publicacao.comentarios

            //Verificar se ja curtiu
            let publi2 = publicacao
            let jacurtiu2 = false;
            publi2.curtidas.forEach((curtida) => {
                if (curtida.user_id == usuarioinstagram.user_id) {
                    jacurtiu2 = true
                }
            })


            var elinsta2 = document.getElementById('fecharsug3')
            elinsta2.addEventListener('click', event => {
                document.getElementById('sugestoes-usuarios3').innerHTML = ""
                document.getElementById('sugestoes-usuarios3').classList.add("none");
                document.getElementById('divsug3').classList.add("none");
            })
            var elinsta = document.getElementById(uuid2 + "v")
            elinsta.addEventListener('click', event => {
                //Zerar lista
                document.getElementById('sugestoes-usuarios3').innerHTML = ""

                //Exibir sugestoes
                document.getElementById('sugestoes-usuarios3').classList.remove("none");
                document.getElementById('divsug3').classList.remove("none");

                publicacao.curtidas.forEach((u) => {
                    u = u.usuario[0]
                    if (!u.avatar) {
                        u.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                    }

                    document.getElementById('sugestoes-usuarios3').innerHTML += `   
                    <div class="row sugestaoitem2"  id="${u.usuario}">
                    <div class="col-md-1">
                        <div class="avatar-insta2" id="user-avatar-legenda"  style="background-image: url('` + u.avatar + `'); width: 25px; height: 25px"></div>
                    </div>

                    <div class="col-md-7 ">
                        <div  class="fazer-comentario-input "
                            style="position: relative; top: 12.5px; cursor: pointer; color: #fff" value="" >${u.usuario}</div>
                    </div>
                </div>
    `
                })
            })
            //Trocar coração
            //  document.getElementsByClassName('heartcomments')[0].id = publicacao.uuid


            if (jacurtiu2) {
                document.getElementById(uuid2).src = './img/heart2.png'
            }

            var elinsta = document.getElementById(uuid2)
            elinsta.addEventListener('click', event => {
                //Remover curtida
                if (elinsta.src.includes('heart2.png')) {
                    console.log('trocar coracao1')
                    elinsta.src = './img/heart.png'
                    $.post('http://halabera_phone/removercurtida_instagram', JSON.stringify({
                        uuid: publicacao.uuid,
                    }));
                }
                //Adicionar curtida
                else {
                    console.log('trocar coracao2')
                    elinsta.src = './img/heart2.png'
                    $.post('http://halabera_phone/novacurtida_instagram', JSON.stringify({
                        uuid: publicacao.uuid,
                        data: new Date()
                    }));
                }
            })
            // const divs3 = document.querySelectorAll('.heartcomments');
            // divs3.forEach(el => el.addEventListener('click', event => {
            //     //Remover curtida
            //     if (el.src.includes('heart2.png')) {
            //         print('trocar coracao1')
            //         el.src = './img/heart.png'
            //         $.post('http://halabera_phone/removercurtida_instagram', JSON.stringify({
            //             uuid: publicacao.uuid,
            //         }));
            //     }
            //     //Adicionar curtida
            //     else {
            //         print('trocar coracao2')
            //         el.src = './img/heart2.png'
            //         $.post('http://halabera_phone/novacurtida_instagram', JSON.stringify({
            //             uuid: publicacao.uuid,
            //             data: new Date()
            //         }));
            //     }
            // }));

            document.getElementById("foto-comentarios").style.backgroundImage = `url('${publicacao.imagem}')`;


            document.getElementById("comentario-username").textContent = publicacao['usuariodata']['usuario']
            document.getElementById("comentario-legenda").textContent = publicacao['legenda']
            document.getElementById("comentario-avatar").style.backgroundImage = `url('${publicacao.usuariodata.avatar}')`;
            if (publicacao['usuariodata'].verificado) {
                let img = document.createElement('img');
                img.classList.add('verificado');
                img.src = './img/verificado.png';
                document.getElementById("comentario-username").appendChild(img)
            }

            //Apagar comentarios anteriores
            document.getElementById('comentarios-lista').innerHTML = ""

            //Carregar comentários
            let i = 0;
            for (i; i < comentarios.length; i++) {
                comentarios[i].data = new Date(comentarios[i].data)
                comentarios[i].dia = comentarios[i].data.getDate()
                comentarios[i].mes = comentarios[i].data.getMonth() + 1
                comentarios[i].ano = comentarios[i].data.getFullYear()
                if (!comentarios[i].useratualizado[0].avatar) {
                    comentarios[i].useratualizado[0].avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                }
                let comentario = comentarios[i];
                let tempo = converterTempo(comentario.data)

                if (comentario.useratualizado[0].verificado > 0) {
                    document.getElementById('comentarios-lista').innerHTML += `
                    <div class="row">
                    <div class="col-md-2">
                        <div class="avatar-insta2" style="background-image: url('` + comentario.useratualizado[0].avatar + `')"></div>
                    </div>
                    <div class="col-md-10">
                        <div class="row mgtoprowaction displayblock padrowcomentario psre">
                            <span class="insta-username2">${comentario.useratualizado[0].usuario} <img class="verificado"
                            src="./img/verificado.png" style="margin-right: 2.5px"></span>
                            <span class="insta-legenda">${comentario.comentario}</span>
                        </div>
                        <p class="insta-horario">${tempo}</p>
                    </div>
                </div>
                    `
                }
                else {
                    document.getElementById('comentarios-lista').innerHTML += `
                    <div class="row">
                    <div class="col-md-2">
                        <div class="avatar-insta2" style="background-image: url('` + comentario.useratualizado[0].avatar + `')"></div>
                    </div>
                    <div class="col-md-10">
                        <div class="row mgtoprowaction displayblock padrowcomentario psre">
                            <span class="insta-username2">${comentario.useratualizado[0].usuario}</span>
                            <span class="insta-legenda">${comentario.comentario}</span>
                        </div>
                        <p class="insta-horario">${tempo}</p>
                    </div>
                </div>
                    `
                }

            }

        }));
    }, 0)
}

function converterTempo(data) {
    var today = new Date();
    var Christmas = new Date(data);
    var diffMs = (Christmas - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var diffSegs = Math.round(((diffMs % 86400000) % 3600000)); // minutes

    diffDays = Math.abs(diffDays);
    diffHrs = Math.abs(diffHrs);
    diffMins = Math.abs(diffMins);
    diffSegs = Math.abs(diffSegs);

    if (diffDays < 2) {
        if (diffHrs < 2) {
            if (diffMins < 1) {
                return `Há 0 minutos`
            }
            else {
                return `Há ${Math.abs(diffMins)} minutos`
            }

        }
        else {
            return `Há ${Math.abs(diffHrs) - 1} horas`
        }
    }
    else {
        return `Há ${Math.abs(diffDays) - 1} dias`
    }
}


//Fazer comentário
$("#publicarcomentario").click(function () {
    let comentario = $("#inpcomentario").val();
    $.post('http://halabera_phone/novocomentario_instagram', JSON.stringify({
        comentario: comentario,
        data: new Date(),
        publicacao: publicacaoselecionada
    }));

    let tempo = converterTempo(new Date())
    document.getElementById('comentarios-lista').innerHTML += `
    <div class="row">
    <div class="col-md-2">
        <div class="avatar-insta2" style="background-image: url('` + usuarioinstagram.avatar + `')"></div>
    </div>
        <div class="col-md-10">
            <div class="row mgtoprowaction displayblock padrowcomentario psre">
                <span class="insta-username2">${usuarioinstagram.usuario}</span>
                <span class="insta-legenda">${comentario}</span>
            </div>
            <p class="insta-horario">${tempo}</p>
        </div>
    </div>
    `

    //Zerar campo de comentário
    document.getElementById("inpcomentario").value = "";
})

//Add imagem no bottom menu
function imageavatarbottommenuinstagram() {
    if (usuarioinstagram) {
        // console.log('setar bot menu')
        if (document.getElementById('bottominstaavatar')) {
            document.getElementById('bottominstaavatar').style.backgroundSize = "cover";
            document.getElementById('bottominstaavatar').style.background = "url('" + usuarioinstagram.avatar + "')";
        }


        if (document.getElementById('bottominstaavatar1')) {
            document.getElementById('bottominstaavatar1').style.backgroundSize = "cover";
            document.getElementById('bottominstaavatar1').style.background = "url('" + usuarioinstagram.avatar + "')";
        }


        if (document.getElementById('bottominstaavatar2')) {
            document.getElementById('bottominstaavatar2').style.backgroundSize = "cover !important";
            document.getElementById('bottominstaavatar2').style.background = "url('" + usuarioinstagram.avatar + "')";
        }

    }
}

//Montar perfil inta
function montarperfilinsta() {
    if (usuarioinstagram) {
        document.getElementById('nomeperfilinsta').textContent = usuarioinstagram.usuario

        if (usuarioinstagram.verificado) {
            let img = document.createElement('img');
            img.classList.add('verificado');
            img.src = './img/verificado.png';
            document.getElementById('nomeperfilinsta').appendChild(img)
        }

        if (usuarioinstagram.bio) {
            document.getElementById('bioperfilinsta').textContent = usuarioinstagram.bio
        }

        document.getElementById('perfilinstaavatar').style.background = "url('" + usuarioinstagram.avatar + "')";

        //Listar publicacoes
        $.post('http://halabera_phone/getfeedpessoal', JSON.stringify({
            uuid: usuarioinstagram.usuario
        }));
        document.getElementById('loadinginsta2').classList.remove('none')
        document.getElementById('editarperfil').classList.remove('none')
        document.getElementById('seguirperfil').classList.add('none')
        document.getElementById('deixarseguirperfil').classList.add('none')

        document.getElementById('feedpessoal').innerHTML = ``
    }
}

//Salvar perfil
$("#salvarperfil").click(function () {

    if (novafoto) {
        usuarioinstagram['avatar'] = novafoto
    }
    usuarioinstagram['bio'] = $("#bioinp").val();
    $.post('http://halabera_phone/uparperfil', JSON.stringify({
        bio: $("#bioinp").val(),
        foto: novafoto
    }));

    document.getElementById('instagram-perfil').classList.remove('none')
    document.getElementById('instagram-editarperfil').classList.add('none')
    montarperfilinsta()

})

//Upar avatar
$("#updateimageperfil").click(function () {
    $.post('http://halabera_phone/tirarfotoperfil', JSON.stringify({
    }));
    document.getElementsByClassName("contt")[0].classList.add('none');
    document.getElementsByClassName("contt2")[0].classList.remove('none');
})

//Editar perfil
$("#editarperfil").click(function () {
    document.getElementById('instagram-perfil').classList.add('none')
    document.getElementById('instagram-editarperfil').classList.remove('none')

    setTimeout(() => {
        document.getElementById('updateimageperfil').style.background = "url('" + usuarioinstagram.avatar + "')";

        if (usuarioinstagram['bio']) {
            document.getElementById('bioinp').value = usuarioinstagram['bio']
        }
    }, 100)

})

//Seguir insta
$("#seguirperfil").click(function () {
    // usuariosdetalhesselecionado
    let qntseguidores = parseInt(document.getElementById('qntseguidores').textContent)
    document.getElementById('qntseguidores').textContent = (qntseguidores + 1).toString()
    $.post('http://halabera_phone/seguir', JSON.stringify({
        seguidor: usuarioinstagram.usuario,
        seguindo: usuariosdetalhesselecionado.usuario
    }));
    document.getElementById('seguirperfil').classList.add('none')
    document.getElementById('deixarseguirperfil').classList.remove('none')
})
$("#deixarseguirperfil").click(function () {
    // usuariosdetalhesselecionado
    let qntseguindo = parseInt(document.getElementById('qntseguidores').textContent)
    document.getElementById('qntseguidores').textContent = (qntseguindo - 1).toString()
    $.post('http://halabera_phone/deixarseguir', JSON.stringify({
        seguidor: usuarioinstagram.usuario,
        seguindo: usuariosdetalhesselecionado.usuario
    }));
    document.getElementById('seguirperfil').classList.remove('none')
    document.getElementById('deixarseguirperfil').classList.add('none')
})

function carregarcontatoszap(item) {
    document.getElementById('cont-zap').innerHTML = ''
    let lista = item.query;
    lista.forEach(it => {
        document.getElementById('cont-zap').innerHTML = `
            <div class="row w-i abrirc" id="${it.numero}">
            <div class="col-md-3">
                <div class="w-avatar">

                </div>
            </div>
            <div class="col-md-9">
                <div class="w-item">
                    <div class="row">
                        <div class="col-md-10">
                            <p class="w-name">${it.nome}</p>
                            <p class="w-preview">${it.numero}</p>
                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
                `
    })


    var comments3 = document.querySelectorAll('.abrirc')
    comments3.forEach(el => el.addEventListener('click', async event => {
        document.getElementById('whatsapp-contatos').classList.add('none');
        document.getElementById('whatsapp-conversa').classList.remove('none');
        contatoselecionado = el.id;

        let userconversa;
        lista.forEach((c) => {
            if (c.numero == contatoselecionado) {
                userconversa = c
            }
        });

        document.getElementById('convname').textContent = userconversa['nome']
        document.getElementById('ccontent').innerHTML = ''
    }))
}

function montarconversas(de, para, contatos) {
    let listadeconversas = [];
    let mensagensquemandei = de;
    let mensagensquemandaram = para;
    mensagensquemandaram.forEach((m) => {
        listadeconversas.push({ numero: m.de })
    })
    mensagensquemandei.forEach((m) => {
        listadeconversas.push({ numero: m.para })
    })
    mensagensquemandei = de;
    mensagensquemandaram = para;


    const listaunica = [...new Set(listadeconversas.map(item => item.numero))];
    const listadecontatos = [];

    listaunica.forEach((l) => {
        let achoucontato = false;
        let cc;
        contatos.forEach((c) => {
            if (c.numero == l) {
                achoucontato = true
                cc = c
            }
        });

        if (achoucontato) {
            listadecontatos.push(cc)
        }
        else {
            listadecontatos.push({
                nome: l,
                numero: l
            })
        }
    })


    contatoszap = listarcontatos
    document.getElementById('lconv').innerHTML = ''
    listadecontatos.forEach((l) => {
        document.getElementById('lconv').innerHTML += `
        <div class="row w-i abrirc2" id="${l.numero}">
        <div class="col-md-3">
            <div class="w-avatar">

            </div>
        </div>
        <div class="col-md-9">
            <div class="w-item">
                <div class="row">
                    <div class="col-md-10">
                        <p class="w-name">${l.nome}</p>
                        <p class="w-preview">${l.numero}</p>
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
`;
    })


    var comments3 = document.querySelectorAll('.abrirc2')
    comments3.forEach(el => el.addEventListener('click', async event => {
        document.getElementById('whatsapp-home').classList.add('none');
        document.getElementById('whatsapp-conversa').classList.remove('none');
        contatoselecionado = el.id;

        let userconversa;
        listadecontatos.forEach((c) => {
            if (c.numero == contatoselecionado) {
                userconversa = c
            }
        });

        document.getElementById('convname').textContent = userconversa['nome']

        //Mensagens
        let mensagens = [];
        mensagensquemandei.forEach((m) => {
            if (m.para == userconversa.numero) {
                mensagens.push(m)
            }
        })
        mensagensquemandaram.forEach((m) => {
            if (m.de == userconversa.numero) {
                mensagens.push(m)
            }
        })

        //Ordenar por data
        // var novasmensagens = mensagens.sort(function (a, b) {
        //     // Turn your strings into dates, and then subtract them
        //     // to get a value that is either negative, positive, or zero.
        //     return Math.abs(new Date(b.data).getTime() - new Date(a.data).getTime());
        // })]
        var novasmensagens = mensagens.sort(sortFunction);


        //Criar mensagens
        document.getElementById('ccontent').innerHTML = ''
        novasmensagens.forEach((m) => {
            let classe = "vazia"
            let qnt = 1
            if(novasmensagens.length > 10){
                qnt = 10
            }
            let ultimamensagem = novasmensagens[novasmensagens.length - qnt]
            if(ultimamensagem.data == m.data){
                classe = "scrollto"
            }

            if (m.de != userconversa.numero) {
                document.getElementById('ccontent').innerHTML += `
                <div class="mensagemverde ${classe}">
                ${m.mensagem}
				</div>
                `
            }
            if (m.de == userconversa.numero) {
                document.getElementById('ccontent').innerHTML += `
                <div class="mensagemcinza ${classe}">
                ${m.mensagem}
				</div>
                `
            }

          
        })

        // $('.scrollto').scrollTo(0);
        // $('#ccontent').scrollTo('.scrollto'); 
        setTimeout(() => {
            if(novasmensagens.length > 10){
            $(".scrollto").get(0).scrollIntoView();
            }

        }, )

       
    }))


}

function sortFunction(a, b) {
    var dateA = new Date(a.data).getTime();
    var dateB = new Date(b.data).getTime();
    return dateA > dateB ? 1 : -1;
};


function feedinstamontar3(feed) {
    if (feed.length > 0) {
        document.getElementById('loadinginsta2').classList.add('none')
        document.getElementById('feedpessoal').innerHTML = ''

        var usuarios = [];

        document.getElementById('nomeperfilinsta').textContent = feed[0]['usuarioatualizado'][0].usuario
        if (feed[0]['usuarioatualizado'][0]['bio']) {
            document.getElementById('bioperfilinsta').textContent = feed[0]['usuarioatualizado'][0]['bio']
        }
        else {
            document.getElementById('bioperfilinsta').textContent = ''
        }
        // document.getElementById('perfilinstaavatar').style.background = "url('" + usuarioinstagram.avatar + "')";
        if (!feed[0]['usuarioatualizado'][0].avatar) {
            feed[0]['usuarioatualizado'][0].avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
        }
        document.getElementById('perfilinstaavatar').style.background = "url('" + feed[0]['usuarioatualizado'][0].avatar + "')";
        usuariosdetalhesselecionado = feed[0]['usuarioatualizado'][0];

        //Pegar seguidores
        document.getElementById('qntpubli').textContent = feed.length;
        document.getElementById('qntseguidores').textContent = feed[0]['seguidores'].length;
        document.getElementById('qntseguindo').textContent = feed[0]['seguindo'].length;

        let seguindo = false;
        feed[0]['seguidores'].forEach((u) => {
            if (u.seguidor == usuarioinstagram.usuario) {
                seguindo = true;
            }
        })

        if (seguindo) {
            document.getElementById('editarperfil').classList.add('none')
            document.getElementById('seguirperfil').classList.add('none')
            document.getElementById('deixarseguirperfil').classList.remove('none')
        }
        else {
            document.getElementById('editarperfil').classList.add('none')
            document.getElementById('seguirperfil').classList.remove('none')
            document.getElementById('deixarseguirperfil').classList.add('none')
        }



        document.getElementById('feedpessoal').innerHTML = ''
        setTimeout(() => {
            feed.forEach(it => {
                it.usuariodata = it.usuarioatualizado[0];

                //Adicionar no array de users
                let haveinusers = false;
                usuarios.forEach((u) => {
                    if (u.usuario == it.usuariodata.usuario) {
                        haveinusers = true;
                    }
                })
                if (!haveinusers) {
                    usuarios.push(it.usuariodata)
                }


                if (!it.usuariodata.avatar) {
                    it.usuariodata.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                }
                it.usuariodata = it.usuarioatualizado[0];

                //Atualizar array de usuários
                feed_instagram.push(it)

                document.getElementById('feedpessoal').innerHTML += `
            <div class="col-md-4 colpadding0 padmin ">
								<div class="imageperfil abrir-comentarios22223" id="${it.uuid}"  style="background-image: url('` + it.imagem + `')">

								</div>
							</div>
    `;
            })

            //Abrir comentários
            const comments3 = document.querySelectorAll('.abrir-comentarios22223');
            comments3.forEach(el => el.addEventListener('click', async event => {
                abriucomentariosdoperfil = true
                document.getElementById('instagram-perfil').classList.add('none')
                //  document.getElementById('instagram-feed').classList.add('none')
                document.getElementById('instagram-comentarios').classList.remove('none');

                scrolltotop()


                let uuid2 = uuidv4();
                document.getElementById('posicaocurtidas').innerHTML = `
               <div class="row " style="margin-left: -7px !important;">
                   <div class="col-md-1 padding0 heartcol">
                       <img class="hearticon curtirinstagram3 heartcomments" id="${uuid2}" src="./img/heart.png">
                   </div>
                   <div class="col-md-1 padding0"></div>
                   <div class="col-md-6 padding0" id="${uuid2}v"><p style="color: #fff; font-size:12px; margin-left: 5px; position:relative;top:2px">Ver curtidas</p></div>
                   
               </div>
                   `

                //Abrir lista de curtidas
                // 
                var elinsta2 = document.getElementById('fecharsug3')
                elinsta2.addEventListener('click', event => {
                    document.getElementById('sugestoes-usuarios3').innerHTML = ""
                    document.getElementById('sugestoes-usuarios3').classList.add("none");
                    document.getElementById('divsug3').classList.add("none");
                })
                var elinsta = document.getElementById(uuid2 + "v")
                elinsta.addEventListener('click', event => {
                    //Zerar lista
                    document.getElementById('sugestoes-usuarios3').innerHTML = ""

                    //Exibir sugestoes
                    document.getElementById('sugestoes-usuarios3').classList.remove("none");
                    document.getElementById('divsug3').classList.remove("none");

                    publi2.curtidas.forEach((u) => {
                        u = u.usuario[0]
                        if (!u.avatar) {
                            u.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                        }

                        document.getElementById('sugestoes-usuarios3').innerHTML += `   
                        <div class="row sugestaoitem2"  id="${u.usuario}">
                        <div class="col-md-1">
                            <div class="avatar-insta2" id="user-avatar-legenda"  style="background-image: url('` + u.avatar + `'); width: 25px; height: 25px"></div>
                        </div>

                        <div class="col-md-7 ">
                            <div  class="fazer-comentario-input "
                                style="position: relative; top: 12.5px; cursor: pointer; color: #fff" value="" >${u.usuario}</div>
                        </div>
                    </div>
        `
                    })
                })


                //Atualizar imagem do usuário
                document.getElementById("avatar-insta2").style.backgroundImage = `url('${usuarioinstagram.avatar}')`;

                let uuid = el.id;
                let publicacao;
                feed_instagram.forEach((f) => {
                    if (f.uuid == uuid) {
                        publicacao = f;
                    }
                });
                publicacaoselecionada = publicacao.uuid
                let comentarios = publicacao.comentarios

                //Verificar se ja curtiu
                let publi2 = publicacao
                let jacurtiu2 = false;



                publi2.curtidas.forEach((curtida) => {
                    if (curtida.user_id == usuarioinstagram.user_id) {
                        jacurtiu2 = true
                    }
                })


                if (jacurtiu2) {
                    document.getElementById(uuid2).src = './img/heart2.png'
                }

                var elinsta = document.getElementById(uuid2)
                elinsta.addEventListener('click', event => {
                    //Remover curtida
                    if (elinsta.src.includes('heart2.png')) {
                        console.log('trocar coracao1', publi2.uuid)
                        elinsta.src = './img/heart.png'
                        $.post('http://halabera_phone/removercurtida_instagram', JSON.stringify({
                            uuid: publi2.uuid,
                        }));
                    }
                    //Adicionar curtida
                    else {
                        console.log('trocar coracao2', publi2.uuid)
                        elinsta.src = './img/heart2.png'
                        $.post('http://halabera_phone/novacurtida_instagram', JSON.stringify({
                            uuid: publi2.uuid,
                            data: new Date()
                        }));
                    }
                })


                document.getElementById("foto-comentarios").style.backgroundImage = `url('${publicacao.imagem}')`;


                document.getElementById("comentario-username").textContent = publicacao['usuariodata']['usuario']
                if (publicacao['usuariodata'].verificado) {
                    let img = document.createElement('img');
                    img.classList.add('verificado');
                    img.src = './img/verificado.png';
                    document.getElementById("comentario-username").appendChild(img)
                }

                document.getElementById("comentario-legenda").textContent = publicacao['legenda']
                document.getElementById("comentario-avatar").style.backgroundImage = `url('${publicacao.usuariodata.avatar}')`;

                //Apagar comentarios anteriores
                document.getElementById('comentarios-lista').innerHTML = ""

                //Carregar comentários
                let i = 0;
                for (i; i < comentarios.length; i++) {
                    comentarios[i].data = new Date(comentarios[i].data)
                    comentarios[i].dia = comentarios[i].data.getDate()
                    comentarios[i].mes = comentarios[i].data.getMonth() + 1
                    comentarios[i].ano = comentarios[i].data.getFullYear()
                    if (!comentarios[i].useratualizado[0].avatar) {
                        comentarios[i].useratualizado[0].avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                    }
                    let comentario = comentarios[i];
                    let tempo = converterTempo(comentario.data)

                    if (comentario.useratualizado[0].verificado > 0) {
                        document.getElementById('comentarios-lista').innerHTML += `
                       <div class="row">
                       <div class="col-md-2">
                           <div class="avatar-insta2" style="background-image: url('` + comentario.useratualizado[0].avatar + `')"></div>
                       </div>
                       <div class="col-md-10">
                           <div class="row mgtoprowaction displayblock padrowcomentario psre">
                               <span class="insta-username2">${comentario.useratualizado[0].usuario} <img class="verificado"
                               src="./img/verificado.png" style="margin-right: 2.5px"></span>
                               <span class="insta-legenda">${comentario.comentario}</span>
                           </div>
                           <p class="insta-horario">${tempo}</p>
                       </div>
                   </div>
                       `
                    }
                    else {
                        document.getElementById('comentarios-lista').innerHTML += `
                       <div class="row">
                       <div class="col-md-2">
                           <div class="avatar-insta2" style="background-image: url('` + comentario.useratualizado[0].avatar + `')"></div>
                       </div>
                       <div class="col-md-10">
                           <div class="row mgtoprowaction displayblock padrowcomentario psre">
                               <span class="insta-username2">${comentario.useratualizado[0].usuario}</span>
                               <span class="insta-legenda">${comentario.comentario}</span>
                           </div>
                           <p class="insta-horario">${tempo}</p>
                       </div>
                   </div>
                       `
                    }

                }

            }));
        })
    }
}
function feedinstamontar2(feed) {
    document.getElementById('loadinginsta2').classList.add('none')

    var usuarios = [];


    //Pegar seguidores
    document.getElementById('qntpubli').textContent = feed.length;
    document.getElementById('qntseguidores').textContent = feed[0]['seguidores'].length;
    document.getElementById('qntseguindo').textContent = feed[0]['seguindo'].length;

    setTimeout(() => {
        feed.forEach(it => {
            it.usuariodata = it.usuarioatualizado[0];

            //Adicionar no array de users
            let haveinusers = false;
            usuarios.forEach((u) => {
                if (u.usuario == it.usuariodata.usuario) {
                    haveinusers = true;
                }
            })
            if (!haveinusers) {
                usuarios.push(it.usuariodata)
            }


            if (!it.usuariodata.avatar) {
                it.usuariodata.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
            }
            it.usuariodata = it.usuarioatualizado[0];

            //Atualizar array de usuários
            feed_instagram.push(it)

            document.getElementById('feedpessoal').innerHTML += `
            <div class="col-md-4 colpadding0 padmin ">
								<div class="imageperfil abrir-comentarios2222" id="${it.uuid}"  style="background-image: url('` + it.imagem + `')">

								</div>
							</div>
    `;
        })

        //Abrir comentários
        const comments3 = document.querySelectorAll('.abrir-comentarios2222');
        comments3.forEach(el => el.addEventListener('click', async event => {
            abriucomentariosdoperfil = true
            document.getElementById('instagram-perfil').classList.add('none')
            //  document.getElementById('instagram-feed').classList.add('none')
            document.getElementById('instagram-comentarios').classList.remove('none');
            scrolltotop()

            let uuid2 = uuidv4();
            document.getElementById('posicaocurtidas').innerHTML = `
             <div class="row " style="margin-left: -7px !important;">
                 <div class="col-md-1 padding0 heartcol">
                     <img class="hearticon curtirinstagram2 heartcomments" id="${uuid2}" src="./img/heart.png">
                 </div>
                 <div class="col-md-1 padding0"></div>
                 <div class="col-md-6 padding0" id="${uuid2}v"><p style="color: #fff; font-size:12px; margin-left: 5px; position:relative;top:2px">Ver curtidas</p></div>
                 </div>
                 `



            //Atualizar imagem do usuário
            document.getElementById("avatar-insta2").style.backgroundImage = `url('${usuarioinstagram.avatar}')`;

            let uuid = el.id;
            let publicacao;
            feed_instagram.forEach((f) => {
                if (f.uuid == uuid) {
                    publicacao = f;
                }
            });
            publicacaoselecionada = publicacao.uuid
            let comentarios = publicacao.comentarios

            //Verificar se ja curtiu
            let publi2 = publicacao
            let jacurtiu2 = false;
            publi2.curtidas.forEach((curtida) => {
                if (curtida.user_id == usuarioinstagram.user_id) {
                    jacurtiu2 = true
                }
            })


            var elinsta2 = document.getElementById('fecharsug3')
            elinsta2.addEventListener('click', event => {
                document.getElementById('sugestoes-usuarios3').innerHTML = ""
                document.getElementById('sugestoes-usuarios3').classList.add("none");
                document.getElementById('divsug3').classList.add("none");
            })
            var elinsta = document.getElementById(uuid2 + "v")
            elinsta.addEventListener('click', event => {
                //Zerar lista
                document.getElementById('sugestoes-usuarios3').innerHTML = ""

                //Exibir sugestoes
                document.getElementById('sugestoes-usuarios3').classList.remove("none");
                document.getElementById('divsug3').classList.remove("none");

                publicacao.curtidas.forEach((u) => {
                    u = u.usuario[0]
                    if (!u.avatar) {
                        u.avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                    }

                    document.getElementById('sugestoes-usuarios3').innerHTML += `   
                    <div class="row sugestaoitem2"  id="${u.usuario}">
                    <div class="col-md-1">
                        <div class="avatar-insta2" id="user-avatar-legenda"  style="background-image: url('` + u.avatar + `'); width: 25px; height: 25px"></div>
                    </div>

                    <div class="col-md-7 ">
                        <div  class="fazer-comentario-input "
                            style="position: relative; top: 12.5px; cursor: pointer; color: #fff" value="" >${u.usuario}</div>
                    </div>
                </div>
    `
                })
            })


            if (jacurtiu2) {
                document.getElementById(uuid2).src = './img/heart2.png'
            }

            var elinsta = document.getElementById(uuid2)
            elinsta.addEventListener('click', event => {
                //Remover curtida
                if (elinsta.src.includes('heart2.png')) {
                    console.log('trocar coracao1')
                    elinsta.src = './img/heart.png'
                    $.post('http://halabera_phone/removercurtida_instagram', JSON.stringify({
                        uuid: publicacao.uuid,
                    }));
                }
                //Adicionar curtida
                else {
                    console.log('trocar coracao2')
                    elinsta.src = './img/heart2.png'
                    $.post('http://halabera_phone/novacurtida_instagram', JSON.stringify({
                        uuid: publicacao.uuid,
                        data: new Date()
                    }));
                }
            })


            document.getElementById("foto-comentarios").style.backgroundImage = `url('${publicacao.imagem}')`;


            document.getElementById("comentario-username").textContent = publicacao['usuariodata']['usuario']
            document.getElementById("comentario-legenda").textContent = publicacao['legenda']
            document.getElementById("comentario-avatar").style.backgroundImage = `url('${publicacao.usuariodata.avatar}')`;
            if (publicacao['usuariodata'].verificado) {
                let img = document.createElement('img');
                img.classList.add('verificado');
                img.src = './img/verificado.png';
                document.getElementById("comentario-username").appendChild(img)
            }

            //Apagar comentarios anteriores
            document.getElementById('comentarios-lista').innerHTML = ""

            //Carregar comentários
            let i = 0;
            for (i; i < comentarios.length; i++) {
                comentarios[i].data = new Date(comentarios[i].data)
                comentarios[i].dia = comentarios[i].data.getDate()
                comentarios[i].mes = comentarios[i].data.getMonth() + 1
                comentarios[i].ano = comentarios[i].data.getFullYear()
                if (!comentarios[i].useratualizado[0].avatar) {
                    comentarios[i].useratualizado[0].avatar = 'https://secure.gravatar.com/avatar/5dc53df2dc61c5b8e56e07a435294b8d.jpg?s=600&d=mm'
                }
                let comentario = comentarios[i];
                let tempo = converterTempo(comentario.data)

                if (comentario.useratualizado[0].verificado > 0) {
                    document.getElementById('comentarios-lista').innerHTML += `
                     <div class="row">
                     <div class="col-md-2">
                         <div class="avatar-insta2" style="background-image: url('` + comentario.useratualizado[0].avatar + `')"></div>
                     </div>
                     <div class="col-md-10">
                         <div class="row mgtoprowaction displayblock padrowcomentario psre">
                             <span class="insta-username2">${comentario.useratualizado[0].usuario} <img class="verificado"
                             src="./img/verificado.png" style="margin-right: 2.5px"></span>
                             <span class="insta-legenda">${comentario.comentario}</span>
                         </div>
                         <p class="insta-horario">${tempo}</p>
                     </div>
                 </div>
                     `
                }
                else {
                    document.getElementById('comentarios-lista').innerHTML += `
                     <div class="row">
                     <div class="col-md-2">
                         <div class="avatar-insta2" style="background-image: url('` + comentario.useratualizado[0].avatar + `')"></div>
                     </div>
                     <div class="col-md-10">
                         <div class="row mgtoprowaction displayblock padrowcomentario psre">
                             <span class="insta-username2">${comentario.useratualizado[0].usuario}</span>
                             <span class="insta-legenda">${comentario.comentario}</span>
                         </div>
                         <p class="insta-horario">${tempo}</p>
                     </div>
                 </div>
                     `
                }

            }

        }));
    })
}

//Scrollar para o top
function scrolltotop() {

    $('#scre').scrollTop(0);
}


//Bottom menu instagram
$("#abrirperfil2").click(function () {
    document.getElementById('instagram-feed').classList.add('none');
    document.getElementById('instagram-pesquisar').classList.add('none');
    document.getElementById('instagram-perfil').classList.remove('none');
    imageavatarbottommenuinstagram()
    montarperfilinsta()
    scrolltotop()
})
$("#abrirperfil").click(function () {
    document.getElementById('instagram-feed').classList.add('none');
    document.getElementById('instagram-pesquisar').classList.add('none');
    document.getElementById('instagram-perfil').classList.remove('none');
    imageavatarbottommenuinstagram()
    montarperfilinsta()
    scrolltotop()
})
$("#abrirpesquisa2").click(function () {
    document.getElementById('instagram-feed').classList.add('none');
    document.getElementById('instagram-perfil').classList.add('none');
    document.getElementById('instagram-pesquisar').classList.remove('none');
    imageavatarbottommenuinstagram()
    montarpesquisa()
    scrolltotop()
})
$("#abrirfeed2").click(function () {
    document.getElementById('instagram-pesquisar').classList.add('none');
    document.getElementById('instagram-feed').classList.remove('none');
    document.getElementById('instagram-perfil').classList.add('none');
    imageavatarbottommenuinstagram()
})
$("#abrirpesquisa").click(function () {
    document.getElementById('instagram-pesquisar').classList.remove('none');
    document.getElementById('instagram-feed').classList.add('none');
    document.getElementById('instagram-perfil').classList.add('none');
    imageavatarbottommenuinstagram()
    montarpesquisa()
    scrolltotop()
})
$("#abrirfeed").click(function () {
    document.getElementById('instagram-pesquisar').classList.add('none');
    document.getElementById('instagram-feed').classList.remove('none');
    document.getElementById('instagram-perfil').classList.add('none');
    imageavatarbottommenuinstagram()
})
//Abrir instagram
$("#instagram").click(function () {
    fechartudo();
    //TODOS USERS DO INSTAGRAM
    $.get('http://halabera_phone/todosusuarios');
    document.getElementsByClassName('page-instagram')[0].classList.remove('none');
    // document.getElementById('instagram-feed').classList.remove('none');
    document.getElementById('instagram-cadastro').classList.remove('none');

    document.getElementById('instagram-legenda').classList.add('none');
    document.getElementById('instagram-preview').classList.add('none');
    document.getElementById('instagram-feed').classList.add('none')
    document.getElementById('instagram-pesquisar').classList.add('none');
    document.getElementById('instagram-perfil').classList.add('none');
    document.getElementById('instagram-comentarios').classList.add('none');
    document.getElementById('instagram-editarperfil').classList.add('none');

    //Ver se ja tem usuario criado
    $.get('http://halabera_phone/verificarusuarioinsta')
    feedinsta()

})
$("#avancar").click(function () {
    document.getElementById('instagram-cadastro').classList.add('none')
    document.getElementById('instagram-feed').classList.remove('none')
})
$("#voltar-comentarios").click(function () {
    if (abriucomentariosdoperfil) {
        document.getElementById('instagram-comentarios').classList.add('none')
        document.getElementById('instagram-perfil').classList.remove('none')
    }
    else {
        document.getElementById('instagram-comentarios').classList.add('none')
        document.getElementById('instagram-feed').classList.remove('none')
    }

})
$("#voltar-preview").click(function () {
    document.getElementById('instagram-preview').classList.add('none')
    document.getElementById('instagram-feed').classList.remove('none')
})
$("#voltar-legenda").click(function () {
    document.getElementById('instagram-legenda').classList.add('none')
    document.getElementById('instagram-preview').classList.remove('none')
})

//Abrir Contatos
$("#contatos").click(function () {
    fechartudo();
    document.getElementsByClassName('page-contatos')[0].classList.remove('none');
    listarcontatos()
})

//Abrir Contatos
$("#game").click(function () {
    fechartudo();
    document.getElementsByClassName('page-game')[0].classList.remove('none');
    // var iframe = document.querySelector('iframe[src="https://ellisonleao.github.io/clumsy-bird/"]');
    // This code could probably be tidied up, depending on how familiar you are with the game code
    document.getElementById('muted').src = "https://ellisonleao.github.io/clumsy-bird/"


})

//Voltar para lista de contatos
$("#c-back").click(function () {
    document.getElementById('c-novo').classList.add('none');
    document.getElementById('c-lista').classList.remove('none');
})

//Abrir página de novo contato
$("#c-novoc").click(function () {
    document.getElementById('c-lista').classList.add('none');
    document.getElementById('c-novo').classList.remove('none');
})

//Cadastrar contato
$("#c-salvar").click(function () {
    let nome = $("#c-nome").val();
    let numero = $("#c-numero").val();
    if (nome && numero) {
        $.post('http://halabera_phone/novocontato', JSON.stringify({
            nome: nome,
            numero: numero
        }));
    }
})

//Abrir Notas
$("#notas").click(function () {
    fechartudo();
    document.getElementsByClassName('page-notas')[0].classList.remove('none');
    listarnotas()
})

//Abrir página de nova nova
$("#n-novabtn").click(function () {
    document.getElementById('n-lista').classList.add('none');
    document.getElementById('n-nova').classList.remove('none');
})

//Voltar para lista de notas
$("#n-back").click(function () {
    document.getElementById('n-nova').classList.add('none');
    document.getElementById('n-lista').classList.remove('none');
})

//Voltar para lista de notas
$("#n-back2").click(function () {
    document.getElementById('n-editar').classList.add('none');
    document.getElementById('n-lista').classList.remove('none');
})

//Cadastrar nota
$("#n-salvar").click(function () {
    let titulo = $("#n-titulo").val();
    let nota = $("#n-nota").val();
    let uuid = uuidv4();
    if (titulo && nota) {
        $.post('http://halabera_phone/novanota', JSON.stringify({
            titulo: titulo,
            nota: nota,
            uuid: uuid,
            data: new Date()
        }));
    }
})

//Atualizar nota
$("#n-salvar-edit").click(function () {
    let titulo = $("#n-titulo-edit").val();
    let nota = $("#n-nota-edit").val();
    let uuid = nota_detalhes_uuid;
    if (titulo && nota) {
        $.post('http://halabera_phone/atualizarnota', JSON.stringify({
            titulo: titulo,
            nota: nota,
            uuid: uuid,
            data: new Date()
        }));
    }
})

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


//Resetar notas
function resetarnotas() {
    document.getElementById('n-titulo').value = ""
    document.getElementById('n-nota').value = ""
    document.getElementById('n-nova').classList.add('none');
    document.getElementById('n-editar').classList.add('none');
    document.getElementById('n-lista').classList.remove('none');
    listarnotas()
}

//Listar notas
function listarnotas() {
    $.post('http://halabera_phone/listarnotas');
}

var nota_uuid = "";

function carregarnotas(item) {
    let existentes = document.querySelectorAll('.itemnota');
    let i = 0;
    for (i; i < existentes.length; i++) {
        existentes[i].classList.add('none')
    }


    setTimeout(() => {
        let lista = item.query;
        lista.forEach(it => {
            var row = document.createElement('div');
            row.classList.add('row');
            row.classList.add('w-i');
            row.classList.add('itemnota');

            var col12 = document.createElement('div');
            col12.classList.add('col-md-12');

            var witem = document.createElement('div');
            witem.classList.add('n-item');

            var row2 = document.createElement('div');
            row2.classList.add('row');

            var col4 = document.createElement('div');
            col4.classList.add('col-md-10');

            var num = document.createElement('p');
            num.classList.add('w-preview2');
            num.classList.add('n-item-titulo');
            num.innerText = it.titulo
            num.style.marginBottom = '0px'
            num.value = it.uuid

            var col6 = document.createElement('div');
            col6.classList.add('col-md-12');

            var nome = document.createElement('p');
            nome.classList.add('n-name');
            nome.classList.add('n-item-nota');
            nome.innerText = it.nota
            nome.value = it.uuid

            var col2 = document.createElement('div');
            col2.classList.add('col-md-2');
            col2.style.textAlign = 'right'

            var icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-trash');
            icon.classList.add('trashNota');
            icon.value = it.uuid

            //Adicionar a lista
            document.getElementById("n-lista").appendChild(row);
            row.appendChild(col12);
            col12.appendChild(witem);
            witem.appendChild(row2);
            row2.appendChild(col4);
            col4.appendChild(num);
            row2.appendChild(col2)
            col2.appendChild(icon)
            row2.appendChild(col6);
            col6.appendChild(nome)
        });


        //Excluir nota
        $('.trashNota').click(function (el) {
            let id = el.target.value;
            $.post('http://halabera_phone/excluirnota', JSON.stringify({
                uuid: id,
            }));
        })

        //Abrir nota
        $('.n-item-titulo').click(function (el) {
            nota_uuid = el.target.value;
            document.getElementById('n-lista').classList.add('none');
            document.getElementById('n-editar').classList.remove('none');

            $.post('http://halabera_phone/detalhesnota', JSON.stringify({
                uuid: nota_uuid,
            }));
        })
        $('.n-item-nota').click(function (el) {
            nota_uuid = el.target.value;
            document.getElementById('n-lista').classList.add('none');
            document.getElementById('n-editar').classList.remove('none');

            $.post('http://halabera_phone/detalhesnota', JSON.stringify({
                uuid: nota_uuid,
            }));
        })
    }, 0)

}

//Enviar mensagem
$("#whatsinpt").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        let mensagem = $("#whatsinpt").val();
        if (mensagem) {
            $.post('http://halabera_phone/novamensagem', JSON.stringify({
                contato: contatoselecionado,
                data: new Date(),
                mensagem: mensagem
            }));

            document.getElementById('ccontent').innerHTML += `
            <div class="mensagemverde">
            ${mensagem}
            </div>
            `

            document.getElementById("whatsinpt").value = ""

        }
    }
});

//Abrir contatos WhatsApp
$("#contatos-whatsapp").click(function () {
    fechartudo();
    document.getElementsByClassName('page-whats')[0].classList.remove('none');

    document.getElementById('whatsapp-home').classList.add('none');
    document.getElementById('whatsapp-contatos').classList.remove('none');
    $.post('http://halabera_phone/listarcontatoszap');
})

//Voltar conversa whatsapp
$("#whatsapp-voltarconversa").click(function () {
    document.getElementById('whatsapp-home').classList.remove('none');
    document.getElementById('whatsapp-contatos').classList.add('none');
    document.getElementById('whatsapp-conversa').classList.add('none');
})

//Abrir WhatsApp
$("#whatsapp").click(function () {
    fechartudo();
    document.getElementsByClassName('page-whats')[0].classList.remove('none');

    //Listar conversas
    $.post('http://halabera_phone/listarconversas');


    document.getElementById('whatsapp-home').classList.remove('none');
    document.getElementById('whatsapp-contatos').classList.add('none');
    document.getElementById('whatsapp-conversa').classList.add('none');
})

//Abrir Galeria
$("#galeria").click(function () {
    fechartudo();
    document.getElementsByClassName('page-galeria')[0].classList.remove('none');
    $.post('http://halabera_phone/listargaleria');
})

//Listar galeria
let imgsrc = "";
function carregargaleria(item) {
    let existentes = document.querySelectorAll('.itemgaleria');
    let i = 0;
    for (i; i < existentes.length; i++) {
        existentes[i].classList.add('none')
    }

    setTimeout(() => {
        let lista = item.query;
        lista.forEach(it => {
            var col = document.createElement('div');
            col.classList.add('col-md-4');
            col.classList.add('rp');
            col.classList.add('itemgaleria');

            var img = document.createElement('img');
            img.classList.add('imggaleria')
            img.src = it.image;
            img.id = it.uuid

            //Adicionar a lista
            document.getElementById("rowgaleria").appendChild(col);
            col.appendChild(img)
        });


        //Abrir full
        $('.imggaleria').click(function (el) {
            let src = el.target.src;
            imgsrc = el.target.id
            document.getElementById('g-lista').classList.add('none');
            document.getElementById('galeriafull').classList.remove('none');
            document.getElementById('g-full').src = src;
        })
    }, 0)
}

//Voltar para lista de fotos
$("#g-back").click(function () {
    document.getElementById('galeriafull').classList.add('none');
    document.getElementById('g-lista').classList.remove('none');
})

//Apagar imagem da galeria
$("#g-apagar").click(function () {
    $.post('http://halabera_phone/apagarimagem', JSON.stringify({
        imagem: imgsrc
    }));
})

//Resetar galeria
function restartgaleria() {
    document.getElementById('galeriafull').classList.add('none');
    document.getElementById('g-lista').classList.remove('none');
    $.post('http://halabera_phone/listargaleria');
}

//Voltar para home
$("#home").click(function () {
    fechartudo();
    document.getElementsByClassName('page-home')[0].classList.remove('none');
})

//Fechar todas as paginas
function fechartudo() {
    let pages = document.getElementsByClassName('page');
    let i = 0;
    for (i; i < pages.length; i++) {
        pages[i].classList.add('none');
    }
    document.getElementById('muted').src = ""
}

//Abrir Câmera
$("#camera").click(function () {
    showing = false;
    $.post('http://halabera_phone/tirarfoto', JSON.stringify({
        data: new Date(),
        uuid: uuidv4()
    }));
    document.getElementsByClassName("contt")[0].classList.add('none');
    document.getElementsByClassName("contt2")[0].classList.remove('none');
})

//Celular
function resetphone() {
    showing = true
    document.getElementsByClassName("contt")[0].classList.remove('none');
    document.getElementsByClassName("contt2")[0].classList.add('none');
    $.post('http://halabera_phone/resetarcamera');
}
$("#container2").click(function () {
    if (!showing) {
        resetphone()
    }
})