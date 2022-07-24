/*
 * @Author: Cookie
 * @Description: 飞书环境变量
 */

import { getConfig } from "@/utils";

const { FEISHU_CONFIG } = getConfig()

export const APP_ID = FEISHU_CONFIG.FEISHU_APP_ID
export const APP_SECRET = FEISHU_CONFIG.FEISHU_APP_SECRET
