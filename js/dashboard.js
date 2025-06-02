// Dashboard BI - Análise de Dados Médicos dos Atletas
document.addEventListener('DOMContentLoaded', function() {
    // Carregar os dados do CSV
    fetch('/dados/dados_medicos.json')
        .then(response => response.json())
        .then(data => {
            inicializarDashboard(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            // Usar dados de exemplo para demonstração
            usarDadosExemplo();
        });
});

function usarDadosExemplo() {
    // Dados de exemplo para demonstração do dashboard
    const dadosExemplo = [
        { posicao: "Goleiro", severidade: "Leve", localizacao: "Pescoço", diasAfastado: 0, fatorDesencadeante: "Repetitivo gradual" },
        { posicao: "Goleiro", severidade: "Grave", localizacao: "Mão", diasAfastado: 0, fatorDesencadeante: "Agudo súbito" },
        { posicao: "Meio-campo", severidade: "Leve", localizacao: "Braço", diasAfastado: 14, fatorDesencadeante: "Agudo súbito" },
        { posicao: "Meio-campo", severidade: "Grave", localizacao: "Pescoço", diasAfastado: 60, fatorDesencadeante: "Repetitivo gradual" },
        { posicao: "Meio-campo", severidade: "Moderada", localizacao: "Ombro", diasAfastado: 90, fatorDesencadeante: "Repetitivo gradual" },
        { posicao: "Zagueiro", severidade: "Moderada", localizacao: "Mão", diasAfastado: 30, fatorDesencadeante: "Repetitivo gradual" },
        { posicao: "Zagueiro", severidade: "Moderada", localizacao: "Tornozelo", diasAfastado: 3, fatorDesencadeante: "Repetitivo gradual" },
        { posicao: "Atacante", severidade: "Grave", localizacao: "Perna", diasAfastado: 14, fatorDesencadeante: "Agudo súbito" },
        { posicao: "Atacante", severidade: "Leve", localizacao: "Ombro", diasAfastado: 3, fatorDesencadeante: "Agudo súbito" },
        { posicao: "Goleiro", severidade: "Moderada", localizacao: "Joelho", diasAfastado: 45, fatorDesencadeante: "Contato direto" },
        { posicao: "Zagueiro", severidade: "Grave", localizacao: "Tornozelo", diasAfastado: 120, fatorDesencadeante: "Contato direto" },
        { posicao: "Meio-campo", severidade: "Leve", localizacao: "Coxa", diasAfastado: 7, fatorDesencadeante: "Agudo súbito" },
        { posicao: "Atacante", severidade: "Grave", localizacao: "Joelho", diasAfastado: 180, fatorDesencadeante: "Contato direto" },
        { posicao: "Goleiro", severidade: "Leve", localizacao: "Ombro", diasAfastado: 5, fatorDesencadeante: "Sem contato" },
        { posicao: "Meio-campo", severidade: "Moderada", localizacao: "Perna", diasAfastado: 21, fatorDesencadeante: "Contato indireto" },
        { posicao: "Atacante", severidade: "Moderada", localizacao: "Coxa", diasAfastado: 14, fatorDesencadeante: "Sem contato" },
        { posicao: "Zagueiro", severidade: "Leve", localizacao: "Pescoço", diasAfastado: 2, fatorDesencadeante: "Repetitivo gradual" },
        { posicao: "Meio-campo", severidade: "Grave", localizacao: "Tornozelo", diasAfastado: 90, fatorDesencadeante: "Contato direto" },
        { posicao: "Atacante", severidade: "Leve", localizacao: "Mão", diasAfastado: 1, fatorDesencadeante: "Sem contato" },
        { posicao: "Goleiro", severidade: "Grave", localizacao: "Joelho", diasAfastado: 150, fatorDesencadeante: "Contato direto" }
    ];
    
    inicializarDashboard(dadosExemplo);
}

function inicializarDashboard(dados) {
    // Configurar os filtros
    configurarFiltros(dados);
    
    // Inicializar os gráficos com todos os dados
    atualizarGraficos(dados);
    
    // Adicionar event listeners para os filtros
    document.getElementById('posicaoFilter').addEventListener('change', function() {
        aplicarFiltros();
    });
    
    document.getElementById('severidadeFilter').addEventListener('change', function() {
        aplicarFiltros();
    });
    
    document.getElementById('localizacaoFilter').addEventListener('change', function() {
        aplicarFiltros();
    });
    
    function aplicarFiltros() {
        const posicaoSelecionada = document.getElementById('posicaoFilter').value;
        const severidadeSelecionada = document.getElementById('severidadeFilter').value;
        const localizacaoSelecionada = document.getElementById('localizacaoFilter').value;
        
        let dadosFiltrados = dados;
        
        if (posicaoSelecionada !== 'todas') {
            dadosFiltrados = dadosFiltrados.filter(d => d.posicao === posicaoSelecionada);
        }
        
        if (severidadeSelecionada !== 'todas') {
            dadosFiltrados = dadosFiltrados.filter(d => d.severidade === severidadeSelecionada);
        }
        
        if (localizacaoSelecionada !== 'todas') {
            dadosFiltrados = dadosFiltrados.filter(d => d.localizacao === localizacaoSelecionada);
        }
        
        atualizarGraficos(dadosFiltrados);
    }
}

function configurarFiltros(dados) {
    // Obter valores únicos para cada filtro
    const posicoes = [...new Set(dados.map(d => d.posicao))];
    const severidades = [...new Set(dados.map(d => d.severidade))];
    const localizacoes = [...new Set(dados.map(d => d.localizacao))];
    
    // Preencher os dropdowns de filtro
    const posicaoFilter = document.getElementById('posicaoFilter');
    posicoes.forEach(posicao => {
        const option = document.createElement('option');
        option.value = posicao;
        option.textContent = posicao;
        posicaoFilter.appendChild(option);
    });
    
    const severidadeFilter = document.getElementById('severidadeFilter');
    severidades.forEach(severidade => {
        const option = document.createElement('option');
        option.value = severidade;
        option.textContent = severidade;
        severidadeFilter.appendChild(option);
    });
    
    const localizacaoFilter = document.getElementById('localizacaoFilter');
    localizacoes.forEach(localizacao => {
        const option = document.createElement('option');
        option.value = localizacao;
        option.textContent = localizacao;
        localizacaoFilter.appendChild(option);
    });
}

function atualizarGraficos(dados) {
    // Gráfico 1: Distribuição de Lesões por Posição
    criarGraficoLesoesPorPosicao(dados);
    
    // Gráfico 2: Severidade das Lesões
    criarGraficoSeveridadeLesoes(dados);
    
    // Gráfico 3: Localização das Lesões
    criarGraficoLocalizacaoLesoes(dados);
    
    // Gráfico 4: Dias de Afastamento por Tipo de Lesão
    criarGraficoDiasAfastamento(dados);
    
    // Gráfico 5: Evolução Temporal de Lesões (simulado)
    criarGraficoEvolucaoTemporal();
}

function criarGraficoLesoesPorPosicao(dados) {
    // Contar lesões por posição
    const contagem = {};
    dados.forEach(d => {
        contagem[d.posicao] = (contagem[d.posicao] || 0) + 1;
    });
    
    const posicoes = Object.keys(contagem);
    const valores = Object.values(contagem);
    
    const data = [{
        x: posicoes,
        y: valores,
        type: 'bar',
        marker: {
            color: ['rgba(0, 255, 127, 0.8)', 'rgba(0, 195, 255, 0.8)', 'rgba(128, 0, 255, 0.8)', 'rgba(255, 191, 0, 0.8)']
        }
    }];
    
    const layout = {
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
            title: 'Posição',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Número de Lesões',
            titlefont: {
                color: '#00ff7f'
            }
        }
    };
    
    Plotly.newPlot('lesoesPorPosicao', data, layout);
}

function criarGraficoSeveridadeLesoes(dados) {
    // Contar lesões por severidade
    const contagem = {};
    dados.forEach(d => {
        contagem[d.severidade] = (contagem[d.severidade] || 0) + 1;
    });
    
    const severidades = Object.keys(contagem);
    const valores = Object.values(contagem);
    
    const data = [{
        labels: severidades,
        values: valores,
        type: 'pie',
        marker: {
            colors: ['rgba(0, 255, 127, 0.8)', 'rgba(255, 191, 0, 0.8)', 'rgba(255, 0, 0, 0.8)']
        },
        textinfo: 'label+percent',
        textposition: 'inside',
        insidetextfont: {
            color: '#000000'
        }
    }];
    
    const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff'
        },
        margin: {
            l: 20,
            r: 20,
            t: 30,
            b: 20
        },
        showlegend: true,
        legend: {
            font: {
                color: '#ffffff'
            }
        }
    };
    
    Plotly.newPlot('severidadeLesoes', data, layout);
}

function criarGraficoLocalizacaoLesoes(dados) {
    // Contar lesões por localização
    const contagem = {};
    dados.forEach(d => {
        contagem[d.localizacao] = (contagem[d.localizacao] || 0) + 1;
    });
    
    const localizacoes = Object.keys(contagem);
    const valores = Object.values(contagem);
    
    const data = [{
        labels: localizacoes,
        values: valores,
        type: 'pie',
        hole: 0.4,
        marker: {
            colors: [
                'rgba(0, 255, 127, 0.8)',
                'rgba(0, 195, 255, 0.8)',
                'rgba(128, 0, 255, 0.8)',
                'rgba(255, 191, 0, 0.8)',
                'rgba(255, 0, 0, 0.8)',
                'rgba(0, 128, 255, 0.8)',
                'rgba(255, 0, 255, 0.8)',
                'rgba(128, 255, 0, 0.8)'
            ]
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        insidetextfont: {
            color: '#000000'
        }
    }];
    
    const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff'
        },
        margin: {
            l: 20,
            r: 20,
            t: 30,
            b: 20
        },
        showlegend: true,
        legend: {
            font: {
                color: '#ffffff'
            }
        }
    };
    
    Plotly.newPlot('localizacaoLesoes', data, layout);
}

function criarGraficoDiasAfastamento(dados) {
    // Calcular média de dias de afastamento por localização
    const localizacoes = [...new Set(dados.map(d => d.localizacao))];
    const mediasDias = localizacoes.map(loc => {
        const lesoesFiltradas = dados.filter(d => d.localizacao === loc);
        const totalDias = lesoesFiltradas.reduce((sum, d) => sum + d.diasAfastado, 0);
        return totalDias / lesoesFiltradas.length;
    });
    
    const data = [{
        x: localizacoes,
        y: mediasDias,
        type: 'bar',
        marker: {
            color: 'rgba(0, 195, 255, 0.8)'
        }
    }];
    
    const layout = {
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
            title: 'Localização da Lesão',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Média de Dias Afastados',
            titlefont: {
                color: '#00ff7f'
            }
        }
    };
    
    Plotly.newPlot('diasAfastamento', data, layout);
}

function criarGraficoEvolucaoTemporal() {
    // Dados simulados para evolução temporal (12 meses)
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Simular dados para diferentes tipos de lesões ao longo do tempo
    const levesDados = [5, 7, 8, 10, 12, 9, 7, 8, 10, 11, 9, 6];
    const moderadasDados = [3, 4, 5, 7, 8, 6, 4, 5, 6, 7, 5, 4];
    const gravesDados = [1, 2, 3, 4, 5, 3, 2, 2, 3, 4, 2, 1];
    
    const data = [
        {
            x: meses,
            y: levesDados,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Leves',
            line: {
                color: 'rgba(0, 255, 127, 1)',
                width: 3
            },
            marker: {
                size: 8
            }
        },
        {
            x: meses,
            y: moderadasDados,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Moderadas',
            line: {
                color: 'rgba(255, 191, 0, 1)',
                width: 3
            },
            marker: {
                size: 8
            }
        },
        {
            x: meses,
            y: gravesDados,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Graves',
            line: {
                color: 'rgba(255, 0, 0, 1)',
                width: 3
            },
            marker: {
                size: 8
            }
        }
    ];
    
    const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff'
        },
        margin: {
            l: 50,
            r: 20,
            t: 30,
            b: 50
        },
        xaxis: {
            title: 'Mês',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Número de Lesões',
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
    
    Plotly.newPlot('evolucaoTemporal', data, layout);
}
