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
    let input = '<input type="checkbox" '
     
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