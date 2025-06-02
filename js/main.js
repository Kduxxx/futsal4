// Funções gerais para o site
document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de fade-in para elementos ao rolar a página
    const fadeElements = document.querySelectorAll('.section-header, .timeline-item, .transformation-card, .chart-container, .recommendation-card');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Efeito de navbar transparente para sólida ao rolar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Gráfico de comparação para a seção de transformações
    criarGraficoComparativo();
    
    // Inicializar formulário de contato
    inicializarFormularioContato();
});

function criarGraficoComparativo() {
    // Dados para o gráfico de comparação entre futebol tradicional e futebol 4.0
    const categorias = ['Análise de Desempenho', 'Prevenção de Lesões', 'Treinamento Tático', 'Recuperação Física', 'Recrutamento'];
    
    const dadosTradicional = [30, 25, 40, 35, 20];
    const dados40 = [90, 85, 95, 80, 90];
    
    const data = [
        {
            x: categorias,
            y: dadosTradicional,
            name: 'Futebol Tradicional',
            type: 'bar',
            marker: {
                color: 'rgba(255, 191, 0, 0.8)'
            }
        },
        {
            x: categorias,
            y: dados40,
            name: 'Futebol 4.0',
            type: 'bar',
            marker: {
                color: 'rgba(0, 255, 127, 0.8)'
            }
        }
    ];
    
    const layout = {
        barmode: 'group',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff'
        },
        margin: {
            l: 50,
            r: 20,
            t: 30,
            b: 80
        },
        xaxis: {
            title: 'Categoria',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Eficiência (%)',
            titlefont: {
                color: '#00ff7f'
            }
        },
        legend: {
            font: {
                color: '#ffffff'
            },
            bgcolor: 'rgba(0,0,0,0.3)'
        }
    };
    
    Plotly.newPlot('comparisonChart', data, layout);
}

function inicializarFormularioContato() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (nome && email && assunto && mensagem) {
                // Aqui seria a lógica de envio do formulário
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos do formulário.');
            }
        });
    }
}

// Função para processar os dados do CSV
function processarDadosMedicos(csvData) {
    // Esta função seria usada para processar os dados reais do CSV
    // e convertê-los para o formato necessário para os gráficos
    
    const linhas = csvData.split('\n');
    const cabecalho = linhas[0].split(';');
    
    const dados = [];
    
    for (let i = 1; i < linhas.length; i++) {
        if (linhas[i].trim() === '') continue;
        
        const valores = linhas[i].split(';');
        const registro = {};
        
        for (let j = 0; j < cabecalho.length; j++) {
            registro[cabecalho[j]] = valores[j];
        }
        
        dados.push({
            posicao: registro['Posição'],
            severidade: registro['Severidade'],
            localizacao: registro['Localização'],
            diasAfastado: parseInt(registro['Dias Afastado']) || 0,
            fatorDesencadeante: registro['Fator Desencadeante']
        });
    }
    
    return dados;
}
