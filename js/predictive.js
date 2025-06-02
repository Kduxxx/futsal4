// Simulações Preditivas baseadas nos dados médicos dos atletas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os gráficos preditivos
    inicializarGraficosPreditivos();
});

function inicializarGraficosPreditivos() {
    // Gráfico 1: Probabilidade de Lesão por Posição
    criarGraficoProbabilidadeLesao();
    
    // Gráfico 2: Tempo Estimado de Recuperação
    criarGraficoTempoRecuperacao();
    
    // Gráfico 3: Fatores de Risco por Idade e Posição
    criarGraficoFatoresRisco();
}

function criarGraficoProbabilidadeLesao() {
    // Dados simulados de probabilidade de lesão por posição e tipo
    const posicoes = ['Goleiro', 'Zagueiro', 'Meio-campo', 'Atacante'];
    
    // Probabilidades simuladas para diferentes tipos de lesões por posição
    const dadosTornozelo = [0.15, 0.22, 0.18, 0.12];
    const dadosJoelho = [0.08, 0.25, 0.20, 0.15];
    const dadosCoxa = [0.10, 0.15, 0.28, 0.30];
    const dadosOmbro = [0.25, 0.10, 0.08, 0.05];
    
    const data = [
        {
            x: posicoes,
            y: dadosTornozelo,
            name: 'Tornozelo',
            type: 'bar',
            marker: {
                color: 'rgba(0, 255, 127, 0.8)'
            }
        },
        {
            x: posicoes,
            y: dadosJoelho,
            name: 'Joelho',
            type: 'bar',
            marker: {
                color: 'rgba(0, 195, 255, 0.8)'
            }
        },
        {
            x: posicoes,
            y: dadosCoxa,
            name: 'Coxa',
            type: 'bar',
            marker: {
                color: 'rgba(255, 191, 0, 0.8)'
            }
        },
        {
            x: posicoes,
            y: dadosOmbro,
            name: 'Ombro',
            type: 'bar',
            marker: {
                color: 'rgba(255, 0, 0, 0.8)'
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
            title: 'Posição',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Probabilidade de Lesão',
            titlefont: {
                color: '#00ff7f'
            },
            tickformat: ',.0%'
        },
        legend: {
            font: {
                color: '#ffffff'
            },
            bgcolor: 'rgba(0,0,0,0.3)'
        }
    };
    
    Plotly.newPlot('probabilidadeLesao', data, layout);
}

function criarGraficoTempoRecuperacao() {
    // Dados simulados de tempo médio de recuperação por tipo de lesão e severidade
    const tiposLesao = ['Tornozelo', 'Joelho', 'Coxa', 'Ombro', 'Pescoço', 'Mão'];
    
    // Tempos médios de recuperação em dias por severidade
    const tempoLeve = [7, 10, 5, 7, 3, 4];
    const tempoModerada = [21, 45, 14, 21, 10, 14];
    const tempoGrave = [60, 180, 45, 60, 30, 21];
    
    const data = [
        {
            x: tiposLesao,
            y: tempoLeve,
            name: 'Leve',
            type: 'bar',
            marker: {
                color: 'rgba(0, 255, 127, 0.8)'
            }
        },
        {
            x: tiposLesao,
            y: tempoModerada,
            name: 'Moderada',
            type: 'bar',
            marker: {
                color: 'rgba(255, 191, 0, 0.8)'
            }
        },
        {
            x: tiposLesao,
            y: tempoGrave,
            name: 'Grave',
            type: 'bar',
            marker: {
                color: 'rgba(255, 0, 0, 0.8)'
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
            title: 'Localização da Lesão',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Tempo Médio de Recuperação (dias)',
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
    
    Plotly.newPlot('tempoRecuperacao', data, layout);
}

function criarGraficoFatoresRisco() {
    // Dados simulados para fatores de risco por idade e posição
    // Criando uma matriz de dados para um heatmap
    const idades = ['18-22', '23-27', '28-32', '33-37', '38+'];
    const posicoes = ['Goleiro', 'Zagueiro', 'Meio-campo', 'Atacante'];
    
    // Matriz de fatores de risco (valores de 0 a 1, onde 1 é o maior risco)
    const z = [
        [0.3, 0.4, 0.5, 0.6, 0.8],  // Goleiro
        [0.4, 0.5, 0.6, 0.7, 0.9],  // Zagueiro
        [0.5, 0.6, 0.7, 0.8, 0.9],  // Meio-campo
        [0.4, 0.5, 0.7, 0.8, 0.9]   // Atacante
    ];
    
    // Transpor a matriz para que as posições fiquem no eixo Y e as idades no eixo X
    const zTransposed = z[0].map((_, colIndex) => z.map(row => row[colIndex]));
    
    const data = [{
        x: idades,
        y: posicoes,
        z: zTransposed,
        type: 'heatmap',
        colorscale: [
            [0, 'rgba(0, 255, 127, 0.8)'],
            [0.5, 'rgba(255, 191, 0, 0.8)'],
            [1, 'rgba(255, 0, 0, 0.8)']
        ],
        showscale: true,
        colorbar: {
            title: 'Índice de Risco',
            titleside: 'right',
            titlefont: {
                color: '#00ff7f'
            },
            tickfont: {
                color: '#ffffff'
            }
        }
    }];
    
    const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff'
        },
        margin: {
            l: 80,
            r: 50,
            t: 30,
            b: 80
        },
        xaxis: {
            title: 'Faixa Etária',
            titlefont: {
                color: '#00ff7f'
            }
        },
        yaxis: {
            title: 'Posição',
            titlefont: {
                color: '#00ff7f'
            }
        }
    };
    
    Plotly.newPlot('fatoresRisco', data, layout);
}

// Função para simular recomendações personalizadas baseadas em dados
function gerarRecomendacoesPreditivas(posicao, idade, historicoLesoes) {
    // Esta função poderia ser expandida para gerar recomendações personalizadas
    // baseadas em parâmetros específicos do atleta
    
    const recomendacoes = {
        'Goleiro': [
            'Fortalecer musculatura dos ombros e braços',
            'Exercícios específicos para reflexos e coordenação',
            'Técnicas de queda para minimizar impacto'
        ],
        'Zagueiro': [
            'Fortalecer musculatura dos joelhos e tornozelos',
            'Treinos de equilíbrio e estabilidade',
            'Técnicas de disputa de bola com menor risco de lesão'
        ],
        'Meio-campo': [
            'Fortalecer musculatura das coxas e panturrilhas',
            'Exercícios de resistência e recuperação rápida',
            'Técnicas de giro e mudança de direção com menor impacto'
        ],
        'Atacante': [
            'Fortalecer musculatura das coxas e joelhos',
            'Treinos de aceleração e desaceleração controlada',
            'Técnicas de finalização com menor risco de lesão'
        ]
    };
    
    return recomendacoes[posicao] || [];
}
