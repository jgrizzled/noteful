import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import GlobalStyle from 'styles/GlobalStyle';
import themes from 'styles/themes';
import PageHeader from 'components/PageHeader';
import FolderSidebar from 'components/sidebar/FolderSidebar';
import NoteSidebar from 'components/sidebar/NoteSidebar';
import NoteContent from 'components/content/NoteContent';
import NoteList from 'components/content/NoteList';
import Error404 from 'components/Error404';
import AddNote from 'components/forms/AddNote';

import NotesContext from 'contexts/NotesContext';

import notefulEndpoint from 'notefulEndpoint';

// container styles
const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
`;

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: 1fr;
  height: 100%;
  overflow: hidden;
`;

const SidebarContainer = styled.nav`
  height: 100%;
  background-color: ${props => props.theme.color.primaryVariant};
  color: ${props => props.theme.color.onPrimary};
`;

const ContentContainer = styled.section`
  overflow: auto;
`;

export default class App extends React.Component {
  state = { folders: [], notes: [], isDarkTheme: false };
  async componentDidMount() {
    try {
      const store = await notefulEndpoint.fetchData();
      this.setState({ ...store });
    } catch (e) {
      console.log(e);
    }
  }
  toggleTheme = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  };
  addNote = () => {};
  deleteNote = async noteId => {
    try {
      const deleteRequest = await notefulEndpoint.deleteNote(noteId);
      if (deleteRequest === true)
        this.setState({ notes: this.state.notes.filter(n => n.id !== noteId) });
      else throw new Error(`Failed to delete note ${noteId}`);
    } catch (e) {
      console.log(e);
    }
  };
  addFolder = () => {};
  deleteFolder = () => {};
  render() {
    const theme = this.state.isDarkTheme ? themes.dark : themes.light;
    return (
      <NotesContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          addNote: this.addNote,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder,
          deleteFolder: this.deleteFolder
        }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            <PageHeader
              toggleTheme={this.toggleTheme}
              isDarkTheme={this.state.isDarkTheme}
            />
            <Switch>
              <Route path='/note/:noteId'>
                <MainContainer>
                  <SidebarContainer>
                    <NoteSidebar />
                  </SidebarContainer>
                  <ContentContainer>
                    <NoteContent />
                  </ContentContainer>
                </MainContainer>
              </Route>
              <Route path='/folder/:folderId'>
                <MainContainer>
                  <SidebarContainer>
                    <FolderSidebar />
                  </SidebarContainer>
                  <ContentContainer>
                    <NoteList />
                  </ContentContainer>
                </MainContainer>
              </Route>
              <Route path='/addnote/:folderId?'>
                <MainContainer>
                  <SidebarContainer>
                    <FolderSidebar />
                  </SidebarContainer>
                  <ContentContainer>
                    <AddNote />
                  </ContentContainer>
                </MainContainer>
              </Route>
              <Route path='/' exact>
                <MainContainer>
                  <SidebarContainer>
                    <FolderSidebar />
                  </SidebarContainer>
                  <ContentContainer>
                    <NoteList />
                  </ContentContainer>
                </MainContainer>
              </Route>
              <Route>
                <Error404 />
              </Route>
            </Switch>
          </AppContainer>
        </ThemeProvider>
      </NotesContext.Provider>
    );
  }
}
