// Formatador de Datas com o DayJS
const formatador = (data) => {
    return {
        //Formatando a data com o DAYJS
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd')
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}
formatador(new Date('2024-07-13'))

// Object atividade 
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: false
}

// Lista, array, vetor []
let atividades = [
    atividade,
    {
        nome: "Estudar desenvolvimento Front-end",
        data: new Date("2024-07-12 22:00"),
        finalizada: true
    },
    {
        nome: "Estudar Back-end",
        data: new Date("2024-07-20 20:00"),
        finalizada: false
    }
]

const criarItemDeAtividade = (atividade) => {
    let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox" `
     
    // Verificar se a atividade foi finalizada...se finalizada, adiciona 'checked' no input
    if(atividade.finalizada) {
        input += 'checked'
    }

    input += '>'

    const formatar = formatador(atividade.data)

    return `
    <div>
        ${input}
        <!-- <span> tag sem significado semântico -->
        <span>${atividade.nome}</span>
        <time>
            ${formatar.dia.semana.longo},
            ${formatar.dia.numerico}
            de ${formatar.mes}
            às ${formatar.hora}h
        </time>
    </div>
    `
}

const atualizarListaDeAtividades = (atividade) => {
    // Pegar o elemento section
    const section = document.querySelector('section')
    section.innerHTML = ''

    // Verificar se a lista está vazia
    if(atividades.length == 0) {
        section.innerHTML = '<p>Nenhuma atividade cadastrada!</p>'
        return
    }

    for(let atividade of atividades) {
        // Modificar o conteúdo dentro do section chamando o conteúdo da função
        section.innerHTML += criarItemDeAtividade(atividade)
    }
}
atualizarListaDeAtividades()

//Função que não deixa as informações serem enviadas pelo button do form
const salvarAtividade = (event) => {
    event.preventDefault()
    //Pegar os dados do formulário
    //event-target -> quem disparou o evento de submit (o formulário)
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome: nome,
        data: data,
        finalizada: false
    }

    //Evitar duplicação de atividades
    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste) {
        return alert('Dia/Hora não disponíveis!')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

//Função para criar os dias da seleção do formulário
const criarDiasSelecao = () => {
    const dias = [
        "2024-07-20",
        "2024-07-21",
        "2024-07-22",
        "2024-07-23",
        "2024-07-24",
    ]

    let diasSelecao = ''
    for (let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`
        diasSelecao += `
            <option value="${dia}">${diaFormatado}</option>
        `
    }
    document.querySelector('select[name="dia"').innerHTML = diasSelecao
}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if(!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
    //Se era false, se tornou true, se era true, tornou-se false
}