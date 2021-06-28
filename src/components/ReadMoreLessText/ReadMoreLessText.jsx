import React from 'react'
import ShowMoreText from 'react-show-more-text';
import htmlParse from 'html-react-parser';


export default function ReadMoreLessText({ text, lines }) {
    return (
        <ShowMoreText
            lines={lines}
            more='Xem thêm'
            less='Ẩn bớt'
            className='content-css'
            anchorClass='my-anchor-css-class'
            expanded={false}
        >
            {htmlParse(text || '')}
        </ShowMoreText>
    )
}
