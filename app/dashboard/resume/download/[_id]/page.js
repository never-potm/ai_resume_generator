import React from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";

// https://cdn-icons-png.flaticon.com/128/1091/1091007.png
// https://cdn-icons-png.flaticon.com/128/1497/1497542.png
// https://cdn-icons-png.flaticon.com/128/1828/1828874.png

function DownloadPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h2 className="font-bold text-2xl">
                    Congratulations! Your AI powered resume is ready.
                </h2>
                <p>You can now download, print or share it with anyone.</p>
                <div className="flex justify-between my-20">
                    <div className="flex flex-col items-center">
                        <Image src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
                               alt="download"
                               width={50}
                               height={50}/>
                        <Button className="my-2">Download</Button>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="https://cdn-icons-png.flaticon.com/128/1497/1497542.png"
                               alt="print"
                               width={50}
                               height={50}/>
                        <Button className="my-2">Print</Button>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="https://cdn-icons-png.flaticon.com/128/1828/1828874.png"
                               alt="share"
                               width={50}
                               height={50}/>
                        <Button className="my-2">Share</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadPage;