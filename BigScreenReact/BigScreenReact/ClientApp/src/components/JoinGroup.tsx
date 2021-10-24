import React from 'react';
import { useHistory } from 'react-router-dom'
import NavigationService from '../services/navigation.service';

function JoinGroup() {
    const history = useHistory();

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            groupName: {value: string};
        }
        NavigationService.groupName = target.groupName.value;

        history.push('/guest');
    }

    return (
        <div className='mt-2'>
            <form className='form' onSubmit={() => onSubmit}>
                <div className='form-group'>
                    <input type='text' className='form-control' placeholder='Group name' name='groupName'/>
                </div>
                <button className='btn btn-info col-sm-2 col-md-2' type='submit'>Join</button>
            </form>
        </div>
    )
}

export default JoinGroup;