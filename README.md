# Projeto Desafio Globo - CRUD de URLs do YouTube

## Tecnologias Utilizadas

- Docker: Facilita a arquitetura e a escalabilidade, permitindo a criação e gerenciamento de containers para cada componente do projeto (Front-end, Back-end e Banco de dados).
- Python (Flask): Utilizado para construir o Back-end da aplicação.
- JavaScript (React): Utilizado para construir o Front-end da aplicação.
- API do YouTube: Integrada para obter informações adicionais dos vídeos inseridos.

## Descrição
Este projeto consiste em uma solução CRUD separada em três projetos: Front-end, Back-end e Banco de dados. Ele permite que os usuários:
- Insiram e armazenem URLs do YouTube.
- Listem as URLs salvas.
- Recuperem e toquem as URLs através da solução, independente da ordem da lista.
- Deletem as URLs armazenadas.

## Funcionalidades
1. Inserir URL do YouTube:
   - Permite ao usuário inserir e armazenar uma URL do YouTube.
2. Listar URLs salvas:
   - Exibe uma lista de todas as URLs do YouTube armazenadas (integração com API do YouTube).
3. Recuperar e tocar URL:
   - Permite ao usuário recuperar uma URL específica e reproduzir o vídeo diretamente na solução.
4. Deletar URL:
   - Permite ao usuário excluir uma URL armazenada (mensagem de confirmação se deseja realmente excluir).

## Bugs ou Observações
1. CSS com algumas observações e a melhorar.
2. Integração com API do YouTube para preencher o título do vídeo, mas não valida se a URL é válida.
3. Devido à integração da API do YouTube, foi adicionada APIKEY no código do backend. Com isso, o container do backend só fica disponível depois do container do banco (`wait-for-it`).
4. Quando é iniciado e não há URL na lista ou em reprodução, fica uma imagem globo na posição do iframe, com uma tela de espera.

## Pontos de Melhoria ou Evoluções
1. Implementar paginação na listagem de URLs.
2. Implementar gif para quando não houver URL na lista para ficar em modo de espera.
3. Permitir a edição de URLs armazenadas.

## Configuração e Deploy

Passos para Deploy com Docker e construção das imagens:


1 - sudo docker-compose up build (Subir os containers Docker).

2 - sudo docker status ps ( Verificar o status dos containers).

3 - sudo docker-compose down ( Encerra os container ativos descritos no compose).


## Estrtura do Projeto

Globo/
├── Backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
├── Frontend/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml
