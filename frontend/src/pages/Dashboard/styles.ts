import styled from 'styled-components';


export const Container = styled.div`
  padding: 30px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
align-items: center;

  width: 100%;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: 300px;
  }
`;

export const Divider = styled.hr``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;

  width: 100%;
`;


export const ProductList = styled.ul`
  
  li:hover {
    transform: translateX(10px);
  }

  li{
    list-style: none;
    font-size: 20px;
    padding: 0 10px;
  }

  h4{
    margin-bottom: 20px;
  }

  h2{
    margin-bottom: 20px;
  }

`;

export const UsersList = styled.div`
  
  ul:hover {
    transform: translateX(10px);
  }

  h3 {
    margin-top: 20px;
  }

  h4 {
    padding: 0 10px;
    margin-bottom: 10px;
  }
  
  li{
    padding: 0 10px;
    font-size: 20px;
  }
  
`;

export const UserDiv = styled.div`
  flex-direction: row;
  align-items: center;
`;