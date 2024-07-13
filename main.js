// Object atividade 
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: false
}

// Lista, array, vetor []
const atividades = [
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

    return `
    <div>
        ${input}
        <!-- <span> tag sem significado semântico -->
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `
}

// Pegar o elemento section
const section = document.querySelector('section')

for(let atividade of atividades) {
    // Modificar o conteúdo dentro do section chamando o conteúdo da função
    section.innerHTML += criarItemDeAtividade(atividade)
}
