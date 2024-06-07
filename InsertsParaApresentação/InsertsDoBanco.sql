create database masternote_bd;
use masternote_bd;

SET foreign_key_checks = 0;
TRUNCATE TABLE avaliacao;
TRUNCATE TABLE sa;
TRUNCATE TABLE criterio;
TRUNCATE TABLE capacidade;
TRUNCATE TABLE uc;
TRUNCATE TABLE aluno;
TRUNCATE TABLE turma;
TRUNCATE TABLE curso;
SET foreign_key_checks = 1;



#Inserts para o banco
#Curso
INSERT INTO `masternote_bd`.`curso` (`id_curso`, `carga_horaria`, `nivel`, `nome_curso`) VALUES ('1', '2000', 'Técnico', 'Desenvolvimento de Sistemas');
INSERT INTO `masternote_bd`.`curso` (`id_curso`, `carga_horaria`, `nivel`, `nome_curso`) VALUES ('2', '3000', 'Técnico', 'Desenvolvimento de Sistemas Manhã');

#Turmas
INSERT INTO `masternote_bd`.`turma` (`id_turma`, `sigla`, `curso_id`) VALUES ('1', '3-TDS', '1');
INSERT INTO `masternote_bd`.`turma` (`id_turma`, `sigla`, `curso_id`) VALUES ('2', '3-MDS', '2');

#Alunos
INSERT INTO `masternote_bd`.`aluno` (`id`, `nome`, `numero_chamada`, `turma_id_turma`) VALUES ('1', 'Maria Silva', '1', '1');
INSERT INTO `masternote_bd`.`aluno` (`id`, `nome`, `numero_chamada`, `turma_id_turma`) VALUES ('2', 'João Santos', '2', '2');

#Unidade Curricular
INSERT INTO `masternote_bd`.`uc` (`id_uc`, `carga_horaria`, `conhecimentos`, `modulo`, `nome_uc`, `sigla`, `curso_id`) VALUES ('1', '200', 'Para esta matéria o Aluno deve aprender classes abstratas', '1°Semestre', 'Fundamentos da Programação Orientada a Objetos', 'FPOO', '1');
INSERT INTO `masternote_bd`.`uc` (`id_uc`, `carga_horaria`, `conhecimentos`, `modulo`, `nome_uc`, `sigla`, `curso_id`) VALUES ('2', '200', 'Para esta matéria o Aluno deve aprender classes abstratas', '1°Semestre', 'Fundamentos da Programação Orientada a Objetos', 'FPOO', '2');

#Capacidade
INSERT INTO `masternote_bd`.`capacidade` (`id_capacidade`, `descricao`, `tipo`, `uc_id`) VALUES ('1', 'Desenvolver Classes Abstratas', 'Técnica', '1');
INSERT INTO `masternote_bd`.`capacidade` (`id_capacidade`, `descricao`, `tipo`, `uc_id`) VALUES ('2', 'Desenvolver Classes Abstratas', 'Técnica', '2');

#Critério
INSERT INTO `masternote_bd`.`criterio` (`id_criterio_critico`, `descricao`, `tipo`, `capacidade_id_capacidade`) VALUES ('1', 'Desenvolver classes Abstratas', 'Crítico', '1');
INSERT INTO `masternote_bd`.`criterio` (`id_criterio_critico`, `descricao`, `tipo`, `capacidade_id_capacidade`) VALUES ('2', 'Utilizar Classes Abstratas', 'Desejável', '1');
INSERT INTO `masternote_bd`.`criterio` (`id_criterio_critico`, `descricao`, `tipo`, `capacidade_id_capacidade`) VALUES ('3', 'Desenvolver classes Abstratas', 'Crítico', '2');
INSERT INTO `masternote_bd`.`criterio` (`id_criterio_critico`, `descricao`, `tipo`, `capacidade_id_capacidade`) VALUES ('4', 'Utilizar Classes Abstratas', 'Desejável', '2');

#Situação de Aprendizagem
INSERT INTO `masternote_bd`.`sa` (`id_sa`, `descricao`, `tipo`, `titulo`, `uc_id_uc`) VALUES ('1', 'Atividade Desperadora', 'Formativa e Somativa', 'Avaliação Final do Primeiro Bimestre', '1');
INSERT INTO `masternote_bd`.`sa` (`id_sa`, `descricao`, `tipo`, `titulo`, `uc_id_uc`) VALUES ('2', 'Atividade Desperadora', 'Formativa e Somativa', 'Avaliação Final do Primeiro Bimestre', '2');

#Avaliação
INSERT INTO `masternote_bd`.`avaliacao` (`id_avaliacao`, `resultado`, `aluno_id`, `capacidade_id`, `criterio_id`, `curso_id`, `sa_id`, `turma_id`, `uc_id`) VALUES ('1', 'atende', '1', '1', '1', '1', '1', '1', '1');
INSERT INTO `masternote_bd`.`avaliacao` (`id_avaliacao`, `resultado`, `aluno_id`, `capacidade_id`, `criterio_id`, `curso_id`, `sa_id`, `turma_id`, `uc_id`) VALUES ('2', 'naoAtende', '1', '1', '2', '1', '1', '1', '1');
INSERT INTO `masternote_bd`.`avaliacao` (`id_avaliacao`, `resultado`, `aluno_id`, `capacidade_id`, `criterio_id`, `curso_id`, `sa_id`, `turma_id`, `uc_id`) VALUES ('3', 'atende', '2', '2', '3', '2', '2', '2', '2');
INSERT INTO `masternote_bd`.`avaliacao` (`id_avaliacao`, `resultado`, `aluno_id`, `capacidade_id`, `criterio_id`, `curso_id`, `sa_id`, `turma_id`, `uc_id`) VALUES ('4', 'naoAtende', '2', '2', '4', '2', '2', '2', '2');


