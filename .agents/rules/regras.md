---
trigger: always_on
---

# Protocolo Obrigatório Pré-Execução

Antes de iniciar qualquer análise, planejamento ou escrita de código neste repositório, você DEVE obrigatoriamente ler todos os arquivos presentes em docs/contexto/ (prd.md, architecture.md, rules.md, design.md, task.md e memory.md).

Checklist de Verificação Inicial:
- Os seis arquivos existem e estão na mesma pasta (docs/contexto/)
- Há uma instrução explícita ordenando que o agente leia a pasta antes de trabalhar
- O architecture.md descreve a árvore de pastas que o projeto realmente tem
- O task.md contém tarefas atômicas e pequenas o suficiente para caberem em uma conversa
- O memory.md tem pelo menos uma entrada datada com a decisão de stack

Regras Operacionais:
1. Nunca execute nenhuma modificação sem antes conferir a próxima tarefa disponível em docs/contexto/task.md e obter a confirmação do usuário.
2. Nunca utilize dados simulados ou ignore validações reais em nós que vão para o ambiente de produção.
3. Onde faltar informação em qualquer etapa, formule a pergunta diretamente ao usuário em vez de inventar ou assumir parâmetros.
4. Após concluir uma tarefa, atualize o docs/contexto/memory.md com a data e o resumo do que foi entregue.
