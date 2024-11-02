import { useEffect, useState, type FC } from "react";
import {
    consoleLog,
    amllFontSizeAtom,
    amllLightModeAtom,
} from "./settings"
import { atomWithStorage } from "jotai/utils";
import { type WritableAtom, atom, useAtom, useAtomValue, useStore } from "jotai";

export const ExtensionContext: FC = () => {

    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

        // 挂载时设置css属性
        useEffect(() => {
            // AMLL Font Size
            const storedFontSizeAtom = localStorage.getItem('amllFontSizeAtom');
            if (storedFontSizeAtom) {
                const storedFontSize = storedFontSizeAtom.replace(/"/g, '');
                if (storedFontSize === "default") {
                    consoleLog("INFO", "context", "(挂载时)未设置amllFontSize " + storedFontSize);
                } else {
                    consoleLog("INFO", "context", "(挂载时)已设置amllFontSize " + storedFontSize);
                    const lyricPlayerElement = document.querySelector(".amll-lyric-player") as HTMLElement;
                    lyricPlayerElement.style.setProperty('--amll-lp-font-size', storedFontSize);
                }
            } else {
                consoleLog("INFO", "context", "(挂载时)未设置amllFontSize NULL");
            }
    
            // AMLL Light Mode
            /*
            const storedLightModeAtom = localStorage.getItem('amllLightModeAtom');
            if (storedLightModeAtom === "true") {
                // 开启light mode
                const modeElement = document.querySelector(".radix-themes");
                const classList = modeElement.classList;
                if (classList.contains("light")) {
                    consoleLog("INFO", "settings", "已为Light Mode, 不再覆盖设置");
                } else {
                    consoleLog("INFO", "settings", "已设置Light Mode");
                    if (classList.contains("dark")) {
                        // 去除dark
                        classList.remove("dark");
                    }
                    classList.add("light");
                }
            } else {
                // 关闭light mode
                const modeElement = document.querySelector(".radix-themes");
                const classList = modeElement.classList;
                if (classList.contains("dark")) {
                    consoleLog("INFO", "settings", "已为Dark Mode, 不再覆盖设置");
                } else {
                    consoleLog("INFO", "settings", "已设置Dark Mode");
                    if (classList.contains("light")) {
                        // 去除light
                        classList.remove("light");
                    }
                    classList.add("dark");
                }
            }
            */
        }, [])
        return null;
}