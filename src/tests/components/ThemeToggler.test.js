import ThemeToggler from 'components/ThemeToggler';

const onClick = jest.fn();
const themeToggler = <ThemeToggler toggleTheme={onClick} isDarkTheme={false} />;

describe('ThemeToggler', () => {
  // smoke test
  it('renders without crashing', () => {
    Enzyme.mount(themeToggler);
  });

  // shallow snapshot test
  it('renders as expected', () => {
    const tree = renderer.create(themeToggler).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // click test
  it('runs onClick handler', () => {
    const wrapper = Enzyme.shallow(themeToggler);
    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
