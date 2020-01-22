import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import PageHeader from 'components/PageHeader';
import FolderSideBar from 'components/SideBar/FolderSideBar';
import NoteSideBar from 'components/SideBar/NoteSideBar';
import NoteContent from 'components/Content/NoteContent';
import NoteList from 'components/Content/NoteList';
import Error404 from 'components/Error404';

// main app container styles
const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
  background-color: ${props => props.theme.color.background};
  font-family: ${props => props.theme.font.main};
  color: ${props => props.theme.color.onBackground};
  a {
    color: ${props => props.theme.color.link};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: 1fr;
  height: 100%;
  overflow: hidden;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.store, isDarkTheme: false };
  }
  toggleTheme = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  };
  render() {
    let theme = this.props.themes.light;
    if (this.state.isDarkTheme) theme = this.props.themes.dark;
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <PageHeader
            toggleTheme={this.toggleTheme}
            isDarkTheme={this.state.isDarkTheme}
          />
          <Switch>
            <Route
              path="/note/:noteId"
              children={({ match }) => {
                const note = this.state.notes.find(
                  n => n.id === match.params.noteId
                );
                const folder = this.state.folders.find(
                  f => f.id === note.folderId
                );
                return (
                  <MainContainer>
                    <NoteSideBar folder={folder} />
                    <NoteContent note={note} />
                  </MainContainer>
                );
              }}
            />
            <Route
              path="/folder/:folderId"
              children={({ match }) => {
                const folder = this.state.folders.find(
                  f => f.id === match.params.folderId
                );
                const notes = this.state.notes.filter(
                  n => n.folderId === match.params.folderId
                );
                return (
                  <MainContainer>
                    <FolderSideBar
                      folders={this.state.folders}
                      activeFolder={folder}
                    />
                    <NoteList notes={notes} />
                  </MainContainer>
                );
              }}
            />
            <Route path="/" exact>
              <MainContainer>
                <FolderSideBar folders={this.state.folders} />
                <NoteList notes={this.state.notes} />
              </MainContainer>
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </AppContainer>
      </ThemeProvider>
    );
  }
}
