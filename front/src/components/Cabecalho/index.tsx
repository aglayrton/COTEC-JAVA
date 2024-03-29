import styled from "styled-components";
import logo from "./assets/images.jpeg";
import perfil from "./assets/perfil.png";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em 4em;
`;
const ContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 0.1;
`;

const LinkStyled = styled.a`
  color: #0B5523;
  font-weight: 700;
`;


export const Cabecalho = () => {

    return (
      <HeaderStyled>
        <img src={logo} alt='logo' width={300} height={90}/>
        <ContainerStyled>
          <img src={perfil} alt='Perfil' width={60} height={60}/>
          <LinkStyled>Sair</LinkStyled>
        </ContainerStyled>
      </HeaderStyled>
    );
  };

export default Cabecalho;