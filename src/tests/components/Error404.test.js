import Error404 from 'components/Error404';

const error404 = <Error404 />;

// smoke test
it('renders without crashing', () => {
  Enzyme.mount(error404);
});

// shallow snapshot test
it('renders as expected', () => {
  const tree = renderer.create(error404).toJSON();
  expect(tree).toMatchSnapshot();
});
