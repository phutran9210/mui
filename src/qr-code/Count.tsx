import { useAppContext } from '../context';

const Count = () => {
    const { state } = useAppContext();
    return (
        <div>
            <h1>Count : {state.count}</h1>
        </div>
    );
};

export default Count;