import React from 'react'
import ShowMoreText from 'react-show-more-text';

export default function ReadMoreLessText({ text, lines }) {
    return (
        <ShowMoreText
            lines={lines}
            more='Xem thêm'
            less='Ẩn bớt'
            anchorClass='my-anchor-css-class'
            expanded={false}
        >
            {text}
        </ShowMoreText>
    )
}
