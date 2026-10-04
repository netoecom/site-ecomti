# Arquitetura do Sistema e Estrutura do Projeto

## 1. Fluxo do Aplicativo
O fluxo tem início quando o usuário acessa o domínio ecomti.com.br no navegador. O servidor web da hospedagem recebe a requisição HTTP e entrega o arquivo index.html localizado na pasta raiz pública.

Em seguida, o navegador processa o cabeçalho do documento, faz o download da folha de estilos index-Cli4X1EU.css e executa o módulo principal em JavaScript index-kzACFt43.js. Esse script monta a árvore de componentes da aplicação na divisão designada com o identificador root.

O visitante interage de maneira fluida e dinâmica com as seções de apresentação, cartões de soluções, marcas parceiras e depoimentos, sem necessidade de recarregar a página inteira a cada navegação. Ao acionar o botão de solicitação de consultoria, um formulário de contato é exibido na tela para coleta das informações do visitante, disparando o fluxo de envio para os consultores da ECOM TI.

## 2. Stack Tecnológica
A stack do projeto é composta por HTML5 semântico, folhas de estilo CSS3 geradas por utilitários Tailwind CSS, e biblioteca React estruturada em arquitetura de aplicação de página única empacotada por Vite.

Não há banco de dados relacional ou NoSQL embutido localmente nesta pasta do projeto neste momento, funcionando a aplicação como uma entrega de ativos estáticos compilados de alta performance.

O ambiente de execução oficial é o servidor web da Hostinger configurado no sistema operacional Linux com servidor LiteSpeed ou Apache, servindo diretamente os arquivos da pasta public_html para os visitantes da internet.

## 3. Árvore de Pastas Real do Repositório
A árvore de pastas física que o projeto possui atualmente neste repositório é apresentada a seguir:

d:/SITE ECOMTI/
  .agents/
    rules/
      regras.md
  docs/
    contexto/
      prd.md
      architecture.md
      rules.md
      design.md
      task.md
      memory.md
  ecomti.com.br/
    DO_NOT_UPLOAD_HERE
    public_html/
      default.php
      favicon.ico
      favicon.svg
      index.html
      placeholder.svg
      robots.txt
      assets/
        adobe-logo-B-k3N1ii.png
        aws-logo-DSkIJLhY.png
        eset-logo-BkQzEoRT.png
        favicon.ico
        favicon.svg
        google-cloud-logo-BDr7Ubq3.png
        index-Cli4X1EU.css
        index-kzACFt43.js
        kaspersky-logo-_wfDFDhu.png
        microsoft-logo-CFM-NWIL.png
      lovable-uploads/
        8546b961-578f-44d2-a8ab-5d2c2b0b6506.png
        c32c525c-aaa4-41c1-aff1-95bba69a64b1.png
        c6192653-68de-42cf-96d5-c147fb965410.png

## 4. Árvore de Pastas Proposta para Evolução
Para a evolução saudável e sustentável do projeto, propõe-se organizar a estrutura separando claramente a camada de código-fonte da camada de distribuição final para hospedagem:

d:/SITE ECOMTI/
  .agents/
    rules/
      regras.md
  docs/
    contexto/
      prd.md
      architecture.md
      rules.md
      design.md
      task.md
      memory.md
  src/
    components/
    pages/
    hooks/
    assets/
    styles/
    App.tsx
    main.tsx
  ecomti.com.br/
    public_html/
      index.html
      robots.txt
      favicon.ico
      favicon.svg
      assets/
      lovable-uploads/
  package.json
  vite.config.ts
  tsconfig.json

## 5. Como as Partes se Conectam
O arquivo index.html atua como o ponto de entrada único que ancora todo o ecossistema. Ele invoca a folha de estilos minificada para garantir a aplicação visual instantânea sem flashes de conteúdo desordenado. Em paralelo, o script JavaScript injeta o código dos componentes, manipula o estado da interface e gerencia os eventos de clique e submissão.

As imagens de marcas como Microsoft, Google Cloud, AWS, Adobe, Kaspersky e Eset ficam alojadas na subpasta assets e são chamadas dinamicamente pelos cartões de parceiros. Os banners e recursos visuais personalizados ficam centralizados na pasta lovable-uploads e são consumidos pelos blocos de destaque.

O arquivo default.php presente em public_html é um artefato residual padrão da configuração inicial da Hostinger que pode conflitar com a exibição do index.html caso o servidor esteja configurado para priorizar páginas PHP antes de arquivos HTML.

## 6. Perguntas para Definições de Arquitetura
Onde faltam informações sobre a infraestrutura e o ciclo de vida do código, formulo as seguintes perguntas:

Primeira pergunta: Você possui e deseja importar para este repositório os arquivos originais de código-fonte em TypeScript e Vite antes da compilação, ou prefere manter as evoluções diretamente nos artefatos da pasta public_html?

Segunda pergunta: Podemos remover o arquivo default.php da pasta public_html para assegurar que os visitantes caiam diretamente no index.html da ECOM TI?

Terceira pergunta: O processamento de dados do formulário de contato será feito por uma rota em PHP simples rodando dentro desta mesma hospedagem ou por um webhook externo como n8n ou serviço de API na nuvem?
