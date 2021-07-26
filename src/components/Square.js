import React from 'react';
import 'semantic-ui-css/semantic.min.css'




const pieces = {
    '0': {
        name: 'Empty Space',
        icon: 'square full icon',
        color: 'space',
    },
    '1': {
        name: 'black Rook',
        icon: 'chess rook icon',
        color: 'red'
    },
    '2': {
        name: 'black Knight',
        icon: 'chess knight icon',
        color: 'red'
    },
    '3': {
        name: 'black Bishop',
        icon: 'chess bishop icon',
        color: 'red'
    },
    '4': {
        name: 'black Queen',
        icon: 'chess queen icon',
        color: 'red'
    },
    '5': {
        name: 'black King',
        icon: 'chess king icon',
        color: 'red'
    },
    '6': {
        name: 'black Bishop Colored',
        icon: 'chess bishop icon',
        color: 'red'
    },
    '9': {
        name: 'black Pawn',
        icon: 'chess pawn icon',
        color: 'red'
    },
    '11': {
        name: 'white Rook',
        icon: 'chess rook icon',
        color: 'teal'
    },
    '12': {
        name: 'white Knight',
        icon: 'chess knight icon',
        color: 'teal'
    },
    '13': {
        name: 'white Bishop',
        icon: 'chess bishop icon',
        color: 'teal'
    },
    '14': {
        name: 'white Queen',
        icon: 'chess queen icon',
        color: 'teal'
    },
    '15': {
        name: 'white King',
        icon: 'chess king icon',
        color: 'teal'
    },
    '16': {
        name: 'white Bishop Colored',
        icon: 'chess bishop icon',
        color: 'teal'
    },
    '10': {
        name: 'white Pawn',
        icon: 'chess pawn icon',
        color: 'teal'
    },
}

const Square = (props) => {
    return (
        <div index={`${props.index}`}>
            <i className="huge icons" index={`${props.index}`}>
                <i className="big circle outline icon space" index={`${props.index}`}></i>
                <i className={`${pieces[props.position].icon} ${pieces[props.position].color}  piece`} index={`${props.index}`}></i>
            </i>
            <span className='indexIndicator'>
                {props.index}
            </span>
        </div>
    );
};
export default Square;