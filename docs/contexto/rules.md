# Regras de Desenvolvimento e Padrões de Código

## 1. Diretrizes Gerais de Escrita
Todas as modificações de código neste projeto devem seguir os padrões modernos da web, garantindo alta performance de carregamento, semântica correta, acessibilidade e facilidade de manutenção futura. Toda a documentação e os comentários de código devem ser redigidos em língua portuguesa, em frases corridas e fluidas, sem o uso de travessão.

Nenhuma alteração no repositório pode ser iniciada sem que a próxima tarefa listada em docs/contexto/task.md seja consultada e expressamente autorizada pelo usuário. A integridade dos arquivos em produção deve ser preservada em todas as etapas de trabalho.

## 2. Bibliotecas e Tecnologias Permitidas
Para o desenvolvimento e estilização de interfaces, é permitido o uso de HTML5 semântico e folhas de estilo CSS3 baseadas nos utilitários do Tailwind CSS, respeitando estritamente o sistema de variáveis de design já estabelecido no projeto.

No ecossistema JavaScript e React, são permitidas as bibliotecas consolidadas do ecossistema moderno, incluindo React na versão dezoito ou superior, utilitários da biblioteca Lucide React para renderização de ícones leves e consistentes, e componentes acessíveis baseados em Radix UI.

Para a comunicação de dados e integração de rotinas externas, deve ser utilizada a interface Fetch nativa dos navegadores ou clientes de requisição modernos e padronizados, evitando bibliotecas legadas ou dependências pesadas que prejudiquem a velocidade de carregamento da página.

## 3. Tratamento de Erros e Resiliência
Todos os pontos de interação com o usuário, em especial formulários de contato e de solicitação de consultoria, devem implementar validação prévia de campos obrigatórios no navegador antes do disparo de requisições. O formato de e-mail e o número de telefone corporativo devem ser verificados para evitar envios corrompidos.

As operações assíncronas de rede devem obrigatoriamente possuir blocos de captura de erros com tratamento gracioso de falhas, exibindo mensagens claras e instrutivas para o visitante caso o serviço esteja temporariamente inacessível.

Elementos visuais críticos, como logotipos de parceiros e imagens institucionais, devem possuir textos alternativos descritivos e comportamentos de contingência para evitar quebras abruptas na grade visual da aplicação.

## 4. O que Nunca Fazer
Nunca utilize dados simulados ou ignore validações reais em rotinas que serão promovidas para o ambiente de produção.

Nunca execute modificações de código diretamente nos artefatos de publicação sem antes ter certeza de que o comportamento anterior pode ser revertido em caso de incidente.

Nunca insira chaves privadas de aplicação, senhas de contas de serviço, credenciais de correio eletrônico ou credenciais de banco de dados em arquivos estáticos expostos ao público dentro de public_html.

Nunca exclua ou modifique o arquivo marcador DO_NOT_UPLOAD_HERE que pertence ao mecanismo interno de controle da estrutura de hospedagem da Hostinger.

Nunca invente parâmetros técnicos ou regras de negócio ausentes no projeto, formulando em vez disso a pergunta diretamente ao usuário para esclarecimento.

## 5. Perguntas para Definições de Regras
Onde faltam definições formais sobre governança e regras operacionais, formulo as seguintes perguntas:

Primeira pergunta: Existe um padrão obrigatório de linting ou validação estática de código que deva ser configurado para validar cada contribuição neste projeto?

Segunda pergunta: O site precisará de uma barra ou modal de consentimento de cookies em conformidade com as exigências da Lei Geral de Proteção de Dados para os visitantes?
