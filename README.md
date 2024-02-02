# Automatização do Trabalho de Transferência de Faltas e Notas para o Portal SENAI

**Área:** Educação  
**Responsável:** DevLoopers (grupo 6): Vanessa, Leonardo, Gustavo Peixoto, Erick, Flávia.

## 1. Escopo
Nosso projeto busca desenvolver uma ferramenta para automatizar a transferência das notas e faltas da planilha do Excel para o portal do SENAI. Será eficiente e prático para registrar as notas e faltas dos alunos do SENAI. O objetivo principal é reduzir o tempo de trabalho burocrático realizado pelos professores, os quais realizam tais registros de modo manual.

## 2. Objetivos do Projeto
- Desenvolver uma ferramenta capaz de realizar a transferência automática dos dados inseridos manualmente em uma planilha de Excel para o portal educacional do SENAI.
- Padronizar a planilha de cálculo de notas e controle de faltas, mantendo alguma flexibilidade para que cada professor consiga adaptá-la às suas necessidades.
- Reduzir o risco de erros de digitação durante a transferência de dados das notas e faltas dos alunos.
- Reduzir o tempo médio de trabalho burocrático realizado pelos professores.
- Aumentar a produtividade dos professores, otimizando o recurso de tempo para o desenvolvimento de atividades voltadas à docência.
- Alcançar uma taxa de adoção de pelo menos 80% entre os professores no uso regular do aplicativo durante os primeiros três meses.
- Melhorar a gestão do controle de notas e faltas.
- Lançar a ferramenta e implementar a ideia até o final do próximo trimestre.

# 3. Análise de Riscos

## Risco: Resistência à Adoção da Ferramenta pelos Funcionários
- **Estratégias de Mitigação:** Realizar sessões de testes para garantir a compreensão e aceitação do novo sistema. Envolver o público-alvo (professores) desde as fases iniciais do projeto para receber feedback e endereçar preocupações.

## Risco: Problemas de Integração com Sistemas Existentes (mesmo que físicos)
- **Estratégias de Mitigação:** Realizar uma análise detalhada dos sistemas existentes antes da implementação. Envolver a equipe de TI desde o início para garantir integração.
- **Plano de Contingência:** Manter um guia ou documento preparado para lidar com problemas de integração. Ter um plano de rollback (git) para restaurar sistemas anteriores, se necessário.

## Risco: Falhas Técnicas na Ferramenta
- **Estratégias de Mitigação:** Realizar testes rigorosos da ferramenta antes do lançamento.
- **Plano de Contingência:** Orientar instruções breves sobre como operar ao ocorrer uma falha no sistema.

## Risco: Falta de Envolvimento dos Responsáveis
- **Estratégias de Mitigação:** Apresentar regularmente o progresso do projeto aos responsáveis. Destacar os benefícios de automatização do sistema.
- **Plano de Contingência:** Desenvolver um plano de comunicação de crise para explicar a importância do projeto em momentos de resistência ou dúvida dos responsáveis.

## Risco: Mudanças nos Requisitos durante o Desenvolvimento
- **Estratégias de Mitigação:** Realizar uma análise completa dos requisitos antes do início do desenvolvimento. Estabelecer um processo formal para gerenciar alterações nos requisitos.
- **Plano de Contingência:** Avaliar o impacto das mudanças nos prazos e recursos. Comunicar de maneira eficiente as alterações aos professores e agir conforme o necessário.

## Risco: Interrupções Operacionais Durante a Implementação
- **Estratégias de Mitigação:** Agendar a implementação durante períodos de menor atividade operacional. Comunicar claramente as interrupções planejadas e preparar soluções alternativas.
- **Plano de Contingência:** Desenvolver um documento ou guia de rollback para reverter temporariamente para processos manuais, se necessário.

# 4. Cronograma

## Janeiro/2024: Planejamento
- Contratação da equipe
- Levantamento de requisitos detalhados
- Desenvolvimento da documentação do projeto
- Definição do backlog e prioridade das atividades

## Fevereiro/2024: Desenvolvimento do MVP
- Definição das ferramentas e linguagens utilizadas no projeto
- Codificação e validação do MVP com o cliente e adaptação dos documentos de escopo (se necessário)

## Março/2024: Desenvolvimento do Projeto
- Codificação dos métodos, desenvolvimento do banco de dados junto às interfaces do usuário e fluxos da aplicação
- Realização de testes
- Revisão e ajuste com feedback da equipe e usuários

## Abril/2024: Ajustes e Testes
- Revisão e realização de ajustes
- Realização de testes

## Maio/2024: Testes Finais e Lançamento
- Testes finais do projeto
- Treinamento da equipe e supervisores
- Lançamento oficial do Software
- Monitoramento inicial de feedback e desempenho

# 5. Recursos

## Pessoal:
- Programadores de Back-End: Para a criação das funcionalidades do software.
- Programadores de Front-End: Para a criação da interface do software.
- Programadores de Banco de Dados: Para o gerenciamento de entrada e saída de dados do software.
- Líder de grupo: Para coordenar e supervisionar todas as atividades.

## Tecnologia:
- Ambiente de Desenvolvimento Integrado (IDE): Ferramentas adequadas para o desenvolvimento do aplicativo e do painel de supervisão.
- Sistemas de versionamento de código: git e github para manter o código versionado e sempre atualizado.
- Ferramentas de Teste de Software: Para garantir a qualidade e a confiabilidade do aplicativo e do sistema.

## Equipamentos:
- Computadores e Notebooks: Para desenvolvimento, teste e gerenciamento de projeto.

## Comunicação:
- Ferramentas de Comunicação Online: Para facilitar a colaboração entre a equipe, como e-mails, mensagens instantâneas e videoconferências.
  
# 6. Custos

## Pessoal:
- Programador de Back-End: 1 programador trabalhando por 3 dias na semana.
- Programador de Front-End: 2 programadores trabalhando por 3 dias na semana.
- Programador de Banco de Dados: 1 programador trabalhando por 3 dias na semana.
- Gerente de Projeto: 1 gerente de projeto.

## Tecnologia:
- Ambiente de Desenvolvimento Integrado (IDE):
  - Custo total (considerando licenças): R$ 0

- Sistemas de versionamento de código:
  - Custo total (considerando licenças): R$ 0

- API do CHAT GPT:
  - Custo total (considerando licenças): R$ 0

## Equipamentos:
- A partir da versão 1.0, será necessária a aquisição de um Controlador de acesso com reconhecimento facial Intelbrás*
  - Custo total: R$ 1500,00

**Total Geral:**
- Pessoal: R$ 0
- Tecnologia: R$ 0
- Equipamentos: R$ 1500,00

**Custo Total do Projeto:** R$ 1500,00

# 7. Documentação

## Requisitos Funcionais

- Como um professor, desejo de forma automatizada, inserir os dados de faltas e notas dos alunos no portal educacional do SENAI.
  - **Critérios de Aceitação:** Deve ser possível flexibilizar a planilha conforme a necessidade do professor.

- Como um professor, desejo reduzir o tempo de trabalho burocrático.
  - **Critérios de Aceitação:** Deve transferir de modo automático as notas e faltas dos alunos para o portal.

- Como um professor, eu quero ter um treinamento inicial no uso do aplicativo, para garantir que eu possa utilizá-lo eficientemente.
  - **Critérios de Aceitação:** A equipe de treinamento deve fornecer sessões iniciais de treinamento que cubram todos os recursos e funcionalidades do aplicativo e a disponibilização de um tutorial permanente com instruções sobre o uso do aplicativo.

- Como um supervisor, desejo aumentar a produtividade dos professores, otimizando o recurso de tempo para o desenvolvimento de atividades voltadas à docência.

- Como um supervisor, desejo reduzir os erros de digitação ao realizar a inserção dos dados de notas e faltas no Portal Educacional do Senai.

# 8. Avaliação do Projeto

## Taxa de Adoção do Aplicativo:

- **Objetivo:** Alcançar uma taxa de adoção de 80% entre os funcionários no uso regular da ferramenta.
- **Métrica:** Número total de funcionários utilizando a ferramenta em comparação com o número total de funcionários.

## Eficiência Operacional:

- **Objetivo:** Reduzir o tempo médio gasto na conclusão das atividades de registro de notas e faltas no Portal Educacional do Senai em pelo menos 50% após a implementação do sistema.
- **Métrica:** Comparação do tempo médio de conclusão de atividades de registro de notas e faltas antes e após a implementação.

## Satisfação do Usuário:

- **Objetivo:** Alcançar uma pontuação de satisfação do usuário de pelo menos 4,5 em 5, com base em pesquisas de satisfação.
- **Métrica:** Resultados de pesquisas de satisfação realizadas com professores e diretores da instituição.

## Integridade dos Dados:

- **Objetivo:** Alcançar uma precisão de pelo menos 98% na integridade dos dados registrados pelo sistema.
- **Métrica:** Comparação entre os dados registrados no sistema e planilha do Excel.

## Disponibilidade do Sistema:

- **Objetivo:** Garantir uma disponibilidade do sistema de pelo menos 99,5% ao longo do tempo.
- **Métrica:** Tempo total de operação sem interrupções em comparação com o tempo total planejado.

## Tempo de Implementação:

- **Objetivo:** Cumprir o cronograma estabelecido, realizando a implementação e lançamento até a data prevista.
- **Métrica:** Comparação entre a data de conclusão real e a data planejada.

# 9. Melhorias Previstas para o Projeto:

- Lançamento da versão 1.0: Implementação de um sistema de reconhecimento facial capaz de identificar os alunos na entrada da sala de aula, integrado a uma aplicação capaz de gerar relatórios diários com o nome dos alunos presentes/ausentes, bem como atrasos, eliminando a necessidade da realização da chamada durante a aula e gerando economia de recurso físico (material de escritório) e sustentabilidade ambiental.

