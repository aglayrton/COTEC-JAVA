# COTEC-JAVA
Processo Seletivo

# CRUD de pessoas

## Tecnologias Utilizadas
- Spring
- Java
- React
- Typescript
- Styled-Components
- Material UI

## Instalação
### Spring
1. Clone o repositório do projeto
2. Navegue até a pasta `backend` do projeto
3. Execute o comando `mvn clean install` para instalar as dependências do Maven
4. Execute o comando `mvn spring-boot:run` para iniciar o servidor Spring Boot

### React
1. Clone o repositório do projeto
2. Navegue até a pasta `frontend` do projeto
3. Execute o comando `npm install` para instalar as dependências do projeto
4. Execute o comando `npm start` para iniciar o servidor de desenvolvimento do React

## Portas
- O servidor Spring roda na porta `8080`
- O servidor de desenvolvimento do React roda na porta `4200` por padrão

## Validações
- Validação de CPF válido
- Restrição para CPFs repetidos
- Restrição para exclusão apenas de pessoas com status INATIVO

## Pesquisa
- A pesquisa é realizada através de uma endpoint que busca por qualquer dado da pessoa
- No frontend, a pesquisa está implementada apenas para nome e CPF

## Observações
- O foco principal do projeto está na implementação em JAVA com Spring
- Paginação do SPRING funciona para tudo (Usei Page)
- Ordenação do SPRING funciona para tudo (Usei PAGE)
- Usei MATERIAL UI para Ordenar no front
- A ordenação e paginação foi implementada tanto no frontend quanto no backend

## IDEs Utilizadas
- Visual Studio Code (VSCode)
- IntelliJ IDEA

## Dockerização :(
- Ainda não implementada.
