import Display from '../components/display';

const Companies = props => (
    <div>
        <Display query={props.query}/>
    </div>
);

Companies.getInitialProps = async function(context) {
    const query = context.query;
    return { query };
}

export default Companies;