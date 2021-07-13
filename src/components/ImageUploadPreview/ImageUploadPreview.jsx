import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import './ImageUploadPreview.scss';

export default function ImageUploadPreview({ mediaSources, amountToShow = 4 }) {
    const [base64Values, setBase64Values] = useState([]);
    const files = useMemo(() => mediaSources.filter((f) => typeof f !== 'string'), [mediaSources]);
    const urls = useMemo(() => mediaSources.filter((f) => typeof f === 'string'), [mediaSources]);

    useEffect(() => {
        // getMultiBase64(files.map(f => f))
        //     .then((values) => setBase64Values(values));
        setBase64Values(files.map(f => f.thumbUrl));
    }, [files]);

    const sources = [...base64Values, ...urls];
    const width = 155;
    const height = 155;

    return (
        <div className="image-upload-preview">
            {
                sources.slice(0, amountToShow).map((l, i) => {
                    if (i < amountToShow - 1) {
                        return (
                            <Image
                                wrapperClassName="image"
                                width={width}
                                height={height}
                                key={i}
                                src={l}
                            />
                        )
                    }

                    return (
                        <div key={i} className="more">
                            <Image
                                wrapperClassName="image"
                                width={width}
                                height={height}
                                src={sources[i]}
                            />
                            {sources.length > amountToShow && (
                                <div className="more__cover" style={{ width, height }}>
                                    <div className="more__cover__inner">
                                        <PlusOutlined />
                                        <span>{sources.length - amountToShow}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    );
};