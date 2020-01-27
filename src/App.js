// external
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';

// styles
import GlobalStyle from 'styles/GlobalStyle';
import themes from 'styles/themes';

// components
import FolderSidebar from 'components/sidebar/FolderSidebar';
import NoteSidebar from 'components/sidebar/NoteSidebar';
import NoteContent from 'components/content/NoteContent';
import NoteList from 'components/content/NoteList';
import Error404 from 'components/Error404';
import AddNote from 'components/forms/AddNote';
import AddFolder from 'components/forms/AddFolder';
import ThemeToggler from 'components/ThemeToggler';
import ErrorBoundary from 'components/common/ErrorBoundary';
import ErrorMessage from 'components/common/ErrorMessage';
import IfLoaded from 'components/common/IfLoaded';

import NotesContext from 'contexts/NotesContext';

import notefulServer from 'notefulServer';

// styled HTML elements
const AppContainer = styled.div`
  height: 100vh;
  width: 100 vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: 3rem 1fr;
  grid-template-areas: 'header header' 'sidebar content';
`;

const HeaderContainer = styled.header`
  grid-area: header;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.onPrimary};
  h1 {
    padding: 0;
    margin: 0;
  }
`;

const HeaderLink = styled(Link)`
  color: ${props => props.theme.color.onPrimary};
  &:hover {
    text-decoration: none;
  }
`;

const SidebarContainer = styled.nav`
  position: relative;
  grid-area: 'sidebar';
  height: 100%;
  background-color: ${props => props.theme.color.surface};
  color: ${props => props.theme.color.onSurface};
`;

const ContentContainer = styled.main`
  grid-area: 'content';
  overflow: auto;
`;

// Main App component
// Manages notes, folders, theme state
// Dispatches requests to JSON server
export default class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    loaded: false,
    isDarkTheme: false,
    isError: false
  };

  // fetch notes/folders from server
  async componentDidMount() {
    try {
      const store = await notefulServer.fetchData();
      console.log('Got Data: ', store);
      this.setState({ ...store, loaded: true });
    } catch (e) {
      console.log(e);
      this.setState({ isError: true });
    }
  }

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  };

  // send note to server, update state
  addNote = async note => {
    try {
      const id = await notefulServer.addNote(note);
      if (typeof id === 'string' || typeof id === 'number')
        this.setState(prevState => ({
          notes: [...prevState.notes, { ...note, id }]
        }));
      else throw new Error('Bad id');
      return id;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  // delete note from server, update state
  deleteNote = async noteId => {
    try {
      const deleteRequest = await notefulServer.deleteNote(noteId);
      if (deleteRequest === true)
        this.setState(prevState => ({
          notes: prevState.notes.filter(n => n.id !== noteId)
        }));
      else throw new Error(`Failed to delete note ${noteId}`);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // send folder to server, update state
  addFolder = async folder => {
    try {
      const id = await notefulServer.addFolder(folder);
      if (typeof id === 'string' || typeof id === 'number')
        this.setState(prevState => ({
          folders: [...prevState.folders, { ...folder, id }]
        }));
      else throw new Error('Bad id');
      return id;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  render() {
    if (this.state.isError)
      return <ErrorMessage>Failed to load notes!</ErrorMessage>;
    const theme = this.state.isDarkTheme ? themes.dark : themes.light;
    return (
      <NotesContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          addNote: this.addNote,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder
        }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            <HeaderContainer>
              <h1>
                <HeaderLink to='/'>Noteful</HeaderLink>
              </h1>
              <ThemeToggler
                toggleTheme={this.toggleTheme}
                isDarkTheme={this.state.isDarkTheme}
              />
            </HeaderContainer>
            <IfLoaded loaded={this.state.loaded}>
              <SidebarContainer>
                <ErrorBoundary>
                  <Switch>
                    <Route path='/note/:noteId'>
                      <NoteSidebar />
                    </Route>
                    <Route path={['/folder/:folderId', '/']}>
                      <FolderSidebar />
                    </Route>
                  </Switch>
                </ErrorBoundary>
              </SidebarContainer>
              <ContentContainer>
                <ErrorBoundary>
                  <Switch>
                    <Route path='/note/:noteId'>
                      <NoteContent />
                    </Route>
                    <Route path='/folder/:folderId'>
                      <NoteList />
                    </Route>
                    <Route path='/addnote/:folderId?'>
                      <AddNote />
                    </Route>
                    <Route path='/addfolder'>
                      <AddFolder />
                    </Route>
                    <Route path='/' exact>
                      <NoteList />
                    </Route>
                    <Route>
                      <Error404 />
                    </Route>
                  </Switch>
                </ErrorBoundary>
              </ContentContainer>
            </IfLoaded>
          </AppContainer>
        </ThemeProvider>
      </NotesContext.Provider>
    );
  }
}
