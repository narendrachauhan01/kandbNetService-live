import React from 'react';

function ReviewIframe() {
    return (
        <main className=' rounded-t-4xl p-6 bg-gray-100 '>
            <div className=' sm:md:text-3xl text-center font-bold  mb-10 '>
                <h1>Customer Review </h1>
            </div>

            <div className="flex justify-center rounded-t-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20 w-full max-w-6xl">
                    <div className="w-full aspect-video  rounded-2xl shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.youtube.com/embed/igYkMjaEXRw?si=1Hgog2H65zqwc9_K"
                            title="YouTube video 1"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    <div className="w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.youtube.com/embed/8CmocLnxppA?si=lxwEtYk3MKb8iE79"
                            title="YouTube video 2"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    <div className="w-full aspect-video  rounded-2xl shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.youtube.com/embed/aFeRL--wOsM?si=uMFvXf0u6UhGvAvV"
                            title="YouTube video 3"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    <div className="w-full aspect-video  rounded-2xl shadow-lg overflow-hidden mb-10">
                        <iframe
                            src="https://www.youtube.com/embed/_wGWwlIeCKg?si=8N1-QfDxk0FdZmQS"
                            title="YouTube video 4"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ReviewIframe;
