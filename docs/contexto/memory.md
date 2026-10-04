# Memória de Decisões do Projeto

## Formato de Registro
Data: Dia, mês e ano da realização da entrega.
Autor: Identificação do agente ou responsável pela tarefa.
Escopo: Descrição concisa da tarefa executada em conformidade com o planejamento.
Decisões e Entregas: Resumo das soluções técnicas aplicadas e das escolhas arquiteturais consolidadas.
Próximos Passos: Tarefa subsequente a ser submetida para aprovação do usuário.

## Histórico de Entradas

Data: 04 de outubro de 2026.
Autor: Antigravity Assistant.
Escopo: Auditoria geral da estrutura do projeto e criação dos arquivos de contexto e governança.
Decisões e Entregas: Concluída a análise minuciosa do repositório físico. Identificada a estrutura de arquivos da hospedagem Hostinger com a aplicação estática gerada por Vite e React no diretório public_html. Definida a stack oficial baseada em HTML5, utilitários Tailwind CSS, JavaScript moderno com React e servidor web Hostinger sem banco de dados local acoplado. Criados os seis documentos de governança em docs/contexto seguindo todas as regras de frase corrida sem o uso de travessão.
Próximos Passos: Executar a configuração de infraestrutura DevOps, Docker e deploy contínuo.

Data: 04 de outubro de 2026.
Autor: Antigravity Assistant.
Escopo: Padronização da stack, pipeline Docker multi-stage, Nginx SPA, PWA e conectividade Coolify.
Decisões e Entregas: Estruturado o projeto com package.json na raiz, scripts de compilação em dist, verificação de tipos e linting. Criado o Dockerfile multi-stage com primeiro estágio em node vinte alpine e segundo estágio em nginx alpine. Configurado o nginx.conf com suporte resiliente a roteamento SPA, regras sem cache para manifesto e service worker, e cache de longo prazo de um ano para ativos estáticos. Implementado suporte completo a PWA com manifest.json, sw.js offline-first e meta tags para dispositivos móveis no index.html. Repositório Git inicializado na branch principal main.
Próximos Passos: Confirmar o nome do repositório no GitHub para conexão do remote origin e push de publicação.

Data: 04 de outubro de 2026.
Autor: Antigravity Assistant.
Escopo: Automação integral de infraestrutura em nuvem, Cloudflare, GitHub e Coolify.
Decisões e Entregas: Repositório netoecom/site-ecomti criado e publicado no GitHub via API sem necessidade de ações manuais. Registro de DNS Tipo A atualizado na Cloudflare apontando para o IP 212.85.20.37 da VPS do Coolify. Aplicação criada no Coolify no projeto ECOMTI e ambiente production com Dockerfile multi-stage e porta 80. Domínios ecomti.com.br e www.ecomti.com.br associados com sucesso. Webhook automático de integração contínua configurado entre GitHub e Coolify. Deploy realizado e validado com sucesso em produção retornando código 200 OK.
Próximos Passos: Executar os ajustes de conteúdo solicitados pelo cliente.

Data: 04 de outubro de 2026.
Autor: Antigravity Assistant.
Escopo: Ajustes de contato, simplificação de indicadores e remoção de cases de sucesso.
Decisões e Entregas: Telefone de atendimento atualizado para o número trinta e oito nove dez zero dois trinta e sete trinta em todos os pontos do site, incluindo cartão de contato, rodapé, banner de chamada para ação e termos legais. Indicadores de projetos e provas sociais infladas foram reduzidos no cabeçalho mantendo com destaque os anos de experiência da empresa. Removidas integralmente as seções de casos de sucesso de TI Estratégica, Automação com Inteligência Artificial e Marketing Digital, além do bloco de métricas de eficiência.
Próximos Passos: Implementar cache busting de ativos e atualizar o service worker.

Data: 04 de outubro de 2026.
Autor: Antigravity Assistant.
Escopo: Implementação de cache busting de bundle e atualização de Service Worker v2.
Decisões e Entregas: Renomeado o arquivo compilado principal para index-ecomti-v2.js com o objetivo de invalidar caches residuais de navegadores e proxys de borda. Atualizado o Service Worker para a versão ecomti-cache-v2 com exclusão automática da versão anterior e recarregamento proativo da página. Adicionadas diretivas explícitas de não armazenamento em cache para o documento index.html no servidor web Nginx, garantindo que qualquer alteração subsequente seja refletida de forma imediata aos visitantes.
Próximos Passos: Confirmar visualização em tempo real pelo usuário.

Data: 04 de outubro de 2026.
Autor: Antigravity Assistant.
Escopo: Ajuste dos indicadores do topo para valores realistas e cache busting v3.
Decisões e Entregas: Reconfigurados os três indicadores do topo da página com números realistas alinhados com o usuário sendo vinte mais anos de experiência, cinquenta mais projetos entregues e noventa e cinco porcento de clientes satisfeitos. Mantida a remoção do bloco de métricas artificiais de marketing. Atualizado o arquivo de script para a versão index-ecomti-v3.js e o Service Worker para ecomti-cache-v3 para garantir entrega imediata nos navegadores sem retenção em cache.
Próximos Passos: Validar a exibição da página em produção pelo usuário.
