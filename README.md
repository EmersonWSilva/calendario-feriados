# Calendário de Feriados

Aplicação **React** que exibe os feriados nacionais brasileiros, consumindo dados da [BrasilAPI](https://brasilapi.com.br/). O layout apresenta três colunas separadas:

1. **Datas** (no formato **DD-MM-AAAA**)
2. **Nomes** dos feriados
3. **Dia da Semana** (ex.: "Segunda-feira")

## Funcionalidades

- Escolher o **ano** para buscar feriados.
- Exibir a **lista** de feriados em colunas separadas.
- Mostrar **dia da semana** com a primeira letra maiúscula.

## Como Executar

1. **Clonar** o repositório:

    ```bash
    git clone https://github.com/SEU-USUARIO/calendario-feriados.git
    ```

2. **Instalar** dependências:

    ```bash
    cd calendario-feriados
    npm install
    ```
    (ou `yarn install`)

3. **Iniciar** o projeto em modo desenvolvimento:

    ```bash
    npm start
    ```
    Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura Simplificada

```css
src/
├─ components/
│  ├─ Title.jsx
│  ├─ Footer.jsx
│  ├─ Controls.jsx
│  └─ ColumnCard.jsx
├─ services/
│  └─ feriadosService.js
├─ styles/
│  └─ App.css
├─ App.js
└─ index.js
```

## Licença

Licenciado sob [MIT License](LICENSE).
Sinta-se à vontade para usar e modificar conforme a necessidade.

---
by Emerson W. Silva
