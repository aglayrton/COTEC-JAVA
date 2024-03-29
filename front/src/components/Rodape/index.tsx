import styled from "styled-components";

const RodapeEstilizado = styled.footer`
  padding: 1em;
  background-color: #0b5523;
  text-align: center;
  color: white;
`;


function Rodape() {
  return (
    <RodapeEstilizado>
      <p>
        © 2024 COTEC. Todos os direitos reservados. | Coordenadoria de
        Tecnologia da Informação e Comunicação.
      </p>
    </RodapeEstilizado>
  );
}

export default Rodape;
