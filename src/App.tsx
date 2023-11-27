import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/globalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Navigation>
          <Title>React Deep Dive</Title>
          <NavigationList>
            <NavigationItem>
              <Link to="/">홈</Link>
            </NavigationItem>
            <NavigationItem>
              <Link to="/jsx">JSX</Link>
            </NavigationItem>
          </NavigationList>
        </Navigation>
        <Contents>
          <Outlet />
        </Contents>
      </Layout>
    </>
  );
}

export default App;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 40px;
  min-height: 100dvh;

  background-color: #fafafa;
`;

const Title = styled.h1`
  font-size: 3.2rem;
`;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavigationItem = styled.li`
  line-height: 120%;
`;

const Contents = styled.div`
  padding: 40px;
`;
