import fs from 'fs';
import path from 'path';
import admZip from 'adm-zip';
import { rimrafSync } from 'rimraf';
import { attempt } from './transientFaultHandler';

const fspromises = fs.promises;

export function writeFile(content: string, path: string): void
{
    fs.writeFileSync(path, content, {encoding: 'utf-8'});
}

export function readDir(path: string): fs.Dirent[]
{
    return fs.readdirSync(path, { withFileTypes: true });
}

export function readFile(filePath: string): string
{
    return fs.readFileSync(filePath, 'utf8');
}

export function getFolderPath(repoPath: string): string
{
    return repoPath.split('/').pop()!.replace('.zip', '');
}

export async function ensureDirectoryCreatedAsync(path:string): Promise<void>
{
    try 
    {
        await fspromises.access(path);    
    } 
    catch (error: any)
    {
        if (error.code === 'ENOENT')
            await fspromises.mkdir(path, { recursive: true });
        else
            throw error;
    }
}

export function extractZip(zipFilePath: string, outputPath: string): void
{
    const zip = new admZip(zipFilePath);
    zip.extractAllTo(outputPath, true);
}

export async function tryRemoveDirectoryAsync(path: string): Promise<void>
{
    await attempt(() => rimrafSync(path))
}

export function getTestFiles(dirPath: string): string[]
{
    let testFiles: string[] = [];
    const filesAndDirs = readDir(dirPath);
    for (const dirent of filesAndDirs)
    {
        const fullPath = path.join(dirPath, dirent.name);
        if (dirent.isDirectory())
            testFiles = testFiles.concat(getTestFiles(fullPath));
        else if (isTestFile(fullPath))
            testFiles.push(fullPath);
    }
  
    return testFiles;
}

function isTestFile(filePath: string): boolean
{
    const isInTestsDirectory = /(?:^|\/)[^\/]*test[^\/]*(?:\/|$)/.test(filePath)
    const hasJsSuffix = /\.(js|jsx|ts|tsx)$/.test(filePath);
    const hasTestSuffix = /(?:test|spec)\.(?:js|ts|jsx|tsx)$/.test(filePath)

    return (isInTestsDirectory && hasJsSuffix) || hasTestSuffix;
}

export async function writeDataAsCsvToFileAsync(data: any[], filePath: string): Promise<void>
{
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj =>
        Object.values(obj).map(val => `${String(val).replace(/"/g, '""')}`).join(',')
    );
    const csvString = [headers, ...rows].join('\r\n');
    fspromises.writeFile(path.join(__dirname.replace('\\dist',''), filePath), csvString)
}

export async function writeDataAsCsvToFileSafeAsync(data: any[], filePath: string): Promise<void>
{
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj =>
        Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
    );
    const csvString = [headers, ...rows].join('\r\n');
    fspromises.writeFile(path.join(__dirname.replace('\\dist',''), filePath), csvString)
}