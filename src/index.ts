import { Glob } from 'bun';
import fs from 'fs';
import path from 'path';

export interface CopyrightNoticeOptions
{
    fullName: string;
    email: string;
}

interface CommentStyle
{
    start: string;
    end: string;
}

interface CommentStyles
{
    [ext: string]: CommentStyle;
}

const COMMENT_STYLES: CommentStyles = {
    '.js': { start: '/**', end: ' */' },
    '.css': { start: '/*', end: ' */' },
    '.html': { start: '<!--', end: '-->' },
    '.ts': { start: '/**', end: ' */' },
    '.tsx': { start: '/**', end: ' */' },
};

export const DEFAULT_COPYRIGHT_NOTICE = (options: CopyrightNoticeOptions, commentStyle: CommentStyle): string =>
{
    const currentYear = new Date().getFullYear();
    return `${commentStyle.start}
 * Copyright (C) ${currentYear} ${options.fullName}
 *
 * Author: ${options.fullName} <${options.email}>
 *
 * This entire project, including all source code files, is the exclusive
 * property of ${options.fullName} and is protected by copyright laws.
 * All rights reserved.
 *
 * The unauthorized reproduction, modification, distribution, or use of
 * any part of this project, without the prior written consent of
 * ${options.fullName}, is strictly prohibited.
 *
 * This source code wasn't provided "as is," without express or implied
 * warranties, including, but not limited to, warranties of
 * merchantability, fitness for a particular purpose, or non-infringement.
 * In no event shall ${options.fullName} be liable for any damages,
 * including, but not limited to, direct, indirect, special, incidental,
 * or consequential damages, arising out of the use or inability to use
 * this source code.
${commentStyle.end}`;
};

async function getAllFiles(dir: string, excludedPatterns: string[]): Promise<string[]>
{
    const glob = new Glob("**/*.{js,css,html,ts,tsx}");

    let files: string[] = [];

    for await (const file of glob.scan(dir)) {
        let isExcluded = false;
        for (const pattern of excludedPatterns) {
            const excludeGlob = new Glob(pattern);
            if (excludeGlob.match(file)) {
                isExcluded = true;
                break;
            }
        }
        if (!isExcluded) {
            files.push(file);
        }
    }

    return files;
}

export async function main(argv: CopyrightNoticeOptions)
{
    if (!argv.fullName || !argv.email) {
        console.error('❌ Error: Both fullName and email are required.');
        return;
    }

    const excludedPatterns = [
        'node_modules/**', '.pnp/**', '.pnp.js', 'coverage/**', '.next/**',
        'out/**', 'build/**', '.DS_Store', '*.pem', 'npm-debug.log*',
        'yarn-debug.log*', 'yarn-error.log*', '.env*.local', '.vercel/**',
        '*.tsbuildinfo', 'next-env.d.ts', '**/*.json', '**/*.d.ts',
    ];


    const baseDir = process.cwd();
    const files = await getAllFiles(baseDir, excludedPatterns);

    files.forEach((file) =>
    {
        const extname = path.extname(file);
        const commentStyle = COMMENT_STYLES[extname];
        if (commentStyle) {
            const copyrightNotice = DEFAULT_COPYRIGHT_NOTICE(argv, commentStyle);
            addCopyrightNotice(file, copyrightNotice, argv.fullName);
        }
    });
}

function addCopyrightNotice(filePath: string, copyrightNotice: string, fullName: string): void
{
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const copyrightPattern = new RegExp(`${fullName} and is protected by copyright laws`, 'i');

    if (content.match(copyrightPattern)) return;

    const newContent = `${copyrightNotice}\n\n${content}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Copyright notice added to ${filePath}.`);
}
