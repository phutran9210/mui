import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    const playerRef = useRef(null);

    useEffect(() => {
        const handleLoad = () => {
            const iframe = playerRef.current.getInternalPlayer().getIframe();
            if (iframe) {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    console.log('iframeDoc:', iframeDoc);
                    if (iframeDoc) {
                        // Tìm kiếm tất cả các phần tử có class 'ytp-title-text' và thay đổi style
                        const elements = iframeDoc.querySelectorAll('.ytp-title-text');
                        console.log('elements:', elements);
                        elements.forEach(element => {
                            element.style.display = 'none'; // Ví dụ: ẩn tiêu đề
                        });

                        // Hoặc thêm style trực tiếp vào head
                        const style = iframeDoc.createElement('style');
                        style.innerHTML = `
              .ytp-title-text {
                display: none !important;
              }
            `;
                        iframeDoc.head.appendChild(style);
                    }
                } catch (error) {
                    console.log("Error accessing iframe document:", error);
                }
            }
        };

        // Delay the execution to ensure the iframe has been loaded
        setTimeout(handleLoad, 1000);
    }, []);

    return (
        <div style={{ width: '808px', height: '600px' }}>
            <ReactPlayer
                ref={playerRef}
                className="react-player"
                url="https://www.youtube.com/watch?v=OYRt9EFMVpw"
                width="100%"
                height="100%"
                playing
                controls={true}
                config={{
                    youtube: {
                        playerVars: {
                            modestbranding: 1,
                            showinfo: 0,
                            rel: 0,
                            controls: 1
                        }
                    }
                }}
            />
        </div>
    );
};

export default VideoPlayer;
