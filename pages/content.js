import Display from '../components/display';

const Content = props => (
    <div>
        <Display query={props.query}/>
    </div>
);

Content.getInitialProps = async function(context) {
    const query = context.query;
    return { query };
}

export default Content;