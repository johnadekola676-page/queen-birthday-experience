import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const mediaDir = {
        images: path.join(process.cwd(), 'public', 'images'),
        videos: path.join(process.cwd(), 'public', 'videos'),
        music: path.join(process.cwd(), 'public', 'music'),
    };

    const getFiles = (dir: string) => {
        if (!fs.existsSync(dir)) return [];
        return fs.readdirSync(dir).filter(file => !file.startsWith('.'));
    };

    return NextResponse.json({
        images: getFiles(mediaDir.images),
        videos: getFiles(mediaDir.videos),
        music: getFiles(mediaDir.music),
    });
}
