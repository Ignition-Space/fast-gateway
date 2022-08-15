/**
 * @description: 资源缓存
 */
import * as fs from 'fs';
import * as path from 'path';

import { getConfig } from '@app/common';

import { WebSiteDataModel } from './types';

const { CACHE_ENABLE, ROOT_DIR, GATEWAY_FILENAME, PAGE_DIR } = getConfig('GATEWAY_CONFIG')

/**
 * @description: 初始化根路径
 */
const rootDir = path.resolve(process.cwd(), ROOT_DIR);

if (!fs.existsSync(rootDir)) {
  fs.mkdirSync(rootDir);
}

/**
 * @description: 初始化 page 资源缓存路径
 */
const pageDir = path.resolve(process.cwd(), `${ROOT_DIR}/${PAGE_DIR}`);

if (!fs.existsSync(pageDir)) {
  fs.mkdirSync(pageDir);
}

export const updateLocalFile = (
  Local: Record<string, WebSiteDataModel>,
): void => {
  fs.writeFileSync(
    path.resolve(rootDir, GATEWAY_FILENAME),
    JSON.stringify(Local),
  );
}

export const readLocalFile = (): string => {
  try {
    return fs.readFileSync(path.resolve(rootDir, GATEWAY_FILENAME)).toString();
  } catch {
    return '{}';
  }
}

export function path2FileName(path: string) {
  let fileName = path;

  if (/\/$/.test(fileName)) {
    fileName += 'index';
  }
  if (!/\.html$/.test(fileName)) {
    fileName += '.html';
  }
  return fileName;
}

export function readMatchedFileSync(
  hostname: string,
  matchedPath: string,
): string | undefined {

  if (!CACHE_ENABLE) return undefined;

  const fileName = path2FileName(matchedPath);

  if (fs.existsSync(path.resolve(pageDir, `${hostname}/${fileName}`))) {
    try {
      return fs
        .readFileSync(path.resolve(pageDir, `${hostname}/${fileName}`))
        .toString();
    } catch (e) {
      return;
    }
  }
  return;
}

export const writeFileSync = (
  hostname: string,
  matchedPath: string,
  html: string,
): boolean => {

  if (!CACHE_ENABLE) return false;

  const fileName = path2FileName(matchedPath);

  try {
    const fileDir = hostname + fileName.split('/').slice(0, -1).join('/');

    if (!fs.existsSync(path.resolve(pageDir, fileDir))) {
      fs.mkdirSync(path.resolve(pageDir, fileDir + '/'), {
        recursive: true,
      });
    }

    fs.writeFileSync(path.resolve(pageDir, `${hostname}/${fileName}`), html);

  } catch (e) {
    console.error(
      `[writeFileSync] error when writeFileSync ${path.resolve(
        pageDir,
        `${hostname}/${fileName}`,
      )}`,
      e,
    );
    return false;
  }

  return true;
}

export const updateFileSync = (
  hostname: string,
  matchedPath: string,
  html: string,
): boolean => {
  if (!CACHE_ENABLE()) return undefined;

  return writeFileSync(hostname, matchedPath, html);
}

export const existsSync = (hostname: string, matchedPath: string): boolean => {
  const fileName = path2FileName(matchedPath);
  return fs.existsSync(path.resolve(pageDir, `${hostname}/${fileName}`));
}
